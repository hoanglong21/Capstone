import React from "react";

function BanUser() {
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
            >
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure ban user id ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger">
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
