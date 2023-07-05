import React from "react";
import ava from "../assets/images/avatar-default.jpg";
import { useNavigate } from "react-router-dom";

function ViewDetailsUser() {
  const navigate = useNavigate();
  return (
    <div class="row">
      <div class="col-xl-4">
        <div class="card mb-4 mb-xl-0">
          <div class="card-header">Profile Picture</div>
          <div class="card-body text-center">
            <img
              class="img-account-profile rounded-circle mb-3"
              src={ava}
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="col-xl-8">
        <div class="card mb-4">
          <div class="card-header">Account Details</div>
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label class="small mb-1">Username </label>
                <input
                  class="form-control"
                  type="text"
                  readOnly
                  value="username"
                />
              </div>
              <div class="row gx-3 mb-3">
                <div class="col-md-6">
                  <label class="small mb-1">First name</label>
                  <input
                    class="form-control"
                    type="text"
                    readOnly
                    value="ABC"
                  />
                </div>
                <div class="col-md-6">
                  <label class="small mb-1">Last name</label>
                  <input
                    class="form-control"
                    type="text"
                    readOnly
                    value="Luna"
                  />
                </div>
              </div>

              <div class="row gx-3 mb-3">
                <div class="col-md-6">
                  <label class="small mb-1">Date of birth</label>
                  <input
                    class="form-control"
                    type="text"
                    readOnly
                    value="01/11/2001"
                  />
                </div>

                <div class="col-md-6">
                  <label class="small mb-1">Address</label>
                  <input
                    class="form-control"
                    readOnly
                    type="text"
                    value="San Francisco, CA"
                  />
                </div>
              </div>

              <div class="row gx-3 mb-3">
                <div class="col-md-6">
                  <label class="small mb-1">Email address</label>
                  <input
                    class="form-control"
                    type="tel"
                    readOnly
                    value="name@example.com"
                  />
                </div>

                <div class="col-md-6">
                  <label class="small mb-1">Phone number</label>
                  <input
                    class="form-control"
                    type="tel"
                    readOnly
                    value="0123456789"
                  />
                </div>
              </div>

              <div class="row gx-3 mb-3">
                <div class="col-md-6">
                  <label class="small mb-1">Status</label>
                  <input
                    class="form-control"
                    type="tel"
                    readOnly
                    value="Pending"
                  />
                </div>

                <div class="col-md-6">
                  <label class="small mb-1">Role</label>
                  <input
                    class="form-control"
                    type="text"
                    readOnly
                    value="Learner"
                  />
                </div>
              </div>

              <button
                class="btn btn-primary"
                type="button"
                onClick={() => {
                  navigate("manageuser");
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailsUser;
