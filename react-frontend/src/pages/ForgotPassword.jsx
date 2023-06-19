import React, { useState } from "react";
import logo from "../assets/images/logo-1.png";
import styles from "../assets/styles/Form.module.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="login bg-white h-100 p-5">
      <div className="row px-4">
        <div className="col d-flex align-items-start">
          <img src={logo} className="w-100" alt="" />
        </div>
        <div className="col-6 mt-4 me-5 pe-5">
          <div className="container me-5">
            <h2 style={{ textAlign: "center" }}>Forgot Password</h2>
            <form
              className="form needs-validation pe-4"
              style={{ marginTop: "5rem" }}
            >
              <div className="form-group mb-3">
                <label className={styles.formLabel}>Email Address</label>
                <input
                  placeholder="Your email address"
                  name="email"
                  className={`form-control ${styles.formControl}`}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-4">
                <button
                  type="submit"
                  className={`btn btn-primary col-12 ${styles.btn}`}
                >
                  Send Reset Code Your Email
                </button>
              </div>
            </form>
            <div className="d-flex mt-4">
              <Link
                to="/login"
                className="link-primary text-decoration-none ms-2 me-5 fw-semibold"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
