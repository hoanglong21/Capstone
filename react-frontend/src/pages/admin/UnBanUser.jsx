import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const UnBanUser = ({ user }) => {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [unbanUser, setUnBanUser] = useState({});
  const [success, setSuccess] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  useEffect(() => {
    if (user.username) {
      setUnBanUser({ ...user });
    }
  }, [user]);

  const handleUnBan = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await UserService.recoverUser(unbanUser.username);
      setSuccess(true);
      // document.getElementById("closeUnBanModal").click();
      setButtonDisabled(true);
      navigate("/manageusers");
      setError("");
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div
      className="modal fade"
      tabindex="-1"
      id={`unbanModal${user?.username}`}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">UNBAN USERS</h5>
            <button
              type="button"
              id="closeUnBanModal"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                document.getElementById("username");
                setUnBanUser({});
                setError("");
              }}
            ></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-warning" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success" role="alert">
                You unbaned {unbanUser.username} successfully!
              </div>
            )}
            <p>
              Are you sure unban <strong>{unbanUser.username}</strong> ?
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Cancel
            </button>
            <button type="button" disabled={isButtonDisabled} class="btn btn-success" onClick={handleUnBan}>
            {isButtonDisabled ? 'Sure!' : 'Sure'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnBanUser;
