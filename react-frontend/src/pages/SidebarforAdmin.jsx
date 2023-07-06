import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../assets/images/logo-1.png";
import img from "../assets/images/avatar-default.jpg"
import { Link } from "react-router-dom";
import "../assets/styles/sidebar.css";
import {
  NotifyIcon,
  ProfileIcon,
  SettingIcon,
  HelpIcon,
  LogoutIcon,
} from "../components/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../features/user/userAction";
import { useState } from "react";
import ManageUser from "./ManageUser"

function SidebarforAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userToken } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.user);

  const [showLogoutMess, setShowLogoutMess] = useState(false);

  useEffect(() => {
    if (userToken) {
      dispatch(getUser(userToken));
    }
  }, [userToken, dispatch]);

  const toggleShowLogoutMess = () => setShowLogoutMess(!showLogoutMess);

  const handleLogout = () => {
    dispatch(logout());
    toggleShowLogoutMess();
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="header__admin col-4 col-md-2 min-vh-100 d-flex justify-content-between flex-column">
          <div>
            <Link
              href=""
              className="text-decoration-none text-white d-flex align-item center d-none d-sm-inline d-none d-sm-inline mt-2 "
            >
              <img className="img-thumbnail mt-2" src={logo} alt="" />
            </Link>
            <hr className="text-dark d-none d-sm-block" />
            <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
              <li className="nav-item text-white fs-6 my-1 py-2 py-sm-0">
                <Link
                  to="/managedashboard"
                  className="nav-link text-white fs-7"
                  aria-current="page"
                >
                  <i className="bi bi-speedometer2"></i>
                  <span className="ms-3 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item text-white fs-6 my-1 py-2 py-sm-0">
                <Link
                  to="/manageuser"
                  className="nav-link text-white fs-7"
                  aria-current="page"
                >
                  <i class="bi bi-person-square"></i>
                  <span className="ms-3 d-none d-sm-inline">Manage User</span>
                </Link>
              </li>
              <li className="nav-item text-white fs-6 my-1 py-2 py-sm-0">
                <Link
                  to="/manageclass"
                  className="nav-link text-white fs-7"
                  aria-current="page"
                >
                  <i class="bi bi-people"></i>
                  <span className="ms-3 d-none d-sm-inline">Manage Class</span>
                </Link>
              </li>
              <li className="nav-item text-white fs-6 my-1 py-2 py-sm-0">
                <Link
                  to="/manageclass"
                  className="nav-link text-white fs-7"
                  aria-current="page"
                >
                  <i class="bi bi-chat-text"></i>
                  <span className="ms-3 d-none d-sm-inline">
                    Manage Feedback
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown open">
            <Link
              to=""
              className="text-decoration-none text-white p-3"
              type="button"
              id="triggerId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle">
                <span className="ms-2 d-none d-sm-inline me-2 fs-6">
                  Administrator
                </span>
              </i>
              <i class="bi bi-box-arrow-in-left"></i>
            </Link>
          </div>
        </div>
        <div className="col-sm">
          <nav className="navbar bg-light">
            <form className="d-flex w-50" role="search">
              <input
                class="form-control ms-3 me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-primary" type="submit">
                Search
              </button>
            </form>
            <button
            type="button"
            className="btn btn-outline-secondary icon-outline-secondary"
          >
            <NotifyIcon strokeWidth="2" />
          </button>
          <div className="dropdown d-inline-flex">
            <button
              className="btn btn-avatar pe-0"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={img} alt="avatar" className="avatar" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end p-2">
              <li>
                <div className="dropdown-header d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <img src={img} alt="avatar" className="avatar" />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="fw-semibold">Username</p>
                    <p
                      className="text-truncate"
                      style={{
                        maxWidth: "8rem",
                      }}
                    >
                      Email
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item py-2 px-3"
                  type="button"
                  onClick={() => {
                    navigate("account");
                  }}
                >
                  <ProfileIcon className="me-3" strokeWidth="2" />
                  <span className="align-middle fw-semibold">Profile</span>
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item py-2 px-3"
                  type="button"
                  onClick={() => {
                    navigate("setting");
                  }}
                >
                  <SettingIcon className="me-3" strokeWidth="2" />
                  <span className="align-middle fw-semibold">Settings</span>
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item py-2 px-3"
                  type="button"
                  onClick={() => {
                    navigate("help-center");
                  }}
                >
                  <HelpIcon className="me-3" strokeWidth="2" />
                  <span className="align-middle fw-semibold">Help Center</span>
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item py-2 px-3"
                  type="button"
                  onClick={handleLogout}
                >
                  <LogoutIcon className="me-3" strokeWidth="2" />
                  <span className="align-middle fw-semibold">Logout</span>
                </button>
              </li>
            </ul>
          </div>
          </nav>
          <hr className="text-secondary d-none d-sm-block mt-0" />
          <ManageUser/>
        </div>
      </div>
    </div>
  );
}

export default SidebarforAdmin;
