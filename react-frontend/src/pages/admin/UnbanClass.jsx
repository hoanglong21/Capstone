import React from "react";

function UnbanClass() {
  return (
    <div class="modal" tabindex="-1" role="dialog" id="unbanClassModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">UNBAN CLASS</h5>
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
            <p>Are you sure unban class name ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success">
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

export default UnbanClass;
