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
            <i class="bi bi-union text-info fs-2"></i>
              <a
                class="StudyModesNavItemName"
                href="/flashcard"
              >
                Flashcards
              </a>
            </li>
            <li class="StudyModesNavItem">
            <i class="bi bi-files text-warning fs-2"></i>
            <a
                class="StudyModesNavItemName"
                href="/learn"
              >
                Learn
              </a>
            </li>
            <li class="StudyModesNavItem">
            <i class="bi bi-file-text-fill text-danger fs-2"></i>
            <a
                class="StudyModesNavItemName"
                href="/test"
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
