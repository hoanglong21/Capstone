import { useState } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import ClassService from '../../services/ClassService'
import { deleteFileByUrl, uploadFile } from '../../features/fileManagement'
import PostService from '../../services/PostService'

import Post from './post/Post'
import PostEditor from '../../components/textEditor/PostEditor'

import {
    AccountSolidIcon,
    CopyIcon,
    DeleteIcon,
    OptionVerIcon,
    ResetIcon,
    UploadIcon,
} from '../../components/icons'

const Stream = () => {
    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()

    const [classroom, setClassroom] = useState({})
    const [showResetMess, setShowResetMess] = useState(false)

    const [posts, setPosts] = useState([])
    const [showInput, setShowInput] = useState(false)

    const [loadingAddPost, setLoadingAddPost] = useState(false)
    const [addPost, setAddPost] = useState({})

    const [uploadFiles, setUploadFiles] = useState([])
    const [loadingUploadFile, setLoadingUploadFile] = useState(false)

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
        if (userInfo?.id) {
            fetchData()
        }
    }, [userInfo])

    const toggleShowResetMess = () => {
        setShowResetMess(!showResetMess)
    }

    const handleResetCode = async () => {
        const tempClass = (await ClassService.resetClassCode(classroom.id)).data
        setClassroom(tempClass)
        toggleShowResetMess()
    }

    const handleCopyCode = (event) => {
        navigator.clipboard.writeText(classroom.classcode)
    }

    const handleDeleteFile = (file, index) => {
        var temp = [...uploadFiles]
        temp.splice(index, 1)
        deleteFileByUrl(file.file_url, `file/class/${classroom.id}/post`)
        setUploadFiles(temp)
    }

    const handleUploadFile = async (event) => {
        setLoadingUploadFile(true)
        const file = event.target.files[0]
        if (file) {
            const url = await uploadFile(
                file,
                `file/class/${classroom.id}/post`,
                file.type
            )
            setUploadFiles([
                ...uploadFiles,
                { file_name: file.name, file_type: file.type, file_url: url },
            ])
        }
        setLoadingUploadFile(false)
    }

    const handleAddPost = async () => {
        setLoadingAddPost(true)
        try {
            var tempFilenames = ''
            var tempFileUrls = ''
            var tempFileTypes = ''
            uploadFiles.forEach((uploadFile) => {
                tempFilenames += uploadFile.file_name + ','
                tempFileUrls += uploadFile.file_url + ','
                tempFileTypes += uploadFile.file_type + ','
            })
            const filenames = tempFilenames.substring(
                0,
                tempFilenames.length - 1
            )
            const fileUrls = tempFileUrls.substring(0, tempFileUrls.length - 1)
            const fileTypes = tempFileTypes.substring(
                0,
                tempFileTypes.length - 1
            )
            const tempPost = (
                await PostService.createPost(
                    addPost,
                    `${filenames ? `=${filenames}` : ''}`,
                    '=3',
                    `${fileUrls ? `=${fileUrls}` : ''}`,
                    `${fileTypes ? `=${fileTypes}` : ''}`
                )
            ).data
            setAddPost({})
            setUploadFiles([])
            setPosts([...posts, tempPost])
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
        uploadFiles.forEach((file) => {
            deleteFileByUrl(file.file_url, `file/class/${classroom.id}/post`)
        })
        setUploadFiles([])
        setAddPost({ ...addPost, content: '' })
        setShowInput(false)
    }

    return (
        <div className="row">
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
                            {classroom?.classcode}
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title mainClass_sectionTitle">
                            Upcoming
                        </div>
                        <p className="mainClass_subText">No work due</p>
                    </div>
                </div>
            </div>
            {/* Main */}
            <div className="col-9">
                {/* Add post */}
                <div className="card mainClass_postAddContainer mb-4">
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
                                    <div className="card mb-2" key={index}>
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
                                <button type="btn" disabled={loadingUploadFile}>
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
                                            !addPost.content || loadingAddPost
                                        }
                                    >
                                        {loadingAddPost ? 'Posting...' : 'Post'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="mainClass_wrapper100"
                            onClick={() => setShowInput(true)}
                        >
                            <AccountSolidIcon />
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
export default Stream
