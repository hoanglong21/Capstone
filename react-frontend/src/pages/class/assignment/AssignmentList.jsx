import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import AssignmentService from '../../../services/AssignmentService'
import ClassService from '../../../services/ClassService'

import DeleteAssignment from './DeleteAssignment'

import { AddIcon } from '../../../components/icons'
import empty from '../../../assets/images/assign_empty.jpg'
import './assignment.css'

function AssignmentList() {
    const navigate = useNavigate()

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
            <div>
                <button
                    className="createAssign_btn"
                    onClick={() => {
                        navigate('../create-assignment')
                    }}
                >
                    <AddIcon
                        className="createAssignIcon_btn"
                        size="1.125rem"
                        strokeWidth="2.25"
                    />
                    Create
                </button>
            </div>
            {assignments.length === 0 && (
                <div className="emptyAssignments_container d-flex flex-column align-items-center justify-content-center">
                    <img src={empty} alt="" />
                    <p className="mb-2 emptyAssignments_heading">
                        This is where you’ll assign work
                    </p>
                    <p className="emptyAssignments_content">
                        You can add assignments for the class, then organize it
                        into topics
                    </p>
                </div>
            )}
            <div className="accordion mt-4 accordionTests" id="accordionTests">
                {assignments.map((assign, index) => (
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
                            data-bs-parent="#accordionTests"
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
                                    <button
                                        className="editAssign_btn"
                                        onClick={() => {
                                            navigate(
                                                `../edit-assignment/${assign?.id}`
                                            )
                                        }}
                                    >
                                        Edit assignment
                                    </button>
                                    <button
                                        className="deleteAssign_btn"
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#deleteAssignmentModal${assign?.id}`}
                                    >
                                        Delete assignment
                                    </button>
                                </div>
                            </div>
                            <DeleteAssignment
                                index={index}
                                assign={assign}
                                assignments={assignments}
                                stateChanger={setAssignments}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AssignmentList
