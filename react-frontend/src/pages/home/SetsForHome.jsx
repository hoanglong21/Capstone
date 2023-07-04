import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import StudySetService from '../../services/StudySetService'

import defaultAvatar from '../../assets/images/default_avatar.png'
import '../../assets/styles/StudySetList.css'

function SetsForHome() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const { userInfo } = useSelector((state) => state.user)

    const [sets, setSets] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)

    const fetchData = async (searchKey) => {
        const temp = (
            await StudySetService.getFilterList(
                '',
                '',
                '',
                `${searchKey ? '=' + searchKey : ''}`,
                '',
                '',
                '',
                '',
                ''
            )
        ).data.list
        if (temp.length === 0) {
            setIsEmpty(true)
        }
        setSets(temp)
    }

    useEffect(() => {
        if (userInfo.username) {
            fetchData(search ? search : '')
        }
    }, [userInfo, search])

    return (
        <div className="mt-4 mb-5">
            <div className="sets-list">
                {sets.length === 0 && <p>No sets matching {search} found</p>}
                {sets.map((set) => (
                    <div key={set.id} className="set-item mb-3">
                        <Link to={`/set/${set.id}`}>
                            <div className="set-body row mb-2">
                                <div className="term-count col-2">
                                    {set.count} terms
                                </div>
                                <div
                                    className="set-author col d-flex "
                                    href="#"
                                >
                                    <div className="author-avatar">
                                        <img
                                            src={
                                                set.avatar
                                                    ? set.avatar
                                                    : defaultAvatar
                                            }
                                            alt="author avatar"
                                            className="w-100 h-100"
                                        />
                                    </div>
                                    <span className="author-username ms-2">
                                        {set.author}
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="set-title col-2">
                                    {set._draft
                                        ? `(Draft) ${set.title}`
                                        : set.title}
                                </div>
                                <div className="col d-flex align-items-center">
                                    <p
                                        className="set-description m-0"
                                        style={{ whiteSpace: 'pre-wrap' }}
                                    >
                                        {set.description}
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
