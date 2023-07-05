import React from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import { useNavigate } from "react-router-dom";

function ManageUser() {
  const navigate = useNavigate();

  return (
    <>
    <div className="container">
      <h3 className="mt-5 mb-4 text-bold text-black">Management Users</h3>
      <div className="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Username - Role</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Active</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td><p className="text-info mb-0">Duong</p>Learner</td>
              <td>abc@gmail.com</td>
              <td>0123456789</td>
              <td>
              <button type="button" className="btn btn-primary me-3" onClick={() => {
                    navigate("viewdetailuser");
                  }}>View Details</button>
              <button type="button" className="btn btn-success me-3">Unban</button>
              <button type="button" className="btn btn-danger " onClick={() => {
                    navigate("banuser");
                  }}>Ban</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}
export default ManageUser;
