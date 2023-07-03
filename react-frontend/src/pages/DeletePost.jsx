import React, { useState } from "react";

function DeletePost() {
  return (
      <div className="modal fade" id="deleteModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Post
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" id="close-modal">
                No
              </button>
              <button type="button" className="btn btn-danger">
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default DeletePost;
