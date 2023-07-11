import { Link } from 'react-router-dom'

import DeleteAssignment from './DeleteAssignment'

import { AddIcon } from '../../../components/icons'
import './assignment.css'

function AssignmentList() {
    return (
        <div className="container">
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
            <table className="table table-striped mt-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Assignment Title</th>
                        <th scope="col">Assignment Description</th>
                        <th scope="col">Create Date</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" style={{ verticalAlign: 'middle' }}>
                            1
                        </th>
                        <td style={{ verticalAlign: 'middle' }}>Practice 1</td>
                        <td style={{ verticalAlign: 'middle' }}>
                            Do exercise 1 to 5 in the grammar part
                        </td>
                        <td style={{ verticalAlign: 'middle' }}>9/7/2023</td>
                        <td style={{ verticalAlign: 'middle' }}>11/7/2023</td>
                        <td style={{ verticalAlign: 'middle' }}>100</td>
                        <td>
                            <Link
                                to="/updateassignment"
                                className="btn btn-success me-3"
                            >
                                <i class="bi bi-pencil-square me-2"></i>
                                Update
                            </Link>
                            <button
                                type="button"
                                className="btn btn-danger "
                                data-bs-toggle="modal"
                                data-bs-target="#deleteAssignmentModal"
                            >
                                <i class="bi bi-trash-fill me-2"></i>
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <DeleteAssignment />
        </div>
    )
}

export default AssignmentList
