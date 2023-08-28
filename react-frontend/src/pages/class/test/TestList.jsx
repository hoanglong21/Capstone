import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import ClassService from '../../../services/ClassService'
import TestService from '../../../services/TestService'

import DeleteTest from './DeleteTest'

import {
    AddIcon,
    ArrowSmallDownIcon,
    ArrowSmallUpIcon,
    CloseIcon,
    SearchIcon,
    TestIcon,
} from '../../../components/icons'
import empty from '../../../assets/images/tutor_assign_empty.png'
import './test.css'
import Pagination from '../../../components/Pagination'
import { useTranslation } from 'react-i18next'

const TestList = () => {
    const navigate = useNavigate()

    const { id } = useParams()

    const { userInfo } = useSelector((state) => state.user)

    const [tests, setTests] = useState([])
    const [classroom, setClassroom] = useState({})
    const [loading, setLoading] = useState(true)
    const [today, setToday] = useState(new Date())
    const [loadingCount, setLoadingCount] = useState(false)

    const [isDelete, setIsDelete] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteTest, setDeleteTest] = useState({})

    const [isEmpty, setIsEmpty] = useState(false)
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [isDesc, setIsDesc] = useState(true)
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    function getToday() {
        const today = new Date()
        return (
            today.getFullYear() +
            '-' +
            padWithLeadingZeros(today.getMonth() + 1, 2) +
            '-' +
            padWithLeadingZeros(today.getDate(), 2) +
            'T' +
            padWithLeadingZeros(today.getHours(), 2) +
            ':' +
            padWithLeadingZeros(today.getMinutes(), 2)
        )
    }

    function padWithLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0')
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const tempClass = (await ClassService.getClassroomById(id)).data
                setClassroom(tempClass)
                const tempTests = (
                    await TestService.getFilterList(
                        '',
                        '',
                        '',
                        '',
                        '',
                        `${
                            userInfo.id === tempClass.user.id
                                ? ''
                                : `=${getToday()}`
                        }`,
                        '',
                        '',
                        `${userInfo.id === tempClass.user.id ? '' : `=0`}`,
                        '',
                        '',
                        '',
                        `=${tempClass.id}`,
                        '',
                        '=10'
                    )
                ).data
                if (tempTests.totalItems < 1) {
                    setIsEmpty(true)
                }
                setTotalItems(tempTests.totalItems)
                setTests(tempTests.list)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
                if (
                    error.message.includes('not exist') ||
                    error?.response.data.includes('not exist')
                ) {
                    navigate('/notFound')
                }
            }
            setLoading(false)
        }
        if (id && userInfo?.id) {
            fetchData()
        }
    }, [id, userInfo])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setIsEmpty(false)
            try {
                const tempTests = (
                    await TestService.getFilterList(
                        `${search ? `=${search}` : ''}`,
                        '',
                        '',
                        '',
                        '',
                        `${
                            userInfo.id === classroom.user.id
                                ? ''
                                : `=${getToday()}`
                        }`,
                        '',
                        '',
                        `${userInfo.id === classroom.user.id ? '' : `=0`}`,
                        `=${isDesc ? 'desc' : 'asc'}`,
                        '',
                        '',
                        `=${classroom.id}`,
                        `=${page}`,
                        '=10'
                    )
                ).data
                setTotalItems(tempTests.totalItems)
                setTests(tempTests.list)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
                if (
                    error.message.includes('not exist') ||
                    error?.response.data.includes('not exist')
                ) {
                    navigate('/notFound')
                }
            }
            setLoading(false)
        }
        if (id && classroom?.id) {
            fetchData()
        }
    }, [page, search, isDesc])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const tempTests = (
                    await TestService.getFilterList(
                        '',
                        '',
                        '',
                        '',
                        '',
                        `${
                            userInfo.id === classroom.user.id
                                ? ''
                                : `=${getToday()}`
                        }`,
                        '',
                        '',
                        `${userInfo.id === classroom.user.id ? '' : `=0`}`,
                        '',
                        '',
                        '',
                        `=${classroom.id}`,
                        '',
                        '=10'
                    )
                ).data
                if (tempTests.totalItems < 1) {
                    setIsEmpty(true)
                }
                setTotalItems(tempTests.totalItems)
                setTests(tempTests.list)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
                if (
                    error.message.includes('not exist') ||
                    error?.response.data.includes('not exist')
                ) {
                    navigate('/notFound')
                }
            }
            setLoading(false)
        }
        if (isDelete === true) {
            fetchData()
            setIsDelete(false)
        }
    }, [isDelete])

    const handleCountSubmission = async (test, index) => {
        if (userInfo?.id === classroom?.user?.id && !test?.attempted) {
            setLoadingCount(true)
            try {
                const tempCountSubmit = (
                    await TestService.getNumAttemptTest(test.id, classroom.id)
                ).data
                const attempted = tempCountSubmit.attempted
                const notattempted = tempCountSubmit.notattempted
                var tempTests = [...tests]
                tempTests[index] = {
                    ...test,
                    attempted,
                    notattempted,
                }
                setTests(tempTests)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
            setLoadingCount(false)
        }
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
            <div>
                <div>
                    <div className="row d-flex align-items-center">
                        <div className="test-col-6">
                            {userInfo?.id === classroom?.user?.id && (
                                <button
                                    className="createTest_btn"
                                    disabled={classroom?._deleted}
                                    onClick={() => {
                                        navigate(`/class/${id}/create-test`)
                                    }}
                                >
                                    <AddIcon
                                        className="createTestIcon_btn"
                                        size="1.125rem"
                                        strokeWidth="2.25"
                                    />
                                    {t('create')}
                                </button>
                            )}
                        </div>
                        {!isEmpty && (
                            <div className="test-col-6 testList d-flex">
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
                                <form className="input-group mb-0">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search..."
                                        value={searchInput || ''}
                                        onChange={(event) => {
                                            setSearchInput(event.target.value)
                                        }}
                                    />
                                    {searchInput && (
                                        <button
                                            className="btn btn-outline-secondary px-2"
                                            type="button"
                                            onClick={() => {
                                                setSearch('')
                                                setSearchInput('')
                                            }}
                                        >
                                            <CloseIcon />
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-outline-secondary px-2"
                                        type="submit"
                                        onClick={(event) => {
                                            event.preventDefault()
                                            setSearch(searchInput)
                                        }}
                                    >
                                        <SearchIcon />
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
                {isEmpty ? (
                    <div className="emptyTests_container d-flex flex-column align-items-center justify-content-center">
                        <img src={empty} alt="" />
                        <p className="mb-2 emptyTests_heading">{t('msg86')}</p>
                        <p className="emptyTests_content">{t('msg87')}</p>
                    </div>
                ) : search && tests?.length === 0 ? (
                    <div className="mt-5">{t('noMatch')}.</div>
                ) : (
                    <div>
                        <div
                            className="accordion my-4 accordionAssignments"
                            id="accordionTests"
                        >
                            {tests?.map((test, index) => (
                                <div
                                    className="accordion-item"
                                    key={test.id}
                                    onClick={() =>
                                        handleCountSubmission(test, index)
                                    }
                                >
                                    <button
                                        className="accordion-button collapsed d-flex justify-content-between align-items-center"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#test${test?.id}`}
                                        aria-expanded="false"
                                        aria-controls={`test${test?.id}`}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div
                                                className={`accordionAssign_icon ${
                                                    (test._draft ||
                                                        (!test._draft &&
                                                            new Date(
                                                                test.start_date
                                                            ) >= new Date())) &&
                                                    'disabled'
                                                }`}
                                            >
                                                <TestIcon
                                                    size="24px"
                                                    strokeWidth="1.75"
                                                />
                                            </div>
                                            <div>{test.title || '...'}</div>
                                        </div>
                                        <div>
                                            {test?._draft
                                                ? 'Draft'
                                                : test?.start_date &&
                                                  new Date(test?.start_date) >
                                                      today
                                                ? `Scheduled for ${test?.start_date}`
                                                : test?.due_date
                                                ? `Due ${test?.due_date}`
                                                : 'No due date'}
                                        </div>
                                    </button>
                                    <div
                                        id={`test${test?.id}`}
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionTests"
                                    >
                                        <div className="accordion-body">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    {t('posted')}{' '}
                                                    {test?.created_date}
                                                </div>
                                                {test?.due_date &&
                                                    new Date(test?.due_date) <
                                                        today && (
                                                        <div className="assignMissing">
                                                            {t('missing')}
                                                        </div>
                                                    )}
                                            </div>
                                            <div className="mt-3 d-flex justify-content-between">
                                                <button
                                                    className="viewTest_btn"
                                                    onClick={() =>
                                                        navigate(
                                                            `/class/${id}/test/${test?.id}/details`
                                                        )
                                                    }
                                                >
                                                    {t('viewDetails')}
                                                </button>
                                                {userInfo?.id ===
                                                    classroom?.user?.id && (
                                                    <div className="d-flex">
                                                        <div className="asignInfo_block">
                                                            <div className="assignInfo_number">
                                                                {loadingCount &&
                                                                    '...'}
                                                                {
                                                                    test?.attempted
                                                                }
                                                            </div>
                                                            <div className="assignInfo_title">
                                                                {t('turnIn')}
                                                            </div>
                                                        </div>
                                                        <div className="asignInfo_block">
                                                            <div className="assignInfo_number">
                                                                {loadingCount &&
                                                                    '...'}
                                                                {
                                                                    test?.notattempted
                                                                }
                                                            </div>
                                                            <div className="assignInfo_title">
                                                                {t('assigned')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {userInfo?.id ===
                                                classroom?.user?.id &&
                                                !classroom?._deleted && (
                                                    <div className="mt-5 d-flex justify-content-between">
                                                        <button
                                                            className="editTest_btn"
                                                            onClick={() => {
                                                                navigate(
                                                                    `/class/${id}/edit-test/${test?.id}`
                                                                )
                                                            }}
                                                        >
                                                            {t('editTest')}
                                                        </button>
                                                        <button
                                                            className="deleteTest_btn"
                                                            type="button"
                                                            onClick={() => {
                                                                setDeleteTest(
                                                                    test
                                                                )
                                                                setShowDeleteModal(
                                                                    true
                                                                )
                                                            }}
                                                        >
                                                            {t('deleTest')}
                                                        </button>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                        {/* delete modal */}
                        <DeleteTest
                            isDelete={isDelete}
                            setIsDelete={setIsDelete}
                            test={deleteTest}
                            classroom={classroom}
                            showDeleteModal={showDeleteModal}
                            setShowDeleteModal={setShowDeleteModal}
                        />
                    </div>
                )}
            </div>
        )
    }
}

export default TestList
