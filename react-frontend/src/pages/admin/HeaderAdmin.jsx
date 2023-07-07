import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import img from "../../assets/images/avatar-default.jpg";
import "../../assets/styles/sidebar.css";
import {
  NotifyIcon,
  ProfileIcon,
  SettingIcon,
  HelpIcon,
  LogoutIcon,
} from "../../components/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../features/user/userAction";
import { useState } from "react";

function HeaderAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userToken } = useSelector((state) => state.auth);
  // const { userInfo } = useSelector((state) => state.user);

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
    <>
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
          className="btn btn-outline-secondary icon-outline-secondary position-absolute"
          style={{ right: "10%" }}
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
            <img src={img} alt="avatar" className="avatar me-5" />
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
    </>
  );
}

export default HeaderAdmin;
