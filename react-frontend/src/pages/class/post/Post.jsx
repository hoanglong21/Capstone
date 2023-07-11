import { useEffect, useState } from 'react'

import PostService from '../../../services/PostService'
import { deleteFileByUrl, uploadFile } from '../../../features/fileManagement'

import CardEditor from '../../../components/textEditor/CardEditor'
import PostEditor from '../../../components/textEditor/PostEditor'

import defaultAvatar from '../../../assets/images/default_avatar.png'
import {
    DeleteIcon,
    OptionVerIcon,
    SendIcon,
    UploadIcon,
} from '../../../components/icons'
import './post.css'
import AttachmentService from '../../../services/AttachmentService'

const Post = ({ post, stateChanger, posts, index }) => {
    const [showUpdate, setShowUpdate] = useState(false)

    const [updatePost, setUpdatePost] = useState({ ...post })
    const [currentFiles, setCurrentFiles] = useState([])
    const [uploadFiles, setUploadFiles] = useState([])
    const [loadingUploadFile, setLoadingUploadFile] = useState(false)
    const [loadingUpdatePost, setLoadingUpdatePost] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempFiles = (
                    await AttachmentService.getAttachmentsByPostId(post.id)
                ).data
                setCurrentFiles([...tempFiles])
                setUploadFiles([...tempFiles])
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        fetchData()
    }, [post.id])

    const handleUpdatePost = async () => {
        setLoadingUpdatePost(true)
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
                await PostService.updatePost(
                    updatePost.id,
                    updatePost,
                    `${filenames ? `=${filenames}` : ''}`,
                    '=3',
                    `${fileUrls ? `=${fileUrls}` : ''}`,
                    `${fileTypes ? `=${fileTypes}` : ''}`
                )
            ).data
            var tempPosts = [...posts]
            tempPosts[index] = tempPost
            stateChanger(tempPosts)
            setShowUpdate(false)
            setCurrentFiles([...uploadFiles])
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoadingUpdatePost(false)
    }

    const handleUploadFile = async (event) => {
        setLoadingUploadFile(true)
        const file = event.target.files[0]
        if (file) {
            const url = await uploadFile(
                file,
                `file/class/${post.classroom.id}/post`,
                file.type
            )
            setUploadFiles([
                ...uploadFiles,
                { file_name: file.name, file_type: file.type, file_url: url },
            ])
        }
        setLoadingUploadFile(false)
    }

    const handleCancelUpdatePost = () => {
        uploadFiles.forEach((file) => {
            deleteFileByUrl(
                file.file_url,
                `file/class/${post.classroom.id}/post`
            )
        })
        setUploadFiles(currentFiles)
        setUpdatePost({ ...post })
        setShowUpdate(false)
    }

    const handleDeletePost = async () => {
        await PostService.deletePost(post.id)
        currentFiles.forEach((file) => {
            deleteFileByUrl(
                file.file_url,
                `file/class/${post.classroom.id}/post`
            )
        })
        var tempPosts = [...posts]
        tempPosts.splice(index, 1)
        stateChanger(tempPosts)
        document.getElementById(`closeDeletePostModal${index}`).click()
    }

    const handleDeleteFile = (fileUrl, index) => {
        var temp = [...uploadFiles]
        temp.splice(index, 1)
        setUploadFiles(temp)
        deleteFileByUrl(fileUrl, `file/class/${post.classroom.id}/post`)
    }

    function getDate(date) {
        var index = date.lastIndexOf('.')
        return date.replace('T', ' ').substring(0, index)
    }

    return (
        <div>
            <div className="card mb-4">
                <div className="card-header bg-white d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="postAuthorImg">
                            <img
                                src={
                                    post.user.avatar
                                        ? post.user.avatar
                                        : defaultAvatar
                                }
                                className="w-100 h-100"
                                alt=""
                            />
                        </div>
                        <div className="ms-3">
                            <div className="postAuthor">
                                {post.user.username}
                            </div>
                            <div className="postCreatedDate">
                                {getDate(post.created_date)}
                            </div>
                        </div>
                    </div>
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
                                    onClick={() => {
                                        setShowUpdate(true)
                                    }}
                                >
                                    <span className="align-middle fw-medium">
                                        Edit
                                    </span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#deletePostModal${index}`}
                                >
                                    <span className="align-middle fw-medium">
                                        Delete
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card-body">
                    <div className="post__content">
                        {showUpdate ? (
                            <div>
                                <div className="postTextEditor">
                                    <PostEditor
                                        data={updatePost?.content}
                                        onChange={(event, editor) => {
                                            if (updatePost?.id) {
                                                setUpdatePost({
                                                    ...updatePost,
                                                    content: editor.getData(),
                                                })
                                            }
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
                                                            file.file_url,
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
                                            onClick={handleCancelUpdatePost}
                                            className="btn btn-light mx-2"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleUpdatePost}
                                            className="btn btn-primary"
                                            disabled={
                                                !updatePost.content ||
                                                loadingUpdatePost
                                            }
                                        >
                                            {loadingUpdatePost
                                                ? 'Saving...'
                                                : 'Save'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: post.content,
                                    }}
                                ></div>
                                <div className="row">
                                    {currentFiles.map((file) => (
                                        <div className="col-6" key={file.id}>
                                            <a
                                                className="card mb-2 text-decoration-none"
                                                href={file.file_url}
                                                target="_blank"
                                            >
                                                <div className="card-body d-flex justify-content-between">
                                                    <div className="fileUploadContainer">
                                                        <div className="fileUploadName">
                                                            {file.file_name}
                                                        </div>
                                                        <div className="fileUploadType">
                                                            {file.file_type}
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="card-footer bg-white">
                    <div className="row g-5 d-flex align-items-center">
                        <div className="col">
                            <div className="postAuthorImg">
                                <img
                                    src={defaultAvatar}
                                    className="w-100 h-100"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="postCommentEditor">
                                <CardEditor />
                            </div>
                        </div>
                        <button className="col">
                            <SendIcon />
                        </button>
                    </div>
                </div>
            </div>
            {/* Delete post modal */}
            <div className="modal fade" id={`deletePostModal${index}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Delete Announcement?
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                id={`closeDeletePostModal${index}`}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Comments will also be deleted
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleDeletePost}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Post
