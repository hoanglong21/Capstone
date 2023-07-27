import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import AssignmentService from '../../../services/AssignmentService'
import { DeleteIcon, EditIcon, OptionHorIcon } from '../../../components/icons'

const Instructions = () => {
    const { assign_id } = useParams()

    const [assignment, setAssignment] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const tempAssignment = (
                await AssignmentService.getAssignmentById(assign_id)
            ).data
            setAssignment(tempAssignment)
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
                                <button
                                    className="dropdown-item py-1 px-3 d-flex align-items-center"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#updateClassModal"
                                >
                                    Edit
                                </button>
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
                <div className="d-flex mb-2">
                    <div>{assignment?.user?.username}</div>
                    <div>·</div>
                    <div>
                        {assignment?.created_date}{' '}
                        {assignment?.modified_date
                            ? `(Edited ${assignment?.modified_date})`
                            : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Instructions
