import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

import ClassService from '../../services/ClassService'

import { ClassIcon } from '../../components/icons'
import defaultAvatar from '../../assets/images/default_avatar.png'
import '../../assets/styles/LibrarySearchList.css'
import '../../assets/styles/Home.css'

const ClassesForHome = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const [classes, setClasses] = useState([])

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
                    '',
                    ''
                )
            ).data.list
            setClasses(temp)
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
                {classes?.length === 0 && (
                    <p className="noFound">
                        No classes matching {search} found
                    </p>
                )}
                {classes?.map((classroom) => (
                    <div key={classroom.id} className="set-item mb-3">
                        <Link to={`/class/${classroom.id}`}>
                            <div className="set-body row mb-2">
                                <div className="class-home term-count">
                                    {classroom?.member} member
                                </div>
                                <div className="class-home term-count">
                                    {classroom?.studyset} sets
                                </div>
                                <div className="set-author col d-flex ">
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
                                        style={{ whiteSpace: 'pre-wrap' }}
                                    >
                                        {classroom?.description}
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
export default ClassesForHome
