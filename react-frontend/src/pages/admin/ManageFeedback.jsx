import React from 'react'
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { useNavigate } from "react-router-dom";

function ManageFeedback() {
    const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm">
          <HeaderAdmin />
          <div className="container">
            <h3 className="mt-3 mb-4 text-bold text-black">Management Feedback</h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead style={{ backgroundColor: "#000" }}>
                  <tr>
                    <th scope="col">Feedback ID</th>
                    <th scope="col">Create Date</th>
                    <th scope="col">Feedback Type</th>
                    <th scope="col">Creator By</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>
                      6/7/2023
                    </td>
                    <td>Suggestions</td>
                    <td>Duong</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary me-3"
                        onClick={() => {
                          navigate("viewdetailfb");
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageFeedback