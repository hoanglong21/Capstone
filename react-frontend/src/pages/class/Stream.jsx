import { useState } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import ClassService from '../../services/ClassService'
import PostService from '../../services/PostService'
import { uploadFile } from '../../features/fileManagement'
import AttachmentService from '../../services/AttachmentService'
import AssignmentService from '../../services/AssignmentService'

import Post from './post/Post'
import PostEditor from '../../components/textEditor/PostEditor'

import empty from '../../assets/images/post_empty.jpg'
import defaultAvatar from '../../assets/images/default_avatar.png'
import {
    CopyIcon,
    DeleteIcon,
    OptionVerIcon,
    ResetIcon,
    UploadIcon,
} from '../../components/icons'
import '../../assets/styles/class.css'
import TestService from '../../services/TestService'
import { useTranslation } from 'react-i18next'
import Pagination from '../../components/Pagination'

const Stream = () => {
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()

    const [classroom, setClassroom] = useState({})
    const [showResetMess, setShowResetMess] = useState(false)
    const [loading, setLoading] = useState(true)

    const [posts, setPosts] = useState([])
    const [showInput, setShowInput] = useState(false)

    const [loadingAddPost, setLoadingAddPost] = useState(false)
    const [addPost, setAddPost] = useState({})

    const [uploadFiles, setUploadFiles] = useState([])
    const [loadingUploadFile, setLoadingUploadFile] = useState(false)

    const [assignments, setAssignments] = useState([])
    const [tests, setTests] = useState([])
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    function getToday() {
        const today = new Date()
        return (
            today.getFullYear() +
            '-' +
            padWithLeadingZeros(today.getMonth() + 1, 2) +
            '-' +
            padWithLeadingZeros(today.getDate(), 2) +
            'T' +
            padWithLeadingZeros(today.getHours(), 2) +
            ':' +
            padWithLeadingZeros(today.getMinutes(), 2)
        )
    }

    function padWithLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0')
    }

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // class
                const tempClass = (await ClassService.getClassroomById(id)).data
                setClassroom(tempClass)
                // posts
                const tempPosts = (
                    await PostService.getFilterList(
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        `=${tempClass.id}`,
                        '=1',
                        '=10'
                    )
                ).data
                setTotalItems(tempPosts.totalItems)
                setPosts(
                    tempPosts.list
                )
                // add post
                setAddPost({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    classroom: {
                        id: tempClass.id,
                    },
                    content: '',
                })
                // upcoming
                const tempAssignments = (
                    await AssignmentService.getFilterList(
                        '',
                        '',
                        '',
                        `=${getToday()}`,
                        '',
                        '',
                        `=${getToday()}`,
                        '',
                        `${userInfo.id === tempClass.user.id ? '' : `=0`}`,
                        '',
                        '',
                        `=${tempClass.id}`,
                        '=1',
                        '=5'
                    )
                ).data.list
                setAssignments(tempAssignments)
                const tempTests = (
                    await TestService.getFilterList(
                        '',
                        '',
                        `=${getToday()}`,
                        '',
                        '',
                        `=${getToday()}`,
                        '',
                        '',
                        `=0`,
                        '',
                        '',
                        '',
                        `=${tempClass.id}`,
                        '=1',
                        '=5'
                    )
                ).data.list
                setTests(tempTests)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
                if (
                    error.message.includes('not exist') ||
                    error?.response.data.includes('not exist')
                ) {
                    navigate('/notFound')
                }
            }
        }
        if (userInfo?.id) {
            setLoading(true)
            fetchData()
            setLoading(false)
        }
    }, [userInfo])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempPosts = (
                    await PostService.getFilterList(
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        `=${classroom.id}`,
                        `=${page}`,
                        '=10'
                    )
                ).data
                setTotalItems(tempPosts.totalItems)
                setPosts(
                    tempPosts.list
                )
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
                if (
                    error.message.includes('not exist') ||
                    error?.response.data.includes('not exist')
                ) {
                    navigate('/notFound')
                }
            }
        }
        if (userInfo?.id && classroom?.id) {
            setLoading(true)
            fetchData()
            setLoading(false)
        }
    }, [classroom, page])

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

    const toggleShowResetMess = () => {
        setShowResetMess(!showResetMess)
    }

    const handleResetCode = async () => {
        try {
            const tempClass = (await ClassService.resetClassCode(classroom.id))
                .data
            setClassroom(tempClass)
            toggleShowResetMess()
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    const handleCopyCode = (event) => {
        navigator.clipboard.writeText(classroom.classcode)
    }

    const handleDeleteFile = (index) => {
        var temp = [...uploadFiles]
        temp.splice(index, 1)
        setUploadFiles(temp)
    }

    const handleUploadFile = async (event) => {
        setLoadingUploadFile(true)
        const file = event.target.files[0]
        if (file) {
            setUploadFiles([
                ...uploadFiles,
                { file_name: file.name, file_type: file.type, file: file },
            ])
        }
        setLoadingUploadFile(false)
    }

    const handleAddPost = async () => {
        setLoadingAddPost(true)
        try {
            // add post
            const tempPost = (await PostService.createPost(addPost)).data
            // upload file to firebase
            let tempAttachments = []
            for (const uploadFileItem of uploadFiles) {
                const url = await uploadFile(
                    uploadFileItem.file,
                    `${userInfo.username}/class/${classroom.id}/post/${tempPost.id}`
                )
                tempAttachments.push({
                    file_name: uploadFileItem.file_name,
                    file_type: uploadFileItem.file_type,
                    file_url: url,
                    post: {
                        id: tempPost.id,
                    },
                    attachmentType: {
                        id: 3,
                    },
                })
            }
            // add attachments
            await AttachmentService.createAttachments(tempAttachments)
            // clear
            setAddPost({
                user: {
                    id: userInfo.id,
                },
                classroom: {
                    id: classroom.id,
                },
                content: '',
            })
            setUploadFiles([])
            const tempPosts = (
                await PostService.getFilterList(
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    `=${classroom.id}`,
                    '=1',
                    '=10'
                )
            ).data
            setPage(1)
            setTotalItems(tempPosts.totalItems)
            setPosts(
                tempPosts.list
            )
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
        setUploadFiles([])
        setAddPost({ ...addPost, content: '' })
        setShowInput(false)
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div
                    className="spinner-border mt-5"
                    style={{ width: '3rem', height: '3rem' }}
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    } else {
        return (
            <div className="row">
                {/* Side */}
                <div className="stream-col-3 ">
                    {/* Class code */}
                    {userInfo?.id === classroom?.user?.id && (
                        <div className="card classCode_container mb-4">
                            <div className="card-body">
                                <div className="card-title mainClass_sectionTitle d-flex justify-content-between align-items-center">
                                    <span>Class code</span>
                                    {!classroom?._deleted && (
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
                                                            {t('copyClass')}
                                                        </span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item py-2 px-3 d-flex align-items-center"
                                                        type="button"
                                                        onClick={
                                                            handleResetCode
                                                        }
                                                    >
                                                        <ResetIcon
                                                            className="me-3"
                                                            size="1.3rem"
                                                        />
                                                        <span className="align-middle fw-medium">
                                                            {t('resetClass')}
                                                        </span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="classCode_value">
                                    {classroom?.classcode}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Upcoming */}
                    <div className="stream-card card">
                        <div className="card-body">
                            <div className="card-title mainClass_sectionTitle">
                                {t('upcoming')}
                            </div>
                            <div className="mb-1">{t('assignment')}</div>
                            {assignments?.length === 0 ? (
                                <p className="mainClass_subText">
                                    {t('noWorkDue')}
                                </p>
                            ) : (
                                assignments?.map((assignment, index) => (
                                    <div key={index} className="mb-1">
                                        <div className="mainClass_dueDate">
                                            Due {assignment.due_date}
                                        </div>
                                        <Link
                                            to={`assignment/${assignment.id}/details`}
                                            className="mainClass_upcomingLink"
                                        >
                                            {assignment?.title}
                                        </Link>
                                    </div>
                                ))
                            )}
                            <div className="mb-1">Test</div>
                            {tests?.length === 0 ? (
                                <p className="mainClass_subText">
                                    {t('noWorkDue')}
                                </p>
                            ) : (
                                tests?.map((test, index) => (
                                    <div key={index} className="mb-1">
                                        <div className="mainClass_dueDate">
                                            {t('due')} {test.due_date}
                                        </div>
                                        <Link
                                            to={`test/${test.id}/details`}
                                            className="mainClass_upcomingLink"
                                        >
                                            {test?.title}
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                {/* Main */}
                <div className="stream-col-9">
                    {/* Add post */}
                    {!classroom?._deleted && (
                        <div className="card mainClass_postAddContainer mb-4">
                            {showInput ? (
                                <div>
                                    <div className="createAssign_formGroup form-floating mb-4">
                                        <PostEditor
                                            onChange={(event, editor) => {
                                                if (addPost?.user?.id) {
                                                    setAddPost({
                                                        ...addPost,
                                                        content:
                                                            editor.getData(),
                                                    })
                                                }
                                            }}
                                        />
                                        <label className="createAssign_formLabel createAssign_editorLabel">
                                            {t('announce')}
                                        </label>
                                    </div>
                                    <div className="mainClass_filesUpload mt-3">
                                        {uploadFiles.map((file, index) => (
                                            <div
                                                className="card mb-2"
                                                key={index}
                                            >
                                                <div className="card-body d-flex justify-content-between">
                                                    <a
                                                        className="text-decoration-none w-100"
                                                        href={file.file_url}
                                                        target="_blank"
                                                    >
                                                        <div className="fileUploadName">
                                                            {file.file_name}
                                                        </div>
                                                        <div className="fileUploadType">
                                                            {file.file_type}
                                                        </div>
                                                    </a>
                                                    <button
                                                        className="btn fileUploadDelButton"
                                                        onClick={() =>
                                                            handleDeleteFile(
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
                                            onClick={(event) => {
                                                event.target.value = null
                                            }}
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
                                                {t('cancel')}
                                            </button>
                                            <button
                                                onClick={handleAddPost}
                                                className="btn btn-primary"
                                                disabled={
                                                    !addPost?.content ||
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
                                    className="mainClass_postAddWrapper d-flex align-items-center"
                                    onClick={() => {
                                        setShowInput(true)
                                    }}
                                >
                                    <div className="maiClass_postAddAuthor">
                                        <img
                                            src={
                                                userInfo.avatar
                                                    ? userInfo.avatar
                                                    : defaultAvatar
                                            }
                                            className="w-100 h-100"
                                            alt="author avatar"
                                        />
                                    </div>
                                    <span className="ms-4">
                                        {t('announce')}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                    {/* Empty */}
                    {posts?.length === 0 ? (
                        <div className="card emptyPosts_container">
                            <div className="card-body d-flex flex-column align-items-center">
                                <img src={empty} alt="" />
                                <p className="emptyPosts_heading">
                                    {t('msg74')}
                                </p>
                                <p className="emptyPosts_content">
                                    {t('msg75')}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {posts?.map((post, index) => (
                            <Post
                                key={post.id}
                                post={post}
                                index={index}
                                stateChanger={setPosts}
                                posts={posts}
                                userInfo={userInfo}
                            />
                        ))}
                        <Pagination
                            className="mb-5"
                            currentPage={page}
                            totalCount={totalItems}
                            pageSize={10}
                            onPageChange={(page) => {
                                setPage(page)
                            }}
                        />
                        </div>
                        
                    )}
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
                                    {t('classCodeSet')} {classroom.classcode}
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
}
export default Stream
