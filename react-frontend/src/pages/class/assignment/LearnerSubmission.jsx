import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import SubmissionService from '../../../services/SubmissionService'
import { deleteFileByUrl, uploadFile } from '../../../features/fileManagement'
import AttachmentService from '../../../services/AttachmentService'
import CommentService from '../../../services/CommentService'

import Comment from '../../../components/comment/Comment'
import './assignment.css'
import {
    AddIcon,
    CloseIcon,
    ProfileSolidIcon,
    SendIcon,
} from '../../../components/icons'
import defaultAvatar from '../../../assets/images/default_avatar.png'
import CardEditor from '../../../components/textEditor/CardEditor'

const LearnerSubmission = ({ assignment }) => {
    const { userInfo } = useSelector((state) => state.user)

    const [submission, setSubmission] = useState({})
    const [attachments, setAttachments] = useState([])
    const [loadingUploadFile, setLoadingUploadFile] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)

    const [comments, setComments] = useState([])
    const [addComment, setAddComment] = useState('')
    const [loadingComment, setLoadingComment] = useState(false)

    function toBEDate(date) {
        if (date && !date.includes('+07:00')) {
            return date?.replace(/\s/g, 'T') + '.000' + '+07:00'
        }
        return ''
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                var tempSubmission = (
                    await SubmissionService.getSubmissionByAuthorIdandAssignmentId(
                        userInfo.id,
                        assignment.id
                    )
                ).data
                if (!tempSubmission?.id) {
                    tempSubmission = (
                        await SubmissionService.createSubmission({
                            user: {
                                id: userInfo.id,
                                username: userInfo.username,
                            },
                            assignment: {
                                id: assignment.id,
                            },
                        })
                    ).data
                } else {
                    // attachments
                    const tempAttachments = (
                        await AttachmentService.getAttachmentsBySubmissionId(
                            tempSubmission.id
                        )
                    ).data
                    setAttachments(tempAttachments)
                    // comments
                    const tempComments = (
                        await CommentService.getAllCommentBySubmisionId(
                            tempSubmission.id
                        )
                    ).data
                    setComments(tempComments)
                }
                setSubmission(tempSubmission)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (assignment?.id && userInfo?.id) {
            fetchData()
        }
    }, [assignment, userInfo])

    const handleUploadFile = async (event) => {
        setLoadingUploadFile(true)
        try {
            const file = event.target.files[0]
            if (file) {
                const url = await uploadFile(
                    file,
                    `${assignment?.user?.username}/class/${assignment?.classroom?.id}/assignment/${assignment?.id}/submission/${submission?.id}`
                )
                const tempAttachment = (
                    await AttachmentService.createAttachment({
                        file_name: file.name,
                        file_type: file.type,
                        file_url: url,
                        attachmentType: {
                            id: 2,
                        },
                        submission: {
                            id: submission.id,
                        },
                    })
                ).data
                setAttachments([...attachments, { ...tempAttachment }])
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoadingUploadFile(false)
    }

    const handleDeleteFile = async (index) => {
        try {
            var temp = [...attachments]
            const tempAttachment = temp[index]
            await deleteFileByUrl(
                tempAttachment.file_url,
                `${assignment?.user?.username}/class/${assignment?.classroom?.id}/assignment/${assignment?.id}/submission/${submission?.id}`
            )
            await AttachmentService.deleteAttachment(tempAttachment.id)
            temp.splice(index, 1)
            setAttachments(temp)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    const handleDone = async () => {
        setLoadingSubmit(true)
        try {
            var tempSubmission = {
                ...submission,
                _done: submission?._done ? false : true,
            }
            tempSubmission.assignment.classroom.created_date = toBEDate(
                tempSubmission.assignment.classroom.created_date
            )
            tempSubmission.assignment.classroom.user.created_date = toBEDate(
                tempSubmission.assignment.classroom.user.created_date
            )
            tempSubmission.assignment.created_date = toBEDate(
                tempSubmission.assignment.created_date
            )
            tempSubmission.assignment.modified_date = toBEDate(
                tempSubmission.assignment.modified_date
            )
            tempSubmission.assignment.start_date = toBEDate(
                tempSubmission.assignment.start_date
            )
            tempSubmission.assignment.user.created_date = toBEDate(
                tempSubmission.assignment.user.created_date
            )
            tempSubmission.created_date = toBEDate(tempSubmission.created_date)
            tempSubmission.modified_date = toBEDate(
                tempSubmission.modified_date
            )
            tempSubmission.user.created_date = toBEDate(
                tempSubmission.user.created_date
            )
            setSubmission(
                (
                    await SubmissionService.updateSubmission(
                        submission.id,
                        tempSubmission
                    )
                ).data
            )
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoadingSubmit(false)
    }

    const handleAddComment = async () => {
        setLoadingComment(true)
        try {
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
                    id: 5,
                },
                submission: {
                    id: submission.id,
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
        <div className="row">
            <div className="submission-col-4">
                <div className="card submission_card mt-4">
                    <div className="card-body py-3 px-4">
                        <div className="submission_heading">Your work</div>
                        {/* attchment */}
                        {attachments.map((file, index) => (
                            <div className="card mb-2" key={index}>
                                <div className="card-body d-flex justify-content-between">
                                    <a
                                        className="text-decoration-none w-100 text-truncate"
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
                                        className="btn p-0 fileUploadDelButton"
                                        onClick={() => handleDeleteFile(index)}
                                    >
                                        <CloseIcon />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {submission?._done ? (
                            <button
                                className="submission_btn w-100 mt-2"
                                disabled={attachments?.length < 1}
                                onClick={handleDone}
                            >
                                {loadingSubmit ? (
                                    <div
                                        className="spinner-border spinner-border-sm text-secondary"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            LoadingUpload...
                                        </span>
                                    </div>
                                ) : (
                                    'Unsubmit'
                                )}
                            </button>
                        ) : (
                            <div>
                                {/* upload file */}
                                <input
                                    type="file"
                                    id="uploadSubmissionFile"
                                    className="d-none"
                                    onChange={handleUploadFile}
                                />
                                <button
                                    disabled={loadingUploadFile}
                                    className="w-100 submission_btn mt-3"
                                >
                                    <label
                                        htmlFor="uploadSubmissionFile"
                                        className="w-100 h-100 d-flex align-items-center justify-content-center"
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
                                            <div>
                                                <AddIcon
                                                    size="18px"
                                                    strokeWidth="2"
                                                    className="me-2"
                                                />
                                                Add
                                            </div>
                                        )}
                                    </label>
                                </button>
                                {/* mark as done */}
                                <button
                                    className="submission_doneBtn w-100 mt-2"
                                    disabled={attachments?.length < 1}
                                    onClick={handleDone}
                                >
                                    {loadingSubmit ? (
                                        <div
                                            className="spinner-border spinner-border-sm text-secondary"
                                            role="status"
                                        >
                                            <span className="visually-hidden">
                                                LoadingUpload...
                                            </span>
                                        </div>
                                    ) : (
                                        'Mark as done'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="submission-col-8">
                <div className="card submission_card mt-4">
                    <div className="card-body py-3 px-4">
                        <div className="d-flex align-items-center comment_label mb-3">
                            <ProfileSolidIcon size="24px" className="me-2" />
                            <span>
                                {comments.length === 0
                                    ? 'Private comments'
                                    : `${comments.length} private comment`}
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
                                alt=""
                            />
                            <div className="commentEditor flex-fill">
                                <CardEditor
                                    data={addComment}
                                    onChange={(event, editor) => {
                                        setAddComment(editor.getData())
                                    }}
                                />
                            </div>
                            <div>
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
                                        <SendIcon
                                            size="20px"
                                            strokeWidth="1.8"
                                        />
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
export default LearnerSubmission
