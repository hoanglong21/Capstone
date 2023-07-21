import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

function BanUser() {
  let navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user)
  const [banUser, setBanUser] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (banUser.username) {
      setBanUser({ ...banUser });
    }
  }, [banUser]);

  const handleSubmit = async () => {
    try {
      await UserService.banUser(banUser.username);
      document.getElementById("banUserModal").click();
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError(error.message);
      }
    }
  };
  return (
    <div class="modal" tabindex="-1" role="dialog" id="banModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">BAN USER</h5>
            <button
              type="button"
              id="closeModal"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Are you sure ban {banUser.username} ?</p>
          </div>
          <div class="modal-footer">
            <button
            id="banUserModal"
              type="button"
              class="btn btn-danger"
              onClick={handleSubmit}
            >
              Sure!
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BanUser;
