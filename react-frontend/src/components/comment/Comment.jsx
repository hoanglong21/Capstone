import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import CommentService from '../../services/CommentService'

import CardEditor from '../textEditor/CardEditor'

import defaultAvatar from '../../assets/images/default_avatar.png'
import banned from '../../assets/images/banned.png'
import verified from '../../assets/images/verified.png'
import deleted from '../../assets/images/deleted.png'
import { OptionVerIcon, SendIcon } from '../icons'
import './comment.css'

const Comment = ({ index, comments, setComments, comment, userInfo }) => {
    const [isEdit, setIsEdit] = useState(false)

    const [updateComment, setUpdateComment] = useState('')
    const [loadingComment, setLoadingComment] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [addComment, setAddComment] = useState('')
    const [isAdd, setIsAdd] = useState(false)

    function toBEDate(date) {
        if (date && !date.includes('+07:00')) {
            return date?.replace(/\s/g, 'T') + '.000' + '+07:00'
        }
        return ''
    }

    useEffect(() => {
        if (comment?.id) {
            setUpdateComment({ ...comment })
        }
    }, [comment])

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

    const handleUpdateComment = async () => {
        setLoadingComment(true)
        try {
            // remove line break
            var text = new String(updateComment.content)
            while (true) {
                const lastIndex = text.lastIndexOf('<p>&nbsp;</p>')
                if (text.length - 13 !== lastIndex) {
                    break
                }
                text = new String(text.slice(0, lastIndex))
            }
            // create comment
            var tempComment = { ...updateComment, content: text }
            comment.created_date = toBEDate(comment.created_date)
            if (tempComment?.user) {
                comment.user.created_date = toBEDate(comment.user.created_date)
            }
            if (tempComment?.post) {
                tempComment.post.created_date = toBEDate(
                    tempComment.post.created_date
                )
                tempComment.post.modified_date = toBEDate(
                    tempComment.post.modified_date
                )
                if (tempComment.post?.user) {
                    tempComment.post.user.created_date = toBEDate(
                        tempComment.post.user.created_date
                    )
                }
                if (tempComment.post?.classroom) {
                    tempComment.post.classroom.created_date = toBEDate(
                        tempComment.post.classroom.created_date
                    )
                    tempComment.post.classroom.deleted_date = toBEDate(
                        tempComment.post.classroom.deleted_date
                    )
                    if (tempComment.post.classroom?.user) {
                        tempComment.post.classroom.user.created_date = toBEDate(
                            tempComment.post.classroom.user.created_date
                        )
                    }
                }
            }
            if (tempComment?.studySet) {
                tempComment.studySet.created_date = toBEDate(
                    tempComment.studySet.created_date
                )
                tempComment.studySet.deleted_date = toBEDate(
                    tempComment.studySet.deleted_date
                )
                if (tempComment.studySet?.user) {
                    tempComment.studySet.user.created_date = toBEDate(
                        tempComment.studySet.user.created_date
                    )
                }
            }
            if (tempComment?.test) {
                tempComment.test.created_date = toBEDate(
                    tempComment.test.created_date
                )
                tempComment.test.modified_date = toBEDate(
                    tempComment.test.modified_date
                )
                tempComment.test.start_date = toBEDate(
                    tempComment.test.start_date
                )
                tempComment.test.due_date = toBEDate(tempComment.test.due_date)
                if (tempComment.test?.user) {
                    tempComment.test.user.created_date = toBEDate(
                        tempComment.test.user.created_date
                    )
                }
                if (tempComment.test?.classroom) {
                    tempComment.test.classroom.created_date = toBEDate(
                        tempComment.test.classroom.created_date
                    )
                    tempComment.test.classroom.deleted_date = toBEDate(
                        tempComment.test.classroom.deleted_date
                    )
                    if (tempComment.test.classroom?.user) {
                        tempComment.test.classroom.user.created_date = toBEDate(
                            tempComment.test.classroom.user.created_date
                        )
                    }
                }
            }
            if (tempComment?.assignment) {
                tempComment.assignment.created_date = toBEDate(
                    tempComment.assignment.created_date
                )
                tempComment.assignment.modified_date = toBEDate(
                    tempComment.assignment.modified_date
                )
                tempComment.assignment.start_date = toBEDate(
                    tempComment.assignment.start_date
                )
                tempComment.assignment.due_date = toBEDate(
                    tempComment.assignment.due_date
                )
                if (tempComment.assignment?.user) {
                    tempComment.assignment.user.created_date = toBEDate(
                        tempComment.assignment.user.created_date
                    )
                }
                if (tempComment.assignment?.classroom) {
                    tempComment.assignment.classroom.created_date = toBEDate(
                        tempComment.assignment.classroom.created_date
                    )
                    tempComment.assignment.classroom.deleted_date = toBEDate(
                        tempComment.assignment.classroom.deleted_date
                    )
                    if (tempComment.assignment.classroom?.user) {
                        tempComment.assignment.classroom.user.created_date =
                            toBEDate(
                                tempComment.assignment.classroom.user
                                    .created_date
                            )
                    }
                }
            }
            if (tempComment?.submission) {
                tempComment.submission.created_date = toBEDate(
                    tempComment.submission.created_date
                )
                tempComment.submission.modified_date = toBEDate(
                    tempComment.submission.modified_date
                )
                if (tempComment.submission?.user) {
                    tempComment.submission.user.created_date = toBEDate(
                        tempComment.submission.user.created_date
                    )
                }
                if (tempComment.submission?.assignment) {
                    tempComment.submission.assignment.created_date = toBEDate(
                        tempComment.submission.assignment.created_date
                    )
                    tempComment.submission.assignment.modified_date = toBEDate(
                        tempComment.submission.assignment.modified_date
                    )
                    tempComment.submission.assignment.start_date = toBEDate(
                        tempComment.submission.assignment.start_date
                    )
                    tempComment.submission.assignment.due_date = toBEDate(
                        tempComment.submission.assignment.due_date
                    )
                    if (tempComment.submission.assignment?.user) {
                        tempComment.submission.assignment.user.created_date =
                            toBEDate(
                                tempComment.submission.assignment.user
                                    .created_date
                            )
                    }
                    if (tempComment.submission.assignment?.classroom) {
                        tempComment.submission.assignment.classroom.created_date =
                            toBEDate(
                                tempComment.submission.assignment.classroom
                                    .created_date
                            )
                        tempComment.submission.assignment.classroom.deleted_date =
                            toBEDate(
                                tempComment.submission.assignment.classroom
                                    .deleted_date
                            )
                        if (tempComment.submission.assignment.classroom?.user) {
                            tempComment.submission.assignment.classroom.user.created_date =
                                toBEDate(
                                    tempComment.submission.assignment.classroom
                                        .user.created_date
                                )
                        }
                    }
                }
            }
            tempComment = (
                await CommentService.updateComment(comment.id, tempComment)
            ).data
            // update list
            var tempComments = [...comments]
            tempComments[index] = tempComment
            setComments([...tempComments])
            setIsEdit(false)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoadingComment(false)
    }

    const handleCancelComment = async () => {
        setUpdateComment({ ...comment })
        setIsEdit(false)
    }

    const handleDeleteComment = async () => {
        try {
            var tempComments = [...comments]
            tempComments.splice(index, 1)
            setComments([...tempComments])
            setShowDeleteModal(false)
            await CommentService.deleteComment(comment.id)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    // const handleAddChildComment = async () => {
    //     setLoadingComment(true)
    //     try {
    //         // remove line break
    //         var text = new String(addComment)
    //         while (true) {
    //             const lastIndex = text.lastIndexOf('<p>&nbsp;</p>')
    //             if (text.length - 13 !== lastIndex) {
    //                 break
    //             }
    //             text = new String(text.slice(0, lastIndex))
    //         }
    //         // create child comment
    //         var tempComment = {
    //             user: {
    //                 id: userInfo.id,
    //                 username: userInfo.username,
    //                 avatar: userInfo.avatar,
    //                 status: userInfo.status,
    //             },
    //             root: { id: comment.id },
    //             content: text,
    //             commentType: {
    //                 id: comment.commentType.id,
    //             },
    //         }
    //         switch (comment.commentType.id) {
    //             case 1:
    //                 // post
    //                 tempComment = {
    //                     ...tempComment,
    //                     post: { id: comment.post.id },
    //                 }
    //                 break
    //             case 2:
    //                 // study set
    //                 tempComment = {
    //                     ...tempComment,
    //                     studySet: { id: comment.studySet.id },
    //                 }
    //                 break
    //             case 3:
    //                 // test
    //                 tempComment = {
    //                     ...tempComment,
    //                     test: { id: comment.test.id },
    //                 }
    //                 break
    //             case 4:
    //                 // assignment
    //                 tempComment = {
    //                     ...tempComment,
    //                     assignment: { id: comment.assignment.id },
    //                 }
    //                 break
    //             case 5:
    //                 // submission
    //                 tempComment = {
    //                     ...tempComment,
    //                     submission: { id: comment.submission.id },
    //                 }
    //                 break

    //             default:
    //                 break
    //         }
    //         tempComment = (await CommentService.createComment(tempComment)).data
    //         // add to list
    //         var tempComments = [...comments]
    //         tempComments[index].childComments.push({ ...tempComment })
    //         setComments([tempComments])
    //         // clear
    //         setAddComment('')
    //         setIsAdd(false)
    //     } catch (error) {
    //         if (error.response && error.response.data) {
    //             console.log(error.response.data)
    //         } else {
    //             console.log(error.message)
    //         }
    //     }
    //     setLoadingComment(false)
    // }

    return (
        <div>
            {isEdit ? (
                <div className="d-flex mb-3">
                    <img
                        className="comment_img me-3"
                        src={comment?.user?.avatar || defaultAvatar}
                    />
                    <div className="w-100">
                        <div className="d-flex align-items-center">
                            <div className="comment_author">
                                {comment.user.username}
                            </div>
                            {comment?.user?.status === 'banned' && (
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
                            {comment?.user?.status === 'active' && (
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
                            {comment?.user?.status === 'deleted' && (
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
                        <div className="comment_createdDate mb-2">
                            {comment.created_date}
                        </div>
                        <div className="commentEditor mb-2">
                            <CardEditor
                                data={updateComment?.content}
                                onChange={(event, editor) => {
                                    if (comment?.id) {
                                        setUpdateComment({
                                            ...updateComment,
                                            content: editor.getData(),
                                        })
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <button
                                className="btn btn-outline-secondary btn-sm me-2"
                                onClick={handleCancelComment}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={handleUpdateComment}
                                disabled={loadingComment}
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
                                    'Save'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div
                        className="d-flex justify-content-between"
                        onMouseEnter={() => {
                            document
                                .getElementById(`comment${comment.id}`)
                                ?.classList.remove('d-none')
                        }}
                        onMouseLeave={() => {
                            document
                                .getElementById(`comment${comment.id}`)
                                ?.classList.add('d-none')
                            if (
                                document
                                    .querySelector(
                                        `#comment${comment.id} .dropdown-menu`
                                    )
                                    ?.classList.contains('show')
                            ) {
                                document
                                    .querySelector(
                                        `#comment${comment.id} > button`
                                    )
                                    ?.click()
                            }
                        }}
                    >
                        <div className="d-flex mb-2">
                            <img
                                className="comment_img"
                                src={comment?.user?.avatar || defaultAvatar}
                            />
                            <div className="ms-3">
                                <div className="d-flex align-items-center">
                                    <Link
                                        to={`/${comment.user.username}/sets`}
                                        className="comment_author"
                                    >
                                        {comment.user.username}
                                    </Link>
                                    {comment?.user?.status === 'banned' && (
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
                                    {comment?.user?.status === 'active' && (
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
                                    {comment?.user?.status === 'deleted' && (
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
                                <div className="comment_createdDate">
                                    {comment.created_date}
                                </div>
                                <div
                                    className="comment_content"
                                    dangerouslySetInnerHTML={{
                                        __html: comment?.content,
                                    }}
                                ></div>
                            </div>
                        </div>
                        {userInfo?.id === comment?.user?.id &&
                            !comment?.classroom?._deleted && (
                                <div
                                    id={`comment${comment.id}`}
                                    className="d-none"
                                >
                                    <button
                                        className="btn btn-light p-2 rounded-circle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <OptionVerIcon />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button
                                                className="dropdown-item d-flex align-items-center"
                                                type="button"
                                                onClick={() => {
                                                    setIsAdd(true)
                                                }}
                                            >
                                                <span className="align-middle">
                                                    Reply
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item d-flex align-items-center"
                                                type="button"
                                                onClick={() => {
                                                    setIsEdit(true)
                                                }}
                                            >
                                                <span className="align-middle">
                                                    Edit
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item d-flex align-items-center"
                                                type="button"
                                                onClick={() => {
                                                    setShowDeleteModal(true)
                                                }}
                                            >
                                                <span className="align-middle">
                                                    Delete
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                    </div>
                    {/* {comment?.childComments?.length > 0 && (
                        <div className="ms-3">
                            {comment?.childComments?.map(
                                (child, childIndex) => (
                                    <Comment
                                        key={child.id}
                                        index={childIndex}
                                        comments={child.childComments}
                                        setComments={setComments}
                                        comment={child}
                                        userInfo={userInfo}
                                    />
                                )
                            )}
                            {/* add comment */}
                    {/* {isAdd && (
                                <div className="mb-3">
                                    <div className="d-flex mb-1">
                                        <img
                                            src={
                                                userInfo?.avatar ||
                                                defaultAvatar
                                            }
                                            className="comment_img me-3"
                                        />
                                        <div className="commentEditor flex-fill">
                                            <CardEditor
                                                data={addComment}
                                                onChange={(event, editor) => {
                                                    setAddComment(
                                                        editor.getData()
                                                    )
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <button
                                                className="comment_btn ms-1"
                                                onClick={handleAddChildComment}
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
                                                    <SendIcon
                                                        size="20px"
                                                        strokeWidth="1.8"
                                                    />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-secondary btn-sm p-1 px-2 float-end"
                                        onClick={() => {
                                            setIsAdd(false)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    )} */}
                </div>
            )}
            {/* Delete comment modal */}
            <Modal
                id={`deleteCommentModal${comment.id}`}
                show={showDeleteModal}
                onHide={() => {
                    setShowDeleteModal(false)
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete comment?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this comment?
                </Modal.Body>
                <Modal.Footer>
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
                        onClick={handleDeleteComment}
                    >
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Comment
