import React, {useState, useEffect} from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Link } from "react-router-dom";
import FeedbackService from "../../services/FeedbackService";
import { useSearchParams } from 'react-router-dom'

function ManageFeedback() {
  const [feedback, setFeedback] = useState([])

  return (
    <div className="container-fluid">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm">
          <HeaderAdmin />
          <div className="container">
            <h3 className="mt-3 mb-4 text-bold text-black">
              Management Feedback
            </h3>
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
                    <td>6/7/2023</td>
                    <td>Suggestions</td>
                    <td>Duong</td>
                    <td>
                      <Link
                        to="/managefeedback"
                        className="btn btn-primary me-3"
                      >
                        <i class="bi bi-info-square me-2"></i>
                        View Details
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageFeedback;
