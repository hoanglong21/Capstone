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
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Flashcard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Learn
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
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
