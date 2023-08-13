import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import StudySetService from '../../services/StudySetService'

import defaultAvatar from '../../assets/images/default_avatar.png'
import '../../assets/styles/LibrarySearchList.css'

function SetsForHome() {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const [sets, setSets] = useState([])

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
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    ''
                )
            ).data.list
            setSets(temp)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    useEffect(() => {
        fetchData(search ? search : '')
    }, [search])

    return (
        <div className="mt-4 mb-5">
            <div className="sets-list">
                {sets?.length === 0 && (
                    <p className="noFound">No sets matching {search} found</p>
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
                                    <span className="author-username ms-2">
                                        {set?.author}
                                    </span>
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
                                        style={{ whiteSpace: 'pre-wrap' }}
                                    >
                                        {set?.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SetsForHome
