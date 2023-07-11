import React from "react";
import "../assets/styles/quiz.css";

function DoQuiz() {
  return (
    <div class="container">
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#quizModal"
      >
        Setup your quiz
      </button>

      <div
        class="modal fade"
        id="quizModal"
        tabindex="-1"
        aria-labelledby="quizModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="quizModalLabel">
                <strong>MLN111</strong>
                <br />
                Set up your quiz
              </h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form action="">
                <div
                  class="ojn81eb"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "1rem 0",
                  }}
                >
                  <div
                    class="qa7hpt4"
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <h5 class="qh8uqkb" style={{ marginRight: ".5rem" }}>
                      <strong>Questions</strong>
                    </h5>
                    <div class="qxkjrwb">(max 408)</div>
                  </div>
                  <div class="qasqj0a" style={{ width: "5.375rem" }}>
                    <label class="AssemblyInput">
                      <input
                        name="questionCount"
                        aria-label="Enter the desired number of questions"
                        class="AssemblyInput-input"
                        placeholder=""
                        type="number"
                        value="1"
                      />
                    </label>
                  </div>
                </div>
                <div class="ojn81eb">
                  <div
                    class="qa7hpt4"
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <h5 class="qh8uqkb" style={{ marginRight: ".5rem" }}>
                      <strong>Answer with</strong>
                    </h5>
                  </div>
                  <div class="select">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Term</option>
                      <option value="1">Definition</option>
                      <option value="2">Both</option>
                    </select>
                  </div>
                </div>
                <hr class="d1llavan" />
                <div>
                  <div class="ojn81eb">
                    <div class="o5jd1da">
                    <h5 class="qh8uqkb" style={{ marginRight: ".5rem" }}>
                      <strong>True/False</strong>
                    </h5>
                    </div>
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        checked
                      />
                    </div>
                  </div>
                  <div class="ojn81eb">
                  <h5 class="qh8uqkb" style={{ marginRight: ".5rem" }}>
                      <strong>Multiple Choice</strong>
                    </h5>
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                      />
                    </div>
                  </div>
                  <div class="ojn81eb">
                  <h5 class="qh8uqkb" style={{ marginRight: ".5rem" }}>
                      <strong>Written</strong>
                    </h5>
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default DoQuiz;
