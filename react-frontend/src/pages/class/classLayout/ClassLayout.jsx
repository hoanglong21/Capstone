import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'

import ClassService from '../../../services/ClassService'

import UpdateClass from '../UpdateClass'
import DeleteClass from '../DeleteClass'

import {
    ClassIcon,
    DeleteIcon,
    EditIcon,
    OptionHorIcon,
    ReportIcon,
} from '../../../components/icons'
import './classLayout.css'

const ClassLayout = () => {
    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()

    const [classroom, setClassroom] = useState({})

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            const tempClass = (await ClassService.getClassroomById(id)).data
            setClassroom(tempClass)
        }
        if (userInfo.username) {
            fetchData()
        }
    }, [userInfo, id])

    // ignore error
    useEffect(() => {
        window.addEventListener('error', (e) => {
            if (e.message === 'ResizeObserver loop limit exceeded') {
                const resizeObserverErrDiv = document.getElementById(
                    'webpack-dev-server-client-overlay-div'
                )
                const resizeObserverErr = document.getElementById(
                    'webpack-dev-server-client-overlay'
                )
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute('style', 'display: none')
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute('style', 'display: none')
                }
            }
        })
    }, [])

    return (
        <div>
            <div className="mainClass_container mx-auto">
                {/* Header */}
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <ClassIcon
                            size="3.125rem"
                            className="mainClassHeader_icon"
                            strokeWidth="2"
                        />
                        <h1 className="mainClass_title m-0 ms-3">
                            {classroom.class_name}
                        </h1>
                    </div>
                    <div className="dropdown align-self-start">
                        <button
                            className="btn btn-outline-secondary icon-outline-secondary "
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <OptionHorIcon />
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <button
                                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#updateClassModal"
                                >
                                    <EditIcon className="me-3" size="1.3rem" />
                                    <span className="align-middle fw-semibold">
                                        Edit
                                    </span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                                    type="button"
                                >
                                    <ReportIcon
                                        className="me-3"
                                        size="1.3rem"
                                        strokeWidth="2"
                                    />
                                    <span className="align-middle fw-semibold">
                                        Report
                                    </span>
                                </button>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <button
                                    className="dropdown-item btn-del py-2 px-3 d-flex align-items-center"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteClassModal"
                                >
                                    <DeleteIcon
                                        className="me-3"
                                        size="1.3rem"
                                        strokeWidth="2"
                                    />
                                    <span className="align-middle fw-semibold">
                                        Delete
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mainClass_navbar mt-4">
                    <ul className="nav">
                        <li>
                            <NavLink
                                to=""
                                end
                                className={
                                    'mainClass_navlink ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <span className="align-middle">Stream</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="assignments"
                                className={
                                    'mainClass_navlink ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <span className="align-middle">
                                    Assignments
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="tests"
                                className={
                                    'mainClass_navlink ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <span className="align-middle">Tests</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="people"
                                className={
                                    'mainClass_navlink ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <span className="align-middle">People</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="mark"
                                className={
                                    'mainClass_navlink ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <span className="align-middle">Mark</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="mt-4">
                    <Outlet />
                </div>
            </div>
            {/* Update class Modal */}
            <UpdateClass classroom={classroom} stateChanger={setClassroom} />
            {/* Delete class modal */}
            <DeleteClass classroom={classroom} />
        </div>
    )
}

export default ClassLayout
