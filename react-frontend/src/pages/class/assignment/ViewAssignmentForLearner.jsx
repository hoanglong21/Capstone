import React from "react";

function ViewAssignment() {
  // const actualBtn = document.getElementById("actual-btn");

  // const fileChosen = document.getElementById("file-chosen");

  // actualBtn.addEventListener("change", function () {
  //   fileChosen.textContent = this.files[0].name;
  // });

  return (
    <div className="container">
      <h3 className="text-center mt-4 fw-bold">Assignment</h3>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Assignment Title</th>
            <th scope="col">Assignment Description</th>
            <th scope="col">Create Date</th>
            <th scope="col">Due Date</th>
            <th scope="col">Point</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" style={{ verticalAlign: "middle" }}>
              1
            </th>
            <td style={{ verticalAlign: "middle" }}><a href="/">Practice1.pdf</a></td>
            <td style={{ verticalAlign: "middle" }}>
              Do exercise 1 to 5 in the grammar part
            </td>
            <td style={{ verticalAlign: "middle" }}>9/7/2023</td>
            <td style={{ verticalAlign: "middle" }}>11/7/2023</td>
            <td style={{ verticalAlign: "middle" }}>No Point</td>
            <td>
              <input type="file" id="actual-btn" hidden />
              <label
                for="actual-btn"
                className="bg-primary text-white border border-primary rounded-3 py-2 px-2 mb-2"
              >
                <i className="bi bi-paperclip me-1"></i>Submit Assignment
              </label>
              <br />
              <span id="file-chosen">No file chosen</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ViewAssignment;
