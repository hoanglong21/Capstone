import React from 'react'

function DeleteTest() {
  return (
    <div className="modal" tabindex="-1" role="dialog" id="deleteTestModal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger">DELETE TEST</h5>
            <button
              type="button"
              id="closeModal"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure delete this test ?</p>
          </div>
          <div className="modal-footer">
            <button type="button" class="btn btn-primary">
              Yes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteTest