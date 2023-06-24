import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import avatar from '../../assets/images/avatar-default.jpg'
import { SearchIcon } from '../../components/icons'
import './StudySetList.css'
import jwtDecode from 'jwt-decode'
import StudySetService from '../../services/StudySetService'
import { Link, useNavigate } from 'react-router-dom'

const StudySetList = () => {
    const navigate = useNavigate()

    const { userToken } = useSelector((state) => state.auth)

    const [sets, setSets] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const username = jwtDecode(userToken).sub
            setSets((await StudySetService.getAllStudySetByUser(username)).data)
        }
        fetchData()
    }, [userToken])

    return (
        <div className="container mt-4 mb-5">
            <div className="sets-search mb-4 d-flex align-items-center">
                <input
                    className="search-control flex-grow-1"
                    placeholder="Search your sets"
                    type="text"
                    value=""
                ></input>
                <SearchIcon />
            </div>
            <div className="sets-list">
                {sets.map((set) => (
                    <div key={set.id} className="set-item mb-3">
                        <Link to={`/set/${set.id}`}>
                            <div className="set-body d-flex mb-2">
                                <div className="term-count me-4">100 terms</div>
                                <a className="set-author d-flex" href="#">
                                    <div className="author-avatar">
                                        <img
                                            src={avatar}
                                            alt="author avatar"
                                            className="w-100"
                                        />
                                    </div>
                                    <span className="author-username ms-2">
                                        {set.user.username}
                                    </span>
                                </a>
                            </div>
                            <div className="set-title">{set.title}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default StudySetList
