import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import AssignmentService from '../../../services/AssignmentService'
import ClassService from '../../../services/ClassService'

import DeleteAssignment from './DeleteAssignment'

import { AddIcon } from '../../../components/icons'
import './assignment.css'

function AssignmentList() {
    const { id } = useParams()

    const [assignments, setAssignments] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const tempClass = (await ClassService.getClassroomById(id)).data
            const tempAssignments = (
                await AssignmentService.getFilterList(
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    `=${tempClass.id}`,
                    '',
                    '=10'
                )
            ).data.list
            setAssignments(tempAssignments)
        }
        if (id) {
            fetchData()
        }
    }, [id])

    function getDate(date) {
        const index = date.lastIndexOf(':00.')
        return date.replace('T', ' ').substring(0, index)
    }

    return (
        <div>
            <div
                className="header"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '2.5rem',
                }}
            >
                <Link to="../create-assignment" className="createAssign_btn">
                    <AddIcon
                        className="createAssignIcon_btn"
                        size="1.125rem"
                        strokeWidth="2.25"
                    />
                    Create
                </Link>
            </div>
            <div
                className="accordion mt-4 accordionAssignments"
                id="accordionAssignments"
            >
                {assignments.map((assign) => (
                    <div className="accordion-item">
                        <button
                            className="accordion-button collapsed d-flex justify-content-between align-items-center"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#assign${assign?.id}`}
                            aria-expanded="false"
                            aria-controls={`assign${assign?.id}`}
                        >
                            <div>{assign.title}</div>
                            <div>
                                {assign._draft
                                    ? 'Draft'
                                    : assign?.due_date
                                    ? `Due ${getDate(assign?.due_date)}`
                                    : `Posted ${getDate(assign?.created_date)}`}
                            </div>
                        </button>
                        <div
                            id={`assign${assign?.id}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionAssignments"
                        >
                            <div className="accordion-body">
                                <p>
                                    {assign?.due_date
                                        ? `Posted ${getDate(
                                              assign?.created_date
                                          )}`
                                        : 'No due date'}
                                </p>
                                <div className="mt-2 d-flex justify-content-between">
                                    <button className="viewAssign_btn">
                                        View details
                                    </button>
                                    <div className="d-flex">
                                        <div className="asignInfo_block">
                                            <div className="assignInfo_number">
                                                0
                                            </div>
                                            <div className="assignInfo_title">
                                                Turned in
                                            </div>
                                        </div>
                                        <div className="asignInfo_block">
                                            <div className="assignInfo_number">
                                                1
                                            </div>
                                            <div className="assignInfo_title">
                                                Assigned
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 d-flex justify-content-between">
                                    <Link
                                        to="../edit-assignment"
                                        className="editAssign_btn"
                                    >
                                        Edit assignment
                                    </Link>
                                    <button className="deleteAssign_btn">
                                        Delete assignment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <DeleteAssignment />
        </div>
    )
}

export default AssignmentList
