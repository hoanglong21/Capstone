import React from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { useNavigate } from "react-router-dom";
import BanClass from "./BanClass";
import UnbanClass from "./UnbanClass";

function ManageClass() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm">
          <HeaderAdmin />
          <div className="container">
            <h3 className="mt-3 mb-4 text-bold text-black">Management Class</h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead style={{ backgroundColor: "#000" }}>
                  <tr>
                    <th scope="col">Class ID</th>
                    <th scope="col">ClassName</th>
                    <th scope="col">Tutor</th>
                    <th scope="col">Create Date</th>
                    <th scope="col">Active</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>
                      <p className="text-info mb-0">N2</p>
                    </td>
                    <td>Nguyen Van A</td>
                    <td>06/07/2023</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary me-3"
                        onClick={() => {
                          navigate("viewdetails");
                        }}
                      >
                        <i class="bi bi-info-square me-2"></i>
                        View Details
                      </button>
                      <button
                        type="button"
                        className="btn btn-success me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#unbanClassModal"
                      >
                        <i class="bi bi-person-fill-check me-2"></i>
                        Unban
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger "
                        data-bs-toggle="modal"
                        data-bs-target="#banClassModal"
                      >
                        <i class="bi bi-person-fill-slash me-2"></i>
                        Ban
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <BanClass/>
            <UnbanClass/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageClass;
