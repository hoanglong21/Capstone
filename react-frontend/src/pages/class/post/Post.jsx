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
    const [allFiles, setAllFiles] = useState([])
    const [loadingUploadFile, setLoadingUploadFile] = useState(false)
    const [loadingUpdatePost, setLoadingUpdatePost] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const tempFiles = (
                await AttachmentService.getAttachmentsByPostId(post.id)
            ).data
            setCurrentFiles([...currentFiles, tempFiles])
            setAllFiles([...allFiles, tempFiles])
        }
    }, [post.id])

    const handleUpdatePost = async () => {
        setLoadingUpdatePost(true)
        try {
            await PostService.updatePost(updatePost.id, updatePost)
            var tempPosts = [...posts]
            tempPosts[index] = updatePost
            stateChanger(tempPosts)
            setShowUpdate(false)
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
                `file/class/${post.classroom.id}/post`
            )
            setUploadFiles([
                ...uploadFiles,
                { name: file.name, type: file.type, url },
            ])
        }
        setLoadingUploadFile(false)
    }

    const handleCancelUpdatePost = () => {
        uploadFiles.map((file) => {
            deleteFileByUrl(file.url, `file/class/${post.classroom.id}/post`)
        })
        setUploadFiles([])
        setUpdatePost({ ...post })
        setShowUpdate(false)
    }

    const handleDeletePost = async () => {
        await PostService.deletePost(post.id)
        uploadFiles.map((file) => {
            deleteFileByUrl(file.url, `file/class/${post.classroom.id}/post`)
        })
        var tempPosts = [...posts]
        tempPosts.splice(index, 1)
        stateChanger(tempPosts)
        document.getElementById(`closeDeletePostModal${index}`).click()
    }

    const handleDeleteFile = (file, index) => {
        var temp = [...uploadFiles]
        temp.splice(index, 1)
        deleteFileByUrl(file.url, `file/class/${post.classroom.id}/post`)
        setUploadFiles(temp)
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
                            <div className="postCreatedDate">Create Date</div>
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
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.content,
                                }}
                            ></div>
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
