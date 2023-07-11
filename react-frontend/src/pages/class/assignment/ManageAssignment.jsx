import React from 'react'
import { Link } from 'react-router-dom'

function ManageAssignment() {
  return (
    <div className="container">
      <div className="header" style={{display: "flex", justifyContent: "space-between", marginTop: "2.5rem"}}>
        <h3>Management Assignment</h3>
        <button type="submit" className="bg-primary text-white border border-primary rounded-3 py-2 px-2 fw-bold fs-7"><i class="bi bi-plus-square me-2"></i>Create Assignment</button>
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
            <th scope="row" style={{ verticalAlign: "middle" }}>
              1
            </th>
            <td style={{ verticalAlign: "middle" }}>Practice 1</td>
            <td style={{ verticalAlign: "middle" }}>
              Do exercise 1 to 5 in the grammar part
            </td>
            <td style={{ verticalAlign: "middle" }}>9/7/2023</td>
            <td style={{ verticalAlign: "middle" }}>11/7/2023</td>
            <td style={{ verticalAlign: "middle" }}>100</td>
            <td>
            <Link to="/viewdetailtest" className="btn btn-primary me-3" >
              <i class="bi bi-info-square me-2"></i>View Details
              </Link>
              <Link
                type="button"
                className="btn btn-success me-3"
              >
                <i class="bi bi-pencil-square me-2"></i>
                Update
              </Link>
              <button
                type="button"
                className="btn btn-danger "
                data-bs-toggle="modal"
                data-bs-target="#deleteTestModal"
              >
                <i class="bi bi-trash-fill me-2"></i>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ManageAssignment