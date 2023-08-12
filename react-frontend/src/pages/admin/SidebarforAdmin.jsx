import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../../assets/images/logo-1.png";
import { Link } from "react-router-dom";
import "../../assets/styles/sidebar.css";
import { useSelector } from 'react-redux'

function SidebarforAdmin() {
  const { userInfo } = useSelector((state) => state.user)
  return (
    <div className="header__admin col-2 min-vh-100 d-flex justify-content-between flex-column wrapper align-items-stretch">
      <section id="navbar">
        <Link
          href=""
          className="text-decoration-none d-flex align-item center d-none d-sm-inline d-none d-sm-inline mt-2 "
        >
          <img className="img-thumbnail mt-2" src={logo} alt="" />
        </Link>
        <hr className="text-dark d-none d-sm-block" />
        <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
          <li className="nav-item active fs-6 my-1 py-2 py-sm-0">
            <Link to="/dashboard" className="nav-link fs-7">
              <i className="bi bi-speedometer2 icon-db"></i>
              <span className="ms-3 d-none d-md-inline">
                Dashboard
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/manageusers" className="nav-link fs-7">
              <i class="bi bi-person-square icon-db"></i>
              <span className="ms-3 d-none d-md-inline">
                Manage User
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/manageclass" className="nav-link fs-7">
              <i class="bi bi-people icon-db"></i>
              <span className="ms-3 d-none d-md-inline">
                Class
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/managefeedback" className="nav-link fs-7">
              <i class="bi bi-chat-text icon-db"></i>
              <span className="ms-3 d-none d-md-inline">
                Feedback
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/managestudyset" className="nav-link fs-7">
            <i class="bi bi-back icon-db"></i>
              <span className="ms-3 d-none d-md-inline">
                Studyset
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/manageassignment" className="nav-link fs-7">
            <i class="bi bi-file-zip-fill icon-db"></i>
              <span className="ms-3 d-none d-md-inline">
                Assignment
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/managetest" className="nav-link fs-7">
            <i class="bi bi-file-earmark-text icon-db"></i>
              <span className="ms-3 d-none d-md-inline">
                Test
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/managesubmission" className="nav-link fs-7">
            <i class="bi bi-archive icon-db"></i>
              <span className="ms-3 d-none d-md-inline">
                Submission
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/managepost" className="nav-link fs-7">
            <i class="bi bi-send-fill icon-db"></i>
              <span className="ms-3 d-none d-md-inline">
                Post
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/managecomment" className="nav-link fs-7">
            <i class="bi bi-question-circle icon-db"></i>
              <span className="ms-3 d-none d-md-inline">
                Comment
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/vocabforadmin" className="nav-link fs-7">
            <i class="bi bi-book icon-db"></i>
              <span className="ms-3 d-none d-md-inline">
                Dictionary
              </span>
            </Link>
          </li>
          {userInfo?.id === 1 && (
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/registeradmin" className="nav-link fs-7">
            <i class="bi bi-person-add icon-db"></i>
              <span className="ms-3 d-none d-md-inline">
                (IAM) Register
              </span>
            </Link>
          </li>
          )}
        </ul>
      </section>
    </div>
  );
}

export default SidebarforAdmin;
