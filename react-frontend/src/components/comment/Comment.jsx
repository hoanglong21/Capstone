import { useState, useEffect } from 'react'

import CommentService from '../../services/CommentService'

import CardEditor from '../textEditor/CardEditor'

import defaultAvatar from '../../assets/images/default_avatar.png'
import { OptionVerIcon } from '../icons'
import './comment.css'

const Comment = ({ index, comments, setComments, comment, userInfo }) => {
    const [isEdit, setIsEdit] = useState(false)

    const [updateComment, setUpdateComment] = useState('')
    const [loadingComment, setLoadingComment] = useState(false)

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
            // create comment
            var tempComment = { ...updateComment }
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
            document
                .getElementById(`closeDeleteCommentModal${comment.id}`)
                .click()
            await CommentService.deleteComment(comment.id)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }
    return (
        <div>
            {isEdit ? (
                <div className="d-flex mb-3">
                    <img
                        className="comment_img me-3"
                        src={comment?.user?.avatar || defaultAvatar}
                    />
                    <div className="w-100">
                        <div className="d-flex align-items-center mb-2">
                            <div className="comment_author me-2">
                                {comment.user.username}
                            </div>
                            <div className="comment_createdDate">
                                {comment.created_date}
                            </div>
                        </div>
                        <div className="postCommentEditor mb-2">
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
                                .querySelector(`#comment${comment.id} > button`)
                                ?.click()
                        }
                    }}
                >
                    <div className="d-flex align-items-center mb-3">
                        <img
                            className="comment_img"
                            src={comment?.user?.avatar || defaultAvatar}
                        />
                        <div className="ms-3">
                            <div className="d-flex align-items-center">
                                <div className="comment_author me-2">
                                    {comment.user.username}
                                </div>
                                <div className="comment_createdDate">
                                    {comment.created_date}
                                </div>
                            </div>
                            <div
                                className="comment_content"
                                dangerouslySetInnerHTML={{
                                    __html: comment?.content,
                                }}
                            ></div>
                        </div>
                    </div>
                    {userInfo?.id === comment?.user?.id && (
                        <div id={`comment${comment.id}`} className="d-none">
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
                                        data-bs-toggle="modal"
                                        data-bs-target={`#deleteCommentModal${comment?.id}`}
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
            )}
            {/* Delete post modal */}
            <div className="modal fade" id={`deleteCommentModal${comment.id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete comment?</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                id={`closeDeleteCommentModal${comment.id}`}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this comment?
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
                                onClick={handleDeleteComment}
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
export default Comment
