import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import AssignmentService from '../../../services/AssignmentService'
import AttachmentService from '../../../services/AttachmentService'

import { OptionHorIcon } from '../../../components/icons'

const Instructions = () => {
    const navigate = useNavigate()
    const { assign_id } = useParams()

    const [assignment, setAssignment] = useState({})
    const [attachments, setAttachments] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const tempAssignment = (
                await AssignmentService.getAssignmentById(assign_id)
            ).data
            setAssignment(tempAssignment)
            const tempAttachments = (
                await AttachmentService.getAttachmentsByAssignmentId(assign_id)
            ).data
            setAttachments(tempAttachments)
        }
        fetchData()
    }, [])

    return (
        <div className="instruction_container">
            <div className="instruction_main">
                <div className="d-flex align-items-center justify-content-between mb-1">
                    <div className="instruction_heading">
                        {assignment?.title}
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
                                    data-bs-target="#deleteClassModal"
                                >
                                    Delete
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item py-1 px-3 d-flex align-items-center"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteClassModal"
                                >
                                    Copy link
                                </button>
                            </li>
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
                    <div>
                        {assignment?.start_date
                            ? `Start ${assignment?.start_date}`
                            : 'No start date'}
                    </div>
                    <div>
                        {assignment?.due_date
                            ? `Due ${assignment?.due_date}`
                            : 'No due date'}
                    </div>
                </div>
            </div>
            <div className="row">
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
            </div>
        </div>
    )
}
export default Instructions
