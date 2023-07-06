import React from 'react'
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";

function ViewDetailFeedback() {
  return (
    <div className="container-fluid">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm">
          <HeaderAdmin />
          <div className="card mb-4">
            <div className="card-header fs-5 fw-bold text-uppercase">
              Feedback Details
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1 fs-6">Feedback Title </label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value="HAHAHA"
                  />
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Feedback ID</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value="12"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Creator By</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value="Duong"
                    />
                  </div>
                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Created Date</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value="07/11/2022"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="small mb-1 fs-6">Status</label>
                    <input
                      className="form-control"
                      readOnly
                      type="text"
                      value="50"
                    />
                  </div>
                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-md-12">
                    <label className="small mb-1 fs-6">Content</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value="Hanh trinh di den N2"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button className="btn btn-secondary me-4" type="button">
                    Close
                  </button>
                  <button className="btn btn-primary" type="button">
                    Reply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewDetailFeedback