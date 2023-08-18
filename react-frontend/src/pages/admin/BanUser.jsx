import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BanUser = ({ user }) => {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [banUser, setBanUser] = useState({});
  // const [success, setSuccess] = useState(false)
  // const [isButtonDisabled, setButtonDisabled] = useState(false);
  useEffect(() => {
    if (user.username) {
      setBanUser({ ...user });
    }
  }, [user]);

  const handleBan = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await UserService.banUser(banUser.username)
      document.getElementById('closeUserModal').click()
      toast.success('Banned successfully !', {
        position: toast.POSITION.TOP_RIGHT
      });
      window.location.reload()
      navigate('/manageusers')
      setError("")
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="modal fade" tabindex="-1" id={`banModal${user?.username}`}>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">BAN USER</h5>
            <button
              id="closeUserModal"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                document.getElementById('username')
                setBanUser({})
                setError('')
            }}
            ></button>
          </div>
          <div class="modal-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {/* {success && (
                    <div className="alert alert-success" role="alert">
                       You banned {banUser.username} successfully!
                    </div>
                )} */}
            <p>
              Are you sure ban <strong>{banUser.username}</strong> ?
            </p>
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
            <button type="button" class="btn btn-danger" onClick={handleBan}>
            Ban
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanUser;
