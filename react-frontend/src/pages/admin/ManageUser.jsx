import React from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import { useNavigate } from "react-router-dom";
import BanUser from "./BanUser";
import UnBanUser from "./UnBanUser";
import HeaderAdmin from "./HeaderAdmin";

function ManageUser() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm">
          <HeaderAdmin />
          <div className="container">
            <h3 className="mt-3 mb-4 text-bold text-black">Management Users</h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead style={{ backgroundColor: "#000" }}>
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
                    <td>
                      <p className="text-info mb-0">Duong</p>Learner
                    </td>
                    <td>abc@gmail.com</td>
                    <td>0123456789</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary me-3"
                        onClick={() => {
                          navigate("/manageusers/viewdetails");
                        }}
                      >
                        <i class="bi bi-info-square me-2"></i>
                        View Details
                      </button>
                      <button
                        type="button"
                        className="btn btn-success me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#unbanModal"
                      >
                        <i class="bi bi-person-fill-check me-2"></i>
                        Unban
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger "
                        data-bs-toggle="modal"
                        data-bs-target="#banModal"
                      >
                        <i class="bi bi-person-fill-slash me-2"></i>
                        Ban
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <BanUser />
            <UnBanUser />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ManageUser;
