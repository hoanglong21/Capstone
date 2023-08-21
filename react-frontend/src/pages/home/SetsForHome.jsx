import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import StudySetService from '../../services/StudySetService'

import Pagination from '../../components/Pagination'

import defaultAvatar from '../../assets/images/default_avatar.png'
import banned from '../../assets/images/banned.png'
import verified from '../../assets/images/verified.png'
import deleted from '../../assets/images/deleted.png'
import '../../assets/styles/LibrarySearchList.css'

function SetsForHome() {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')
    const author = searchParams.get('author')

    const [sets, setSets] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(1)

    const fetchData = async (searchKey) => {
        try {
            const temp = (
                await StudySetService.getFilterList(
                    '=0',
                    '=1',
                    '=0',
                    `${!author && searchKey ? '=' + searchKey : ''}`,
                    `${author ? `=${author}` : ''}`,
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
            setSets(temp.list)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
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
    }, [search, author, page])

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
                        {sets?.length === 0 && (
                            <p className="noFound">
                                No sets matching {search} found
                            </p>
                        )}
                        {sets?.map((set) => (
                            <div key={set?.id} className="set-item mb-3">
                                <Link to={`/set/${set.id}`}>
                                    <div className="set-body row mb-2">
                                        <div className="term-count col-3">
                                            {set?.count} terms
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
                                                                This account is
                                                                banned.
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
                                                                This account is
                                                                verified.
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
                                                                This account is
                                                                deleted.
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
