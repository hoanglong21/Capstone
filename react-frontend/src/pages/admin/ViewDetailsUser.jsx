import React from "react";
import ava from "../../assets/images/avatar-default.jpg";
import { useNavigate } from "react-router-dom";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";

function ViewDetailsUser() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm">
          <HeaderAdmin />
          <div className="card mb-4">
            <div className="card-header fs-5 fw-bold text-uppercase">
              Account Details
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1 fs-6">Profile Picture </label>
                  <img
                    className="img-account-profile rounded-circle"
                    src={ava}
                    alt=""
                    style={{
                      width: "100px",
                      height: "100px",
                      marginLeft: "35%",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="small mb-1 fs-6">Username </label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value="username"
                  />
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">First name</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value="ABC"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Last name</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value="Luna"
                    />
                  </div>
                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Date of birth</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value="01/11/2001"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Address</label>
                    <input
                      className="form-control"
                      readOnly
                      type="text"
                      value="San Francisco, CA"
                    />
                  </div>
                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Email address</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value="name@example.com"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Phone number</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value="0123456789"
                    />
                  </div>
                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Status</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value="Pending"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Role</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value="Learner"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary" type="button">
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailsUser;
