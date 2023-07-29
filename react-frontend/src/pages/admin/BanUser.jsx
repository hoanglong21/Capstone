import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const BanUser = ({ user }) => {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await UserService.banUser(user.username);
      document.getElementById(`banModal${user?.username}`).click();
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError(error.message);
      }
    }
    
    setLoading(false)
  };
  return (
    <div class="modal" tabindex="-1" role="dialog" id={`banModal${user?.username}`}>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">BAN USER</h5>
            <button
              type="button"
              id={`closeUserModal${user?.username}`}
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Are you sure ban {user.username} ?</p>
          </div>
          <div class="modal-footer">
          <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger"
              onClick={handleSubmit}
              disabled={loading}
              >
                  {loading ? (
                      <div
                          className="spinner-border text-secondary mx-auto mb-1"
                          role="status"
                          id="loading"
                      >
                          <span className="visually-hidden">
                              Loading...
                          </span>
                      </div>
                  ) : (
                      'Delete'
                  )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BanUser;
