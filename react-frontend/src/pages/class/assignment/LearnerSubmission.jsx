import { useState } from 'react'

import { AddIcon, ProfileIcon } from '../../../components/icons'

const LearnerSubmission = ({assignment}) => {
    const [attachments, setAttachments] = useState([])
    const [loadingUploadFile, setLoadingUploadFile] = useState(false)

    const handleUploadFile = async (event) => {
        setLoadingUploadFile(true)
        const file = event.target.files[0]
        if (file) {
            setAttachments([
                ...attachments,
                { file_name: file.name, file_type: file.type, file: file },
            ])
        }
        setLoadingUploadFile(false)
    }

    return (
        <div className="row">
            <div className="col-4">
                <div className="card submission_card mt-4">
                    <div className="card-body py-3 px-4">
                        <div className="submission_heading">Your work</div>
                        <input
                            type="file"
                            id="uploadSubmissionFile"
                            className="postUpload"
                            onChange={handleUploadFile}
                        />
                        <button
                            disabled={loadingUploadFile}
                            className="w-100 submission_btn d-flex align-items-center justify-content-center mt-3"
                        >
                            <label htmlFor="uploadSubmissionFile" className="">
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
                        <button className="submission_doneBtn w-100 mt-2">
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
