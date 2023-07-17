import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../../assets/images/logo-1.png";
import { Link } from "react-router-dom";
import "../../assets/styles/sidebar.css";

function SidebarforAdmin() {
  return (
    <div className="header__admin col-auto col-md-2 min-vh-100 d-flex justify-content-between flex-column wrapper align-items-stretch">
      <nav id="navbar">
        <Link
          href=""
          className="text-decoration-none d-flex align-item center d-none d-sm-inline d-none d-sm-inline mt-2 "
        >
          <img className="img-thumbnail mt-2" src={logo} alt="" />
        </Link>
        <hr className="text-dark d-none d-sm-block" />
        <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link
              to="/dashboard"
              className="nav-link fs-7"
            >
              <i className="bi bi-speedometer2 text-dark"></i>
              <span className="ms-3 d-none d-sm-inline text-dark">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link
              to="/manageusers"
              className="nav-link fs-7"
            >
              <i class="bi bi-person-square text-dark"></i>
              <span className="ms-3 d-none d-sm-inline text-dark">Manage User</span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link
              to="/manageclass"
              className="nav-link fs-7"
            >
              <i class="bi bi-people text-dark"></i>
              <span className="ms-3 d-none d-sm-inline text-dark">Manage Class</span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link
              to="/managefeedback"
              className="nav-link fs-7"
            >
              <i class="bi bi-chat-text text-dark"></i>
              <span className="ms-3 d-none d-sm-inline text-dark">Manage Feedback</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SidebarforAdmin;
