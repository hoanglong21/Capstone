import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import ClassService from '../../services/ClassService'
import { useTranslation } from 'react-i18next'
import Pagination from '../../components/Pagination'

import { ClassIcon } from '../../components/icons'
import defaultAvatar from '../../assets/images/default_avatar.png'
import banned from '../../assets/images/banned.png'
import verified from '../../assets/images/verified.png'
import deleted from '../../assets/images/deleted.png'
import '../../assets/styles/LibrarySearchList.css'
import '../../assets/styles/Home.css'

const ClassesForHome = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(1)

    const fetchData = async (searchKey) => {
        try {
            const temp = (
                await ClassService.getFilterList(
                    '',
                    '=0',
                    `${searchKey ? '=' + searchKey : ''}`,
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
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
            if (
                error.message.includes('not exist') ||
                error?.response.data.includes('not exist')
            ) {
                navigate('/notFound')
            }
        }
    }
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    useEffect(() => {
        if (loading === true && document.getElementById('searchHomeBtn')) {
            document.getElementById('searchHomeBtn').disabled = true
            document.getElementById(
                'searchHomeBtn'
            ).innerHTML = `<div class="d-flex justify-content-center">
                            <div class="spinner-border spinner-border-sm" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>`
            document.getElementById('searchHomeInput').readOnly = true
        }
        if (loading === false && document.getElementById('searchHomeBtn')) {
            document.getElementById('searchHomeBtn').disabled = false
            document.getElementById('searchHomeBtn').innerHTML = t('search')
            document.getElementById('searchHomeInput').readOnly = false
        }
    }, [loading])

    useEffect(() => {
        setLoading(true)
        fetchData(search ? search : '')
        setLoading(false)
    }, [search, page])

    return (
        <div className="mt-4 mb-5">
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
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
                            <div key={classroom.id} className="set-item mb-3">
                                <Link to={`/class/${classroom.id}`}>
                                    <div className="set-body row mb-2">
                                        <div className="class-home term-count">
                                            {classroom?.member} {t('member')}
                                        </div>
                                        <div className="class-home term-count">
                                            {classroom?.studyset} {t('set')}
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
                                                {classroom?.author}
                                            </span>
                                            {classroom?.authorstatus ===
                                                'banned' && (
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip id="tooltip">
                                                            {t('msg9')}.
                                                        </Tooltip>
                                                    }
                                                >
                                                    <img
                                                        className="ms-1 author-avatarTag author-avatarTag--banned"
                                                        src={banned}
                                                    />
                                                </OverlayTrigger>
                                            )}
                                            {classroom?.authorstatus ===
                                                'active' && (
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip id="tooltip">
                                                            {t('msg8')}.
                                                        </Tooltip>
                                                    }
                                                >
                                                    <img
                                                        className="ms-1 author-avatarTag"
                                                        src={verified}
                                                    />
                                                </OverlayTrigger>
                                            )}
                                            {classroom?.authorstatus ===
                                                'deleted' && (
                                                <OverlayTrigger
                                                    placement="bottom"
                                                    overlay={
                                                        <Tooltip id="tooltip">
                                                            {t('msg7')}.
                                                        </Tooltip>
                                                    }
                                                >
                                                    <img
                                                        className="ms-1 author-avatarTag"
                                                        src={deleted}
                                                    />
                                                </OverlayTrigger>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="class-title set-title d-flex align-items-center">
                                            <ClassIcon className="me-2" />
                                            {classroom?.class_name}
                                        </div>
                                        <div className="col d-flex align-items-center">
                                            <p
                                                className="set-description m-0"
                                                style={{
                                                    whiteSpace: 'pre-wrap',
                                                }}
                                            >
                                                {classroom?.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
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
                </div>
            )}
        </div>
    )
}
export default ClassesForHome
