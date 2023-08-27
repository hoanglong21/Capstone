import React, { useState, useEffect } from "react";
import SidebarforAdmin from "../SidebarforAdmin";
import HeaderAdmin from "../HeaderAdmin";
import { Link, useParams } from "react-router-dom";
import TestService from "../../../services/TestService";

function ViewDetailTest() {
    const [tests, setTests] = useState([])
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const temp = (await TestService.getTestById(id)).data;
      setTests(temp);
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="container-fluid">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-10">
          <HeaderAdmin />
          <div className="card mb-4">
            <div className="card-header fs-5 fw-bold text-uppercase">
              Test Details
            </div>
            <div className="card-body">
              <form>
              <div className="row gx-3 mb-3">
                <div className="col-md-4">
                  <label className="small mb-1 fs-6">Test Title </label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={tests?.title}
                  />
                </div>
                <div className="col-md-4">
                  <label className="small mb-1 fs-6">Test Duration </label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={tests?.duration}
                  />
                </div>
                <div className="col-md-4">
                  <label className="small mb-1 fs-6">Number Attempts </label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={tests?.num_attemps}
                  />
                </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-3">
                    <label className="small mb-1 fs-6">Test ID</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={tests?.id}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="small mb-1 fs-6">Creator By</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={tests?.user?.username}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="small mb-1 fs-6">Class Name</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={tests?.classroom?.class_name}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="small mb-1 fs-6">Draft ?</label>
                    <select
                      className="form-control"
                      readOnly
                      value={tests?._draft}
                    >
                      <option value={true} hidden>
                        Draft
                      </option>
                      <option value={false} hidden>
                        Not draft
                      </option>
                    </select>
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-3">
                    <label className="small mb-1 fs-6">Create Date</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={tests?.created_date}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="small mb-1 fs-6">Start Date</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={tests?.start_date}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="small mb-1 fs-6">Due Date</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={tests?.due_date}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="small mb-1 fs-6">Modified Date</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={tests?.modified_date}
                    />
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-12">
                    <label className="small mb-1 fs-6">Description</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value={tests?.description}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <Link className="btn btn-secondary me-4" to="/managetest">
                    Close
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailTest;
