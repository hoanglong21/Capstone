import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import PostService from '../../../services/PostService'
import AttachmentService from '../../../services/AttachmentService'
import {
    deleteFileByUrl,
    deleteFolder,
    uploadFile,
} from '../../../features/fileManagement'

import CommentService from '../../../services/CommentService'

import CardEditor from '../../../components/textEditor/CardEditor'
import PostEditor from '../../../components/textEditor/PostEditor'
import Comment from '../../../components/comment/Comment'

import defaultAvatar from '../../../assets/images/default_avatar.png'
import banned from '../../../assets/images/banned.png'
import verified from '../../../assets/images/verified.png'
import deleted from '../../../assets/images/deleted.png'
import {
    DeleteIcon,
    MemberSolidIcon,
    OptionVerIcon,
    SendIcon,
    UploadIcon,
} from '../../../components/icons'
import './post.css'

const Post = ({ post, stateChanger, posts, index, userInfo }) => {
    const [showUpdate, setShowUpdate] = useState(false)

    const [updatePost, setUpdatePost] = useState({ ...post })
    const [currentFiles, setCurrentFiles] = useState([])
    const [uploadFiles, setUploadFiles] = useState([])
    const [deleteFiles, setDeleteFiles] = useState([])
    const [loadingUploadFile, setLoadingUploadFile] = useState(false)
    const [loadingUpdatePost, setLoadingUpdatePost] = useState(false)

    const [comments, setComments] = useState([])
    const [addComment, setAddComment] = useState('')
    const [loadingComment, setLoadingComment] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    // ignore error
    useEffect(() => {
        window.addEventListener('error', (e) => {
            console.log(e)
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
        })
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                // attachments
                const tempFiles = (
                    await AttachmentService.getAttachmentsByPostId(post.id)
                ).data
                setCurrentFiles([...tempFiles])
                setUploadFiles([...tempFiles])
                // comments
                const tempComments = (
                    await CommentService.getAllCommentByPostId(post.id)
                ).data
                setComments(tempComments)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (post?.id) {
            fetchData()
        }
    }, [post])

    const handleUpdatePost = async () => {
        setLoadingUpdatePost(true)
        try {
            // update post
            const tempPost = (
                await PostService.updatePost(updatePost.id, updatePost)
            ).data
            // delete file in firebase
            for (const deleteFile of deleteFiles) {
                if (deleteFile.file_url) {
                    await deleteFileByUrl(
                        deleteFile.file_url,
                        `${userInfo.username}/class/${post.classroom.id}/post/${post.id}`
                    )
                }
            }
            // add attachments
            let tempAttachments = []
            for (const uploadFileItem of uploadFiles) {
                if (uploadFileItem.file_url) {
                    tempAttachments.push({
                        file_name: uploadFileItem.file_name,
                        file_type: uploadFileItem.file_type,
                        file_url: uploadFileItem.file_url,
                        post: {
                            id: post.id,
                        },
                        attachmentType: {
                            id: 3,
                        },
                    })
                } else {
                    const url = await uploadFile(
                        uploadFileItem.file,
                        `${userInfo.username}/class/${post.classroom.id}/post/${post.id}`
                    )
                    tempAttachments.push({
                        file_name: uploadFileItem.file_name,
                        file_type: uploadFileItem.file_type,
                        file_url: url,
                        post: {
                            id: post.id,
                        },
                        attachmentType: {
                            id: 3,
                        },
                    })
                }
            }
            await AttachmentService.createAttachments(tempAttachments)
            // update list posts
            var tempPosts = [...posts]
            tempPosts[index] = tempPost
            stateChanger(tempPosts)
            // clear
            setShowUpdate(false)
            setCurrentFiles([...tempAttachments])
            setUploadFiles([...tempAttachments])
            setDeleteFiles([])
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
            setUploadFiles([
                ...uploadFiles,
                { file_name: file.name, file_type: file.type, file: file },
            ])
        }
        setLoadingUploadFile(false)
    }

    const handleCancelUpdatePost = () => {
        setUploadFiles([...currentFiles])
        setUpdatePost({ ...post })
        setShowUpdate(false)
        setDeleteFiles([])
    }

    const handleDeletePost = async () => {
        try {
            await PostService.deletePost(post.id)
            var tempPosts = [...posts]
            tempPosts.splice(index, 1)
            stateChanger(tempPosts)
            setShowDeleteModal(false)
            await deleteFolder(
                `files/${userInfo.username}/class/${post.classroom.id}/post/${post.id}`
            )
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    const handleDeleteFile = async (file, index) => {
        // add to list delete
        var tempDelete = [...deleteFiles]
        tempDelete.push(file)
        setDeleteFiles(tempDelete)
        // update list file
        var temp = [...uploadFiles]
        temp.splice(index, 1)
        setUploadFiles(temp)
    }

    const handleAddComment = async () => {
        setLoadingComment(true)
        try {
            // remove line break
            var text = new String(addComment)
            while (true) {
                const lastIndex = text.lastIndexOf('<p>&nbsp;</p>')
                if (text.length - 13 !== lastIndex) {
                    break
                }
                text = new String(text.slice(0, lastIndex))
            }
            // create comment
            var tempComment = {
                user: {
                    id: userInfo.id,
                    username: userInfo.username,
                    avatar: userInfo.avatar,
                },
                content: text,
                commentType: {
                    id: 1,
                },
                post: {
                    id: post.id,
                },
            }
            tempComment = (await CommentService.createComment(tempComment)).data
            // add to list
            setComments([...comments, tempComment])
            // clear
            setAddComment('')
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoadingComment(false)
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
                            <div className="d-flex align-items-center">
                                <div className="postAuthor">
                                    {post.user.username}
                                </div>
                                {post?.user?.status === 'banned' && (
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="tooltip">
                                                This account is banned.
                                            </Tooltip>
                                        }
                                    >
                                        <img
                                            className="ms-1 author-avatarTag author-avatarTag--banned"
                                            src={banned}
                                        />
                                    </OverlayTrigger>
                                )}
                                {post?.user?.status === 'active' && (
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="tooltip">
                                                This account is verified.
                                            </Tooltip>
                                        }
                                    >
                                        <img
                                            className="ms-1 author-avatarTag"
                                            src={verified}
                                        />
                                    </OverlayTrigger>
                                )}
                                {post?.user?.status === 'deleted' && (
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="tooltip">
                                                This account is deleted.
                                            </Tooltip>
                                        }
                                    >
                                        <img
                                            className="ms-1 author-avatarTag"
                                            src={deleted}
                                        />
                                    </OverlayTrigger>
                                )}
                            </div>
                            <div className="postCreatedDate">
                                {post.created_date}
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
                                    onClick={() => setShowDeleteModal(true)}
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
                                <div className="createAssign_formGroup form-floating mb-4">
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
                                    <label className="createAssign_formLabel createAssign_editorLabel">
                                        Announce something to your class
                                    </label>
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
                                    {currentFiles.map((file, index) => (
                                        <div className="col-6" key={index}>
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
                <div className="card-footer px-3 py-2 bg-white">
                    {comments.length > 0 && (
                        <div>
                            <div className="d-flex align-items-center comment_label mb-3">
                                <MemberSolidIcon size="24px" className="me-2" />
                                <span>{comments.length} class comment</span>
                            </div>
                            {comments.map((comment, index) => (
                                <Comment
                                    key={comment.id}
                                    index={index}
                                    comments={comments}
                                    setComments={setComments}
                                    comment={comment}
                                    userInfo={userInfo}
                                />
                            ))}
                        </div>
                    )}
                    {/* add comment */}
                    <div className="d-flex">
                        <img
                            src={userInfo?.avatar || defaultAvatar}
                            className="comment_img me-3"
                        />
                        <div className="commentEditor flex-fill">
                            <CardEditor
                                data={addComment}
                                onChange={(event, editor) => {
                                    setAddComment(editor.getData())
                                }}
                            />
                        </div>
                        <button
                            className="comment_btn ms-1"
                            onClick={handleAddComment}
                            disabled={!addComment}
                        >
                            {loadingComment ? (
                                <div
                                    className="spinner-border spinner-border-sm text-secondary"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        LoadingUpload...
                                    </span>
                                </div>
                            ) : (
                                <SendIcon size="20px" strokeWidth="1.8" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {/* Delete post modal */}
            <Modal
                className="classUnenrollModal"
                show={showDeleteModal}
                onHide={() => {
                    setShowDeleteModal(false)
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Announcement?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    Comments will also be deleted
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                            setShowDeleteModal(false)
                        }}
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
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Post
