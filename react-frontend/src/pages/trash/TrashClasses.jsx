import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

import ClassService from '../../services/ClassService'

import Pagination from '../../components/Pagination'
import DeleteClass from './DeleteClass'

import {
    ArrowSmallDownIcon,
    ArrowSmallUpIcon,
    ClassIcon,
    DeleteSolidIcon,
    OptionVerIcon,
    RestoreIcon,
    SearchIcon,
} from '../../components/icons'
import defaultAvatar from '../../assets/images/default_avatar.png'
import banned from '../../assets/images/banned.png'
import verified from '../../assets/images/verified.png'
import deleted from '../../assets/images/deleted.png'
import '../../assets/styles/LibrarySearchList.css'
import '../../assets/styles/Home.css'
import { useTranslation } from 'react-i18next'

const TrashClasses = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const { userInfo } = useSelector((state) => state.user)

    const [classes, setClasses] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loadingSearch, setLoadingSearch] = useState(true)

    const [searchInput, setSearchInput] = useState(search)
    const [type, setType] = useState('all')
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [isDesc, setIsDesc] = useState(true)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [deleteClass, setDeleteClass] = useState({})

    const [showToast, setShowToast] = useState(false)
    const [toastMess, setToastMess] = useState('')
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])
    
    const fetchData = async (searchKey) => {
        setLoadingSearch(true)
        try {
            setIsEmpty(false)
            const temp = (
                await ClassService.getFilterList(
                    '',
                    '=1',
                    `${searchKey ? '=' + searchKey : ''}`,
                    `=${userInfo.username}`,
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    `=${isDesc ? 'desc' : 'asc'}`,
                    `=${page}`,
                    '=10'
                )
            ).data
            setTotalItems(temp.totalItems)
            setClasses(temp.list)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoadingSearch(false)
    }

    const checkEmpty = async () => {
        setLoading(true)
        try {
            setIsEmpty(false)
            const temp = (
                await ClassService.getFilterList(
                    '',
                    '=1',
                    '',
                    `=${userInfo.username}`,
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    `=1`,
                    '=10'
                )
            ).data.list
            if (temp.length === 0) {
                setIsEmpty(true)
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        if (userInfo.username) {
            checkEmpty()
        }
    }, [userInfo])

    useEffect(() => {
        if (userInfo?.username) {
            fetchData(search ? search : '')
        }
    }, [userInfo, search, type, page, isDesc])

    useEffect(() => {
        if (userInfo?.username && isDelete === true) {
            setIsDelete(false)
            setToastMess('Permanently deleted')
            setShowToast(true)
            checkEmpty()
        }
    }, [isDelete])

    const handleRestore = async (classroom) => {
        setLoading(true)
        try {
            await ClassService.recoverClass(classroom.id)
            setToastMess('Restored')
            setShowToast(true)
            checkEmpty()
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div
                    className="spinner-border mt-5"
                    style={{ width: '3rem', height: '3rem' }}
                    role="status"
                >
                    <span className="visually-hidden">{t('loading')}...</span>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container mt-4 mb-5">
                {isEmpty ? (
                    <div className="setsEmpty d-flex flex-column align-items-center justify-content-center">
                        <h3>{t('noItem')}</h3>
                        <p>{t('msg42')}.</p>
                    </div>
                ) : (
                    <div>
                        <div className="row d-flex align-items-center mb-4">
                            <div className="studyset-col-5 d-flex align-items-center">
                                {userInfo?.role !== 'ROLE_LEARNER' && (
                                    <select
                                        className="form-select sets-select py-2 me-2"
                                        aria-label="Default select example"
                                        value={type || 'all'}
                                        onChange={(event) => {
                                            setType(event.target.value)
                                        }}
                                    >
                                        <option value="all">{t('all')}</option>
                                        <option value="created">
                                            {t('create')}
                                        </option>
                                        <option value="joined">
                                            {t('join')}
                                        </option>
                                    </select>
                                )}
                                <button
                                    className="btn btn-light p-2 me-2"
                                    onClick={() => {
                                        setIsDesc(!isDesc)
                                    }}
                                >
                                    {isDesc ? (
                                        <ArrowSmallDownIcon />
                                    ) : (
                                        <ArrowSmallUpIcon />
                                    )}
                                </button>
                            </div>
                            <div className="studyset-col-7">
                                <form className="sets-search m-0 d-flex align-items-center">
                                    <input
                                        className="search-control flex-grow-1"
                                        placeholder="Search your classes"
                                        type="text"
                                        value={searchInput || ''}
                                        readOnly={loading}
                                        onChange={(event) =>
                                            setSearchInput(event.target.value)
                                        }
                                    ></input>
                                    <button
                                        className="btn p-0"
                                        type="submit"
                                        disabled={loading}
                                        onClick={(event) => {
                                            event.preventDefault()
                                            setSearchParams({
                                                search: searchInput,
                                            })
                                        }}
                                    >
                                        <SearchIcon />
                                    </button>
                                </form>
                            </div>
                        </div>
                        {loadingSearch ? (
                            <div className="d-flex justify-content-center">
                                <div
                                    className="spinner-border mt-5"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        {t('loading')}...
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="sets-list mb-4">
                                    {classes?.length === 0 && (
                                        <p className="noFound">
                                            {t('noClass')} {search} {t('found')}
                                        </p>
                                    )}
                                    {classes?.map((classroom) => (
                                        <div key={classroom.id}>
                                            <div className="set-item mb-3">
                                                <div className="row">
                                                    <div
                                                        className="col-11"
                                                        onClick={() => {
                                                            navigate(
                                                                `/class/${classroom.id}`
                                                            )
                                                        }}
                                                    >
                                                        <div className="set-body row mb-2">
                                                            <div className="class-home term-count">
                                                                {
                                                                    classroom?.member
                                                                }{' '}
                                                                {t('member')}
                                                            </div>
                                                            <div className="class-home term-count">
                                                                {
                                                                    classroom?.studyset
                                                                }{' '}
                                                                {t('set')}
                                                            </div>
                                                            <div className="set-author col d-flex align-items-center">
                                                                <div className="author-avatar">
                                                                    <img
                                                                        src={
                                                                            classroom?.avatar
                                                                                ? classroom?.avatar
                                                                                : defaultAvatar
                                                                        }
                                                                        alt="author avatar"
                                                                        className="w-100 h-100"
                                                                    />
                                                                </div>
                                                                <span className="author-username ms-2">
                                                                    {
                                                                        classroom?.author
                                                                    }
                                                                </span>
                                                                {classroom?.authorstatus ===
                                                                    'banned' && (
                                                                    <OverlayTrigger
                                                                        placement="bottom"
                                                                        overlay={
                                                                            <Tooltip id="tooltip">
                                                                                {t(
                                                                                    'msg9'
                                                                                )}

                                                                                .
                                                                            </Tooltip>
                                                                        }
                                                                    >
                                                                        <img
                                                                            className="ms-1 author-avatarTag author-avatarTag--banned"
                                                                            src={
                                                                                banned
                                                                            }
                                                                        />
                                                                    </OverlayTrigger>
                                                                )}
                                                                {classroom?.authorstatus ===
                                                                    'active' && (
                                                                    <OverlayTrigger
                                                                        placement="bottom"
                                                                        overlay={
                                                                            <Tooltip id="tooltip">
                                                                                {t(
                                                                                    'msg8'
                                                                                )}

                                                                                .
                                                                            </Tooltip>
                                                                        }
                                                                    >
                                                                        <img
                                                                            className="ms-1 author-avatarTag"
                                                                            src={
                                                                                verified
                                                                            }
                                                                        />
                                                                    </OverlayTrigger>
                                                                )}
                                                                {classroom?.authorstatus ===
                                                                    'deleted' && (
                                                                    <OverlayTrigger
                                                                        placement="bottom"
                                                                        overlay={
                                                                            <Tooltip id="tooltip">
                                                                                {t(
                                                                                    'msg7'
                                                                                )}

                                                                                .
                                                                            </Tooltip>
                                                                        }
                                                                    >
                                                                        <img
                                                                            className="ms-1 author-avatarTag"
                                                                            src={
                                                                                deleted
                                                                            }
                                                                        />
                                                                    </OverlayTrigger>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="class-title set-title d-flex align-items-center">
                                                                <ClassIcon className="me-2" />
                                                                {
                                                                    classroom?.class_name
                                                                }
                                                            </div>
                                                            <div className="col d-flex align-items-center">
                                                                <p
                                                                    className="set-description m-0"
                                                                    style={{
                                                                        whiteSpace:
                                                                            'pre-wrap',
                                                                    }}
                                                                >
                                                                    {
                                                                        classroom?.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-1">
                                                        <button
                                                            type="button dropdown-toggle"
                                                            className="btn btn-customLight"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            <OptionVerIcon />
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <button
                                                                    className="setPageTerm_btn dropdown-item d-flex align-items-center"
                                                                    onClick={() => {
                                                                        handleRestore(
                                                                            classroom
                                                                        )
                                                                    }}
                                                                >
                                                                    <RestoreIcon
                                                                        size="20px"
                                                                        className="me-2"
                                                                    />
                                                                    {t(
                                                                        'recover'
                                                                    )}
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="setPageTerm_btn dropdown-item d-flex align-items-center"
                                                                    onClick={() => {
                                                                        setDeleteClass(
                                                                            classroom
                                                                        )
                                                                        setShowDeleteModal(
                                                                            true
                                                                        )
                                                                    }}
                                                                >
                                                                    <DeleteSolidIcon
                                                                        size="20px"
                                                                        className="me-2"
                                                                    />
                                                                    {t(
                                                                        'delete'
                                                                    )}
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Delete class modal */}
                                    <DeleteClass
                                        classroom={deleteClass}
                                        showDeleteModal={showDeleteModal}
                                        setShowDeleteModal={setShowDeleteModal}
                                        isDelete={isDelete}
                                        setIsDelete={setIsDelete}
                                    />
                                    {/* Toast Mess */}
                                    <ToastContainer
                                        className="p-3"
                                        position="bottom-start"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Toast
                                            onClose={() => setShowToast(false)}
                                            show={showToast}
                                            bg="dark"
                                            delay={3000}
                                            autohide
                                        >
                                            <Toast.Body className="text-white">
                                                {toastMess}
                                            </Toast.Body>
                                        </Toast>
                                    </ToastContainer>
                                </div>
                                {/* Pagination */}
                                <Pagination
                                    className="mb-5"
                                    currentPage={page}
                                    totalCount={totalItems}
                                    pageSize={10}
                                    onPageChange={(page) => {
                                        setPage(page)
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}
export default TrashClasses
