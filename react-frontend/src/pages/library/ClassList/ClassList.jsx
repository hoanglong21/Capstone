import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { ClassIcon, SearchIcon } from '../../../components/icons'

import '../../../assets/styles/Classroom.css'
import './ClassList.css'
import ClassService from '../../../services/ClassService'

const ClassList = () => {
    const navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.user)

    const [classes, setClasses] = useState([])
    const [search, setSearch] = useState('')
    const [isEmpty, setIsEmpty] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const temp = (
                await ClassService.getFilterList(
                    '',
                    '',
                    `=${userInfo.username}`,
                    '',
                    '',
                    '',
                    ''
                )
            ).data.list
            if (temp.length === 0) {
                setIsEmpty(true)
            }
            setClasses(temp)
        }
        if (userInfo.username) {
            fetchData()
        }
    }, [userInfo])

    const handleSearch = async (event) => {
        const temp = event.target.value
        setSearch(temp)
        setClasses(
            (
                await ClassService.getFilterList(
                    '',
                    `${temp ? '=' + temp : ''}`,
                    `=${userInfo.username}`,
                    '',
                    '',
                    '',
                    ''
                )
            ).data.list
        )
    }

    return (
        <div className="container mt-4 mb-5">
            {isEmpty ? (
                <div className="noClass__container">
                    <img
                        className="noClass__img"
                        src="https://www.gstatic.com/classroom/empty_states_home.svg"
                        alt=""
                    />
                    <p className="noClass__message">
                        One more class to get started
                    </p>
                    <div className="noClass__link">
                        <Link
                            className="noClass__link1"
                            data-bs-toggle="modal"
                            data-bs-target="#createModal"
                        >
                            Create Class
                        </Link>
                        <Link className="noClass__link2" to="/joinclass">
                            Join Class
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="sets-search mb-4 d-flex align-items-center">
                        <input
                            className="search-control flex-grow-1"
                            placeholder="Search your sets"
                            type="text"
                            value={search}
                            onChange={handleSearch}
                        ></input>
                        <SearchIcon />
                    </div>
                    <div className="sets-list">
                        {classes.length === 0 && (
                            <p>No classes matching {search} found</p>
                        )}
                        {classes.map((classroom) => (
                            <div key={classroom.id} className="set-item mb-3">
                                <Link to={`/class/${classroom.id}`}>
                                    <div className="set-body row mb-2">
                                        <div className="term-count col-1">
                                            {classroom.users.length} member
                                        </div>
                                        <div className="term-count col-1">
                                            {classroom.studySets.length} sets
                                        </div>
                                        <div
                                            className="set-author col d-flex "
                                            href="#"
                                        >
                                            <div className="author-avatar">
                                                <img
                                                    src={userInfo.avatar}
                                                    alt="author avatar"
                                                    className="w-100 h-100"
                                                />
                                            </div>
                                            <span className="author-username ms-2">
                                                {userInfo.username}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="set-title col-2 d-flex align-items-center">
                                            <ClassIcon className="me-2" />
                                            {classroom.class_name}
                                        </div>
                                        <div className="col d-flex align-items-center">
                                            <p className="set-description m-0">
                                                {classroom.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
export default ClassList
