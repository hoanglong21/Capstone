import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import ClassService from '../../services/ClassService'

import { ClassIcon, SearchIcon } from '../../components/icons'
import defaultAvatar from '../../assets/images/default_avatar.png'
import '../../assets/styles/Classroom.css'
import '../../assets/styles/ClassList.css'

const ClassList = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const { userInfo } = useSelector((state) => state.user)

    const [classes, setClasses] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)

    const fetchData = async (searchKey) => {
        setIsEmpty(false)
        const temp = (
            await ClassService.getFilterList(
                '',
                `${searchKey ? '=' + searchKey : ''}`,
                `=${userInfo.username}`,
                '',
                '',
                '',
                ''
            )
        ).data.list
        setClasses(temp)
    }

    const checkEmpty = async () => {
        setIsEmpty(false)
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
    }

    useEffect(() => {
        if (userInfo.username) {
            checkEmpty()
        }
    }, [userInfo])

    useEffect(() => {
        if (userInfo.username) {
            fetchData(search ? search : '')
        }
    }, [userInfo, search])

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
                        <a
                            className="noClass__link1"
                            data-bs-toggle="modal"
                            data-bs-target="#createModal"
                        >
                            Create Class
                        </a>
                        <a
                            className="noClass__link2"
                            data-bs-toggle="modal"
                            data-bs-target="#joinModal"
                        >
                            Join Class
                        </a>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="sets-search mb-4 d-flex align-items-center">
                        <input
                            className="search-control flex-grow-1"
                            placeholder="Search your classes"
                            type="text"
                            value={search || ''}
                            onChange={(event) =>
                                setSearchParams({
                                    search: event.target.value,
                                })
                            }
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
                                                    src={
                                                        userInfo.avatar
                                                            ? userInfo.avatar
                                                            : defaultAvatar
                                                    }
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
                                            <p
                                                className="set-description m-0"
                                                style={{
                                                    whiteSpace: 'pre-wrap',
                                                }}
                                            >
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
