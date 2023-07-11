import React from "react";
import {
  StudySetSolidIcon,
  ArrowDownIcon,
  CloseIcon,
  LearnSolidIcon,
  TestSolidIcon,
} from "../components/icons";
import "../assets/styles/quiz.css";

function QuizAnswer() {
  return (
    <div>
      {/* Header */}
      <div className="flashcardHeader d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <StudySetSolidIcon className="flashcardModeIcon" size="2rem" />
          <div className="flashcardMode dropdown d-flex align-items-center">
            <button
              type="button dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="ps-2 me-2">Flashcards</span>
              <ArrowDownIcon size="1rem" strokeWidth="2.6" />
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item flashcardModeIcon py-2 px-3 d-flex align-items-center"
                  type="button"
                >
                  <LearnSolidIcon
                    className="me-3 flashcardModeIcon"
                    size="1.3rem"
                    strokeWidth="2"
                  />
                  <span className="align-middle fw-semibold">Learn</span>
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item py-2 px-3 d-flex align-items-center"
                  type="button"
                >
                  <TestSolidIcon
                    className="me-3 flashcardModeIcon"
                    size="1.3rem"
                  />
                  <span className="align-middle fw-semibold">Test</span>
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item py-2 px-3 d-flex align-items-center"
                  type="button"
                >
                  <span className="align-middle fw-semibold">Home</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flashcardInfo d-flex flex-column align-items-center">
          <h3>1/20 ~ 5%</h3>
          <h3>MLN111</h3>
        </div>
        <div className="flashcardOptions d-flex">
          <button className="flashcardOptions_btn">Options</button>
          <button className="flashcardClose_btn ms-3 d-flex align-items-center">
            <CloseIcon strokeWidth="2" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizAnswer;
