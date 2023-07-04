import React from "react";

function UpdatePost() {
  return (
    <div className="modal" id="updateModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Edit This Post</h4>
            <button
              type="button"
              id="closeModal"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <form>
              <input className="form-control" type="hidden" name="id" />
              <div className="form-group">
                <label for="content">Content</label>
                <input className="form-control" type="text" name="content" />
              </div>
              <div className="form-group">
                <label for="file">File</label>
                <input className="form-control" type="file" name="file" />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  id="btnUpdateSubmit"
                >
                  Update
                </button>
                <button
                  type="button"
                  class="btn btn-danger float-right"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;
