import React from "react";
import "../../assets/styles/studyset.css";

function OverViewSet() {
  return (
    <div className="container">
      <div className="setTitle">
        <h2>MLN 131</h2>
      </div>
      <div className="studySet__preview">
        <h3>Self-study activity</h3>
        <nav className="navbar navbar-expand-sm bg-light justify-content-center">
          <ul class="StudyModesNavSectionList">
            <li class="StudyModesNavItem">
              <a
                class="StudyModesNavItemName"
                href="/flashcard"
              >
                Flashcards
              </a>
            </li>
            <li class="StudyModesNavItem">
            <a
                class="StudyModesNavItemName"
                href="/learn"
              >
                Learn
              </a>
            </li>
            <li class="StudyModesNavItem">
            <a
                class="StudyModesNavItemName"
                href="/flashcard"
              >
                Test
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default OverViewSet;
