import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import StudySetService from '../../services/StudySetService'
import { useTranslation } from 'react-i18next'
import Pagination from '../../components/Pagination'

import defaultAvatar from '../../assets/images/default_avatar.png'
import banned from '../../assets/images/banned.png'
import verified from '../../assets/images/verified.png'
import deleted from '../../assets/images/deleted.png'
import '../../assets/styles/LibrarySearchList.css'

function SetsForHome() {
    const navigate = useNavigate()
    
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const [type, setType] = useState(-1)
    const [sets, setSets] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(1)
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    const fetchData = async (searchKey) => {
        try {
            const temp = (
                await StudySetService.getFilterList(
                    '=0',
                    '=1',
                    '=0',
                    `${searchKey ? '=' + searchKey : ''}`,
                    '',
                    '',
                    `${type == -1 ? '' : `=${type}`}`,
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
            setSets(temp.list)
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
            document.getElementById('searchHomeBtn').innerHTML = 'Search'
            document.getElementById('searchHomeInput').readOnly = false
        }
    }, [loading])

    useEffect(() => {
        setLoading(true)
        fetchData(search ? search : '')
        setLoading(false)
    }, [search, page, type])

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
                    <select
                        className="form-select sets-select py-2 mb-3"
                        aria-label="Default select example"
                        value={type || -1}
                        onChange={(event) => {
                            setType(event.target.value)
                        }}
                    >
                        <option value={-1}>{t('allType')}</option>
                        <option value={1}>{t('vocabulary')}</option>
                        <option value={2}>{t('kanji')}</option>
                        <option value={3}>{t('grammar')}</option>
                    </select>
                    <div className="sets-list mb-4">
                        {sets?.length === 0 && (
                            <p className="noFound">
                                {t('noSet')} {search} {t('found')}
                            </p>
                        )}
                        {sets?.map((set) => (
                            <div key={set?.id} className="set-item mb-3">
                                <Link to={`/set/${set.id}`}>
                                    <div className="set-body row mb-2">
                                        <div className="term-count col-3">
                                            {set?.count} {t('term')}
                                        </div>
                                        <div
                                            className="set-author col d-flex "
                                            href="#"
                                        >
                                            <div className="author-avatar">
                                                <img
                                                    src={
                                                        set?.avatar
                                                            ? set?.avatar
                                                            : defaultAvatar
                                                    }
                                                    alt="author avatar"
                                                    className="w-100 h-100"
                                                />
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <span className="author-username ms-2">
                                                    {set?.author}
                                                </span>
                                                {set?.author_status ===
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
                                                {set?.author_status ===
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
                                                {set?.author_status ===
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
                                    </div>
                                    <div className="row">
                                        <div className="set-title col-3">
                                            {set?._draft
                                                ? `(Draft) ${set?.title}`
                                                : set?.title}
                                        </div>
                                        <div className="col d-flex align-items-center">
                                            <p
                                                className="set-description m-0"
                                                style={{
                                                    whiteSpace: 'pre-wrap',
                                                }}
                                            >
                                                {set?.description}
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

export default SetsForHome
