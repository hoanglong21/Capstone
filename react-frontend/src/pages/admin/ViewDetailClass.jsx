import React from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";

function ViewDetailClass() {
  return (
    <div className="container-fluid">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm">
          <HeaderAdmin />
          <div className="card mb-4">
            <div className="card-header fs-5 fw-bold text-uppercase">
              Class Details
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1 fs-6">Class Name </label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value="N2"
                  />
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Class ID</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value="12"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Tutor guide</label>
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
                    <label className="small mb-1 fs-6">Create Date</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value="01/11/2001"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Member's Joined</label>
                    <input
                      className="form-control"
                      readOnly
                      type="text"
                      value="50"
                    />
                  </div>
                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Description</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value="Hanh trinh di den N2"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Status</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value="Active"
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

export default ViewDetailClass;
