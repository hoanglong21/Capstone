import { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ClassService from '../../../services/ClassService'

import PostInClass from '../../PostInClass'
import {
    CopyIcon,
    DeleteIcon,
    EditIcon,
    OptionHorIcon,
    OptionVerIcon,
    ReportIcon,
    ResetIcon,
} from '../../../components/icons'
import './MainClass.css'

const MainClass = () => {
    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()

    const [classroom, setClassroom] = useState({})
    const [showInput, setShowInput] = useState(false)
    const [inputValue, setInput] = useState('')
    const [image, setImage] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const res = (await ClassService.getClassroomById(id)).data
            setClassroom(res)
        }
        if (userInfo.username) {
            fetchData()
        }
    }, [userInfo])

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    return (
        <div className="mainClass__container mx-auto">
            <div className="card mt-4 mainClass__header">
                <div className="card-body h-50 d-flex flex-row justify-content-between align-items-center">
                    <h1 className="card-title mainClass__heading mainClass__overflow">
                        {classroom.class_name}
                    </h1>

                    <div class="dropdown align-self-start">
                        <button
                            className="btn btn-outline-secondary icon-outline-secondary "
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <OptionHorIcon />
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <button
                                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                                    type="button"
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
                                <hr class="dropdown-divider" />
                            </li>
                            <li>
                                <button
                                    className="dropdown-item btn-del py-2 px-3 d-flex align-items-center"
                                    type="button"
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
            </div>
            <div className="row mt-4">
                <div className="col-3">
                    <div className="card classCode_container mb-4">
                        <div className="card-body">
                            <div className="card-title mainClass_sectionTitle d-flex justify-content-between align-items-center">
                                <span>Class code</span>
                                <div class="dropdown">
                                    <button
                                        className="mainClass_sectionButton btn btn-light p-2 rounded-circle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <OptionVerIcon />
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <button
                                                className="dropdown-item py-2 px-3 d-flex align-items-center"
                                                type="button"
                                            >
                                                <CopyIcon
                                                    className="me-3"
                                                    size="1.3rem"
                                                />
                                                <span className="align-middle fw-medium">
                                                    Copy class code
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item py-2 px-3 d-flex align-items-center"
                                                type="button"
                                            >
                                                <ResetIcon
                                                    className="me-3"
                                                    size="1.3rem"
                                                />
                                                <span className="align-middle fw-medium">
                                                    Reset class code
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="classCode_value">
                                {classroom.classcode}
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title mainClass_sectionTitle">
                                Upcoming
                            </div>
                            <p className="mainClass__subText">No work due</p>
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="mainClass__announcementsWrapper mb-4">
                        <div className="mainClass__ancContent">
                            {showInput ? (
                                <div className="mainClass__form">
                                    <input
                                        id="filled-multiline-flexible"
                                        placeholder="Announce something to class"
                                        value={inputValue}
                                        onChange={(e) =>
                                            setInput(e.target.value)
                                        }
                                    />
                                    <div className="mainClass__buttons">
                                        <input
                                            onChange={handleChange}
                                            type="file"
                                        />

                                        <div>
                                            <button
                                                onClick={() =>
                                                    setShowInput(false)
                                                }
                                                className="btn btn-outline-danger mx-2"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                onClick={'/'}
                                                className="btn btn-outline-primary"
                                            >
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="mainClass__wrapper100"
                                    onClick={() => setShowInput(true)}
                                >
                                    <AiOutlineUser />
                                    <div>Announce something to class</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <PostInClass />
                </div>
            </div>
        </div>
    )
}

export default MainClass
