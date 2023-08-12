import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AssignmentService from '../../../services/AssignmentService'
import AttachmentService from '../../../services/AttachmentService'
import { deleteFolder } from '../../../features/fileManagement'
import SubmissionService from '../../../services/SubmissionService'
import CommentService from '../../../services/CommentService'

import Comment from '../../../components/comment/Comment'

import {
    MemberSolidIcon,
    OptionHorIcon,
    SendIcon,
} from '../../../components/icons'
import defaultAvatar from '../../../assets/images/default_avatar.png'
import CardEditor from '../../../components/textEditor/CardEditor'

const Instructions = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    const { assign_id } = useParams()

    const { userInfo } = useSelector((state) => state.user)

    const [assignment, setAssignment] = useState({})
    const [submission, setSubmission] = useState({})
    const [attachments, setAttachments] = useState([])
    const [loading, setLoading] = useState(false)

    const [comments, setComments] = useState([])
    const [addComment, setAddComment] = useState('')
    const [loadingComment, setLoadingComment] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // assignment
                const tempAssignment = (
                    await AssignmentService.getAssignmentById(assign_id)
                ).data
                setAssignment(tempAssignment)
                // tutor attachments
                const tempAttachments = (
                    await AttachmentService.getAttachmentsByAssignmentId(
                        assign_id
                    )
                ).data
                setAttachments(tempAttachments)
                // learner submission
                if (userInfo.id !== tempAssignment.user.id) {
                    const tempSubmission = (
                        await SubmissionService.getSubmissionByAuthorIdandAssignmentId(
                            userInfo.id,
                            tempAssignment.id
                        )
                    ).data
                    setSubmission(tempSubmission)
                }
                // comments
                const tempComments = (
                    await CommentService.getAllCommentByAssignmentId(assign_id)
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
        if (assign_id && userInfo?.id) {
            fetchData()
        }
    }, [assign_id, userInfo])

    const handleDelete = async (e) => {
        e.preventDefault()
        // clear validation
        setLoading(true)
        try {
            await AssignmentService.deleteAssignment(assign_id)
            await deleteFolder(
                `files/${assignment.classroom.user.username}/class/${id}/assignment/${assign_id}`
            )
            document
                .getElementById(`closeDeleteAssignmentDetailModal${assign_id}`)
                .click()
            navigate(`/class/${id}/assignments`)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    const handleCopyLink = (event) => {
        navigator.clipboard.writeText(window.location.href)
    }

    const handleAddComment = async () => {
        setLoadingComment(true)
        try {
            // create comment
            var tempComment = {
                user: {
                    id: userInfo.id,
                    username: userInfo.username,
                    avatar: userInfo.avatar,
                },
                content: addComment,
                commentType: {
                    id: 1,
                },
                assignment: {
                    id: assignment.id,
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
        <div className="instruction_container">
            <div className="instruction_main mb-3">
                <div className="d-flex align-items-center justify-content-between mb-1">
                    <div className="instruction_heading">
                        {assignment?.title}{' '}
                        {assignment?._draft ? '(Draft)' : ''}
                    </div>
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
                            {userInfo?.id ===
                                assignment?.classroom?.user?.id && (
                                <div>
                                    <li>
                                        <Link
                                            className="dropdown-item py-1 px-3 d-flex align-items-center"
                                            type="button"
                                            to={`../../../edit-assignment/${assign_id}`}
                                            relative="path"
                                        >
                                            Edit
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item py-1 px-3 d-flex align-items-center"
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#deleteAssignmentDetailModal${assign_id}`}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                </div>
                            )}
                            <li>
                                <button
                                    className="dropdown-item py-1 px-3 d-flex align-items-center"
                                    type="button"
                                    onClick={handleCopyLink}
                                >
                                    Copy link
                                </button>
                            </li>
                            {userInfo?.id !==
                                assignment?.classroom?.user?.id && (
                                <div>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item py-1 px-3 d-flex align-items-center"
                                            type="button"
                                        >
                                            Report
                                        </button>
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="d-flex mb-2 instruction_info">
                    <div>{assignment?.user?.username}</div>
                    <div className="mx-1">·</div>
                    <div>
                        {assignment?.created_date}{' '}
                        {assignment?.modified_date
                            ? `(Edited ${assignment?.modified_date})`
                            : ''}
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-3 instruction_date">
                    {userInfo?.id !== assignment?.user?.id ? (
                        <div>
                            {submission?.mark
                                ? `${submission?.mark}/100`
                                : 'No grade'}
                        </div>
                    ) : (
                        <div>
                            {assignment?.start_date
                                ? `Start ${assignment?.start_date}`
                                : 'No start date'}
                        </div>
                    )}

                    <div>
                        {assignment?.due_date
                            ? `Due ${assignment?.due_date}`
                            : 'No due date'}
                    </div>
                </div>
            </div>
            {/* attchments */}
            {attachments?.length > 0 && (
                <div className="row mb-3">
                    {attachments.map((file, index) => (
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
                    <div className="col-12">
                        <div className="instructionAttachments mt-2"></div>
                    </div>
                </div>
            )}
            <div className="d-flex align-items-center comment_label mb-3">
                <MemberSolidIcon size="24px" className="me-2" />
                <span>
                    {comments.length === 0
                        ? 'Class comments'
                        : `${comments.length} class comment`}
                </span>
            </div>
            {comments?.map((comment, index) => (
                <Comment
                    key={comment.id}
                    index={index}
                    comments={comments}
                    setComments={setComments}
                    comment={comment}
                    userInfo={userInfo}
                />
            ))}
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
            {/* delete modal */}
            <div
                className="modal fade assignDeleteModal"
                tabIndex="-1"
                id={`deleteAssignmentDetailModal${assign_id}`}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete assignment?</h5>
                            <button
                                id={`closeDeleteAssignmentDetailModal${assign_id}`}
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>Grades and comments will also be deleted</p>
                            <div className="text-end mt-4">
                                <button
                                    type="button"
                                    className="btn btn-secondary me-3"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div
                                            className="spinner-border text-secondary mx-auto mb-1"
                                            role="status"
                                            id="loading"
                                        >
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    ) : (
                                        'Delete'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Instructions
