import { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

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
    UploadIcon,
} from '../../../components/icons'
import './MainClass.css'
import UpdateClass from '../UpdateClass'
import DeleteClass from '../DeleteClass'
import PostEditor from '../../../components/textEditor/PostEditor'

const MainClass = () => {
    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()

    const [classroom, setClassroom] = useState({})
    const [showInput, setShowInput] = useState(false)
    const [inputValue, setInput] = useState('')
    const [image, setImage] = useState(null)
    const [showResetMess, setShowResetMess] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const res = (await ClassService.getClassroomById(id)).data
            setClassroom(res)
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

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleCopyCode = (event) => {
        navigator.clipboard.writeText(classroom.classcode)
    }

    const handleResetCode = async () => {
        const tempClass = (await ClassService.resetClassCode(classroom.id)).data
        setClassroom(tempClass)
        toggleShowResetMess()
    }

    const toggleShowResetMess = () => {
        setShowResetMess(!showResetMess)
    }

    const handleUploadFile = async (event, folderName) => {
        const name = event.target.name
        const file = event.target.files[0]
        if (file) {
            // const urlOld = String(card[name])
            // const url = await uploadFile(file, folderName)
            // const tempCard = { ...card, [name]: url }
            // setCard(tempCard)
            // if (urlOld) {
            //     deleteFileByUrl(urlOld, folderName)
            // }
            // doUpdateCard(tempCard)
        }
    }

    return (
        <div>
            <div className="mainClass__container mx-auto">
                {/* Header */}
                <div className="card mt-4 mainClass__header">
                    <div className="card-body h-50 d-flex flex-row justify-content-between align-items-center">
                        <h1 className="card-title mainClass__heading mainClass__overflow">
                            {classroom.class_name}
                        </h1>

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
                                        <EditIcon
                                            className="me-3"
                                            size="1.3rem"
                                        />
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
                </div>
                <div className="row mt-4">
                    {/* Side */}
                    <div className="col-3">
                        <div className="card classCode_container mb-4">
                            <div className="card-body">
                                <div className="card-title mainClass_sectionTitle d-flex justify-content-between align-items-center">
                                    <span>Class code</span>
                                    <div className="dropdown">
                                        <button
                                            className="mainClass_sectionButton btn btn-light p-2 rounded-circle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <OptionVerIcon />
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <button
                                                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                                                    type="button"
                                                    onClick={handleCopyCode}
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
                                                    onClick={handleResetCode}
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
                                <p className="mainClass__subText">
                                    No work due
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Main */}
                    <div className="col-9">
                        <div className="card mainClass__postAddContainer mb-4">
                            {showInput ? (
                                <div>
                                    <div className="postTextEditor">
                                        <PostEditor />
                                    </div>
                                    <div className="postUploadFile">
                                        <input
                                            type="file"
                                            id="uploadPostFile"
                                            accept="audio/*"
                                            name="audio"
                                            className="postUpload"
                                            onChange={(event) =>
                                                handleUploadFile(event, 'file')
                                            }
                                        />
                                        <label
                                            htmlFor="uploadPostFile"
                                            className="postUploadButton p-2 rounded-circle d-flex align-items-center justify-content-center"
                                        >
                                            <UploadIcon strokeWidth="2" />
                                        </label>
                                        <div className="d-flex align-items-center">
                                            <button
                                                onClick={() =>
                                                    setShowInput(false)
                                                }
                                                className="btn btn-light mx-2"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                onClick={'/'}
                                                className="btn btn-primary"
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
                        <PostInClass />
                    </div>
                </div>
                {/* Update class Modal */}
                <UpdateClass
                    classroom={classroom}
                    stateChanger={setClassroom}
                />
                {/* Delete class modal */}
                <DeleteClass classroom={classroom} />
            </div>
            {/* Toast reset code */}
            <ToastContainer
                className="p-3 mt-5 position-sticky"
                position="bottom-start"
                style={{ zIndex: 9999 }}
            >
                <Toast
                    show={showResetMess}
                    onClose={toggleShowResetMess}
                    delay={5000}
                    className="toast align-items-center text-bg-dark border-0"
                    autohide
                >
                    <Toast.Body className="d-flex flex-column p-3">
                        <div className="d-flex justify-content-between">
                            <span className="me-auto">
                                Class code set to {classroom.classcode}
                            </span>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="toast"
                                aria-label="Close"
                            ></button>
                        </div>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}

export default MainClass
