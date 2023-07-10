import React from "react";

function CreateTest() {
  return (
    <div className="container">
      <h4 className="text-center mt-2 bg-info text-white w-100 py-2 pt-2">
        Create Test Online For Learner
      </h4>
      <div
        className="mb-3"
        style={{
          backgroundColor: "#fff",
          width: "70%",
          padding: "15px",
          borderTop: "8px solid #673AB7",
          borderRadius: "10px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <label for="exampleFormControlInput1" className="form-label">
          Test Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Test 1"
        />

        <label for="exampleFormControlInput1" className="form-label">
          Test Description
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Do exercise 1 to 5"
        />
      </div>

      <div
        className="question"
        style={{
          backgroundColor: "#fff",
          width: "70%",
          padding: "15px",
          borderLeft: "8px solid #4285F4",
          borderRadius: "10px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div className="row g-2">
          <div className="col-9">
            <div className="form-floating">
              <input type="text" className="form-control" id="floatingInputGrid" />
              <label for="floatingInputGrid">Question 1</label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-floating">
              <select
                className="form-select"
                id="floatingSelectGrid"
                aria-label="Floating label select example"
              >
                <option selected>Multiple Choice</option>
                <option value="Paragraph">Paragraph</option>
                <option value="True-False">True-False</option>
              </select>
              <label for="floatingSelectGrid">Type Question</label>
            </div>
          </div>
        </div>

        {/* Multiple Choice */}
        <div className="multi mt-2">
          <input type="radio" id="a" className="me-2" value="a" />
          <label for="a">A</label>
          <br />
          <input type="radio" id="b" className="me-2" value="b" />
          <label for="b">B</label>
          <br />
          <input type="radio" id="c" className="me-2" value="c" />
          <label for="c">C</label>
        </div>
        {/* Paragraph */}
        <div className="form-floating mt-2">
          <textarea
            className="form-control"
            placeholder="Answer"
            id="floatingTextarea2"
            style={{ height: "100px" }}
          ></textarea>
          <label for="floatingTextarea2">Answer</label>
        </div>
        {/* True-False */}
        <div className="radio mt-2">
          <input type="radio" id="True" name="group-radio" />
          <label for="True">True</label>
          <br />
          <input type="radio" id="False" name="group-radio" />
          <label for="False">False</label>
        </div>
      </div>
      <div className="text-center mt-3">
      <button type="submit" className="bg-primary text-white border border-primary rounded-3 py-2 px-3 fw-bold fs-7">Create Test</button>
      </div>
    </div>
  );
}

export default CreateTest;
