import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import SubmissionService from '../../../services/SubmissionService'
import { deleteFileByUrl, uploadFile } from '../../../features/fileManagement'
import AttachmentService from '../../../services/AttachmentService'

import { AddIcon, CloseIcon, ProfileIcon } from '../../../components/icons'

const LearnerSubmission = ({ assignment }) => {
    const { userInfo } = useSelector((state) => state.user)

    const [submission, setSubmission] = useState({})
    const [attachments, setAttachments] = useState([])
    const [loadingUploadFile, setLoadingUploadFile] = useState(false)

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
                    const tempAttachments = (
                        await AttachmentService.getAttachmentsBySubmissionId(
                            tempSubmission.id
                        )
                    ).data
                    setAttachments(tempAttachments)
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
        try {
            const tempSubmission = (
                await SubmissionService.updateSubmission(submission.id, {
                    ...submission,
                    _done: submission?.done ? false : true,
                })
            ).data
            setSubmission(tempSubmission)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    return (
        <div className="row">
            <div className="col-4">
                <div className="card submission_card mt-4">
                    <div className="card-body py-3 px-4">
                        <div className="submission_heading mb-3">Your work</div>
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
                        {/* upload file */}
                        <input
                            type="file"
                            id="uploadSubmissionFile"
                            className="d-none"
                            onChange={handleUploadFile}
                        />
                        <button
                            disabled={loadingUploadFile}
                            className="w-100 submission_btn d-flex align-items-center justify-content-center mt-3"
                        >
                            <label
                                htmlFor="uploadSubmissionFile"
                                className="w-100"
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
                            Mark as done
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-8">
                <div className="card submission_card mt-4">
                    <div className="card-body py-3 px-4">
                        <div className="submission_subHeading d-flex align-items-center">
                            <ProfileIcon size="24px" className="me-2" />
                            <span>Private comment</span>
                        </div>
                        <button className="submission_CommentBtn d-flex align-items-center justify-content-center mt-3">
                            Add comment to {assignment?.user?.username}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LearnerSubmission
