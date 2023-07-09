import { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

import ClassService from '../../../services/ClassService'
import { deleteFileByUrl, uploadFile } from '../../../features/fileManagement'

import Post from '../post/Post'
import UpdateClass from '../UpdateClass'
import DeleteClass from '../DeleteClass'
import PostEditor from '../../../components/textEditor/PostEditor'

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
import defaultAvatar from '../../../assets/images/default_avatar.png'
import './MainClass.css'
import PostService from '../../../services/PostService'

const MainClass = () => {
    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()

    const [classroom, setClassroom] = useState({})
    const [posts, setPosts] = useState([])

    const [addPost, setAddPost] = useState({})
    const [uploadFiles, setUploadFiles] = useState([])
    const [loadingUploadFile, setLoadingUploadFile] = useState(false)
    const [loadingAddPost, setLoadingAddPost] = useState(false)

    const [showInput, setShowInput] = useState(false)
    const [image, setImage] = useState(null)
    const [showResetMess, setShowResetMess] = useState(false)

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            const tempClass = (await ClassService.getClassroomById(id)).data
            setClassroom(tempClass)
            setPosts((await PostService.getAllPostByClassId(tempClass.id)).data)
            setAddPost({
                user: {
                    id: userInfo.id,
                },
                classroom: {
                    id: tempClass.id,
                },
                content: '',
            })
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

    const handleUploadFile = async (event) => {
        setLoadingUploadFile(true)
        const file = event.target.files[0]
        if (file) {
            const url = await uploadFile(
                file,
                `file/class/${classroom.id}/post`
            )
            setUploadFiles([
                ...uploadFiles,
                { name: file.name, type: file.type, url },
            ])
        }
        setLoadingUploadFile(false)
    }

    const handleAddPost = async () => {
        setLoadingAddPost(true)
        try {
            await PostService.createPost(addPost)
            setShowInput(false)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoadingAddPost(false)
    }

    const handleCancelAddPost = () => {
        uploadFiles.map((file) => {
            deleteFileByUrl(file.url, `file/class/${classroom.id}/post`)
        })
        setUploadFiles([])
        setAddPost({ ...addPost, content: '' })
        setShowInput(false)
    }

    const handleDeleteFile = (file, index) => {
        var temp = [...uploadFiles]
        temp.splice(index, 1)
        deleteFileByUrl(file.url, `file/class/${classroom.id}/post`)
        setUploadFiles(temp)
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
                        {/* Add post */}
                        <div className="card mainClass__postAddContainer mb-4">
                            {showInput ? (
                                <div>
                                    <div className="postTextEditor">
                                        <PostEditor
                                            onChange={(event, editor) => {
                                                setAddPost({
                                                    ...addPost,
                                                    content: editor.getData(),
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="mainClass_filesUpload mt-3">
                                        {uploadFiles.map((file, index) => (
                                            <div
                                                className="card mb-2"
                                                key={index}
                                            >
                                                <div className="card-body d-flex justify-content-between">
                                                    <div>
                                                        <div className="fileUploadName">
                                                            {file.name}
                                                        </div>
                                                        <div className="fileUploadType">
                                                            {file.type}
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="btn fileUploadDelButton"
                                                        onClick={() =>
                                                            handleDeleteFile(
                                                                file,
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mt-4">
                                        <input
                                            type="file"
                                            id="uploadPostFile"
                                            className="postUpload"
                                            onChange={handleUploadFile}
                                        />
                                        <button
                                            type="btn"
                                            disabled={loadingUploadFile}
                                        >
                                            <label
                                                htmlFor="uploadPostFile"
                                                className="postUploadButton p-2 rounded-circle d-flex align-items-center justify-content-center"
                                            >
                                                {loadingUploadFile ? (
                                                    <div
                                                        className="spinner-border spinner-border-sm text-secondary"
                                                        role="status"
                                                    >
                                                        <span className="visually-hidden">
                                                            LoadingUpload...
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <UploadIcon strokeWidth="2" />
                                                )}
                                            </label>
                                        </button>
                                        <div className="d-flex align-items-center">
                                            <button
                                                onClick={handleCancelAddPost}
                                                className="btn btn-light mx-2"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                onClick={handleAddPost}
                                                className="btn btn-primary"
                                                disabled={
                                                    !addPost.content ||
                                                    loadingAddPost
                                                }
                                            >
                                                {loadingAddPost
                                                    ? 'Posting...'
                                                    : 'Post'}
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
                        {/* Post list */}
                        {posts.map((post, index) => (
                            <Post
                                key={post.id}
                                post={post}
                                index={index}
                                stateChanger={setPosts}
                                posts={posts}
                            />
                        ))}
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
