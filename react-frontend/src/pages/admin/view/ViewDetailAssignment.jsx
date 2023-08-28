import React, { useState, useEffect } from 'react'
import SidebarforAdmin from '../SidebarforAdmin'
import HeaderAdmin from '../HeaderAdmin'
import { Link, useParams } from 'react-router-dom'
import AssignmentService from '../../../services/AssignmentService'
import '../../../assets/styles/admin.css'

function ViewDetailAssignment() {
    const [assignments, setAssignments] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const tempStudySet = (await AssignmentService.getAssignmentById(id))
                .data
            setAssignments(tempStudySet)
        }
        if (id) {
            fetchData()
        }
    }, [id])

    return (
        <div className="container-fluid">
            <div className="row">
                <SidebarforAdmin />
                <div className="col-10">
                    <HeaderAdmin />
                    <div className="card mb-4">
                        <div className="card-header fs-5 fw-bold text-uppercase">
                            Assignment Details
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label className="small mb-1 fs-6">
                                        Assignment Title{' '}
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        readOnly
                                        value={assignments?.title}
                                    />
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-3">
                                        <label className="small mb-1 fs-6">
                                            Assignment ID
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            readOnly
                                            value={assignments?.id}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="small mb-1 fs-6">
                                            Draft ?
                                        </label>
                                        <select
                                            className="form-control"
                                            readOnly
                                            value={assignments?._draft}
                                        >
                                            <option value={true} hidden>
                                                Draft
                                            </option>
                                            <option value={false} hidden>
                                                Not draft
                                            </option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="small mb-1 fs-6">
                                            Creator By
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            readOnly
                                            value={assignments?.user?.username}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="small mb-1 fs-6">
                                            Class Name
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            readOnly
                                            value={
                                                assignments?.classroom
                                                    ?.class_name
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-3">
                                        <label className="small mb-1 fs-6">
                                            Create Date
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            readOnly
                                            value={assignments?.created_date}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="small mb-1 fs-6">
                                            Start Date
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            readOnly
                                            value={assignments?.start_date}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="small mb-1 fs-6">
                                            Due Date
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            readOnly
                                            value={assignments?.due_date}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="small mb-1 fs-6">
                                            Modified Date
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            readOnly
                                            value={assignments?.modified_date}
                                        />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-12">
                                        <label className="small mb-1 fs-6">
                                            Instruction
                                        </label>
                                        <div
                                            className="form-control viewEditor"
                                            dangerouslySetInnerHTML={{
                                                __html: assignments?.instruction,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <Link
                                        className="btn btn-secondary me-4"
                                        to="/manageassignment"
                                    >
                                        Close
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewDetailAssignment
