import React from "react";

function CreateAssignment() {
  return (
    <div className="container">
      <div className="title">
        <h4 className="text-center mt-2 bg-info text-white w-100 py-2 pt-2">
          Create Assignment For Learner
        </h4>
        <div className="form-floating mb-3 mt-5">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Essay 1"
          />
          <label for="floatingInput">Title Assignment</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Write paragraph"
          />
          <label for="floatingInput">Assignment Description</label>
        </div>
        <div className="mb-3 col-6">
          <p className="fs-7 fw-bold mb-0">Points</p>
          <select className="form-select" aria-label="Points">
            <option selected>No Points</option>
            <option value="1">100</option>
          </select>
        </div>
        <div className="row">
          <div class="mb-3 col-6">
            <p className="fs-7 fw-bold mb-0">Date Due</p>
            <input type="date" className="form-control" />
          </div>
          <div class="mb-3 col-6">
            <p className="fs-7 fw-bold mb-0">Time Due</p>
            <input type="time" className="form-control" />
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            type="file"
            className="form-control"
            id="floatingInput"
            multiple
          />
          <label for="floatingInput">Attach File</label>
        </div>
        <div className="text-center mt-3 mb-5">
          <button
            type="submit"
            className="bg-light text-dark border border-secondary rounded-3 py-2 px-4 fw-bold fs-7"
          >
            Discard
          </button>
          <button
            type="submit"
            className="bg-primary text-white border border-primary rounded-3 py-2 px-4 fw-bold fs-7 ms-3"
          >
            Create Assignment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAssignment;
