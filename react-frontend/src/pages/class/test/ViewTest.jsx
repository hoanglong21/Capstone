import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import ClassService from '../../../services/ClassService'

import { ClassIcon } from '../../../components/icons'

const ViewTest = () => {
    const navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()
    const [classroom, setClassroom] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempClass = (await ClassService.getClassroomById(id)).data
                setClassroom(tempClass)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (userInfo.username) {
            fetchData()
        }
    }, [userInfo, id])

    return (
        <div className="mainClass_container mx-auto">
            <div
                className="d-flex align-items-center"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    navigate(`/class/${id}`)
                }}
            >
                <ClassIcon
                    size="3.125rem"
                    className="mainClassHeader_icon"
                    strokeWidth="2"
                />
                <h1 className="mainClass_title m-0 ms-3">
                    {classroom.class_name}
                </h1>
            </div>
            <div className="mainClass_navbar mt-3">
                <ul className="nav d-flex justify-content-center">
                    <li>
                        <NavLink
                            to="../details"
                            relative="path"
                            className={
                                'mainClass_navlink px-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Details</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="../results"
                            relative="path"
                            className={
                                'mainClass_navlink px-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Results</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <Outlet />
        </div>
    )
}

export default ViewTest
