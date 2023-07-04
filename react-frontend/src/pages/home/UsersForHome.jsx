import React from "react";
import { Link } from "react-router-dom";
import { ClassIcon, StudySetIcon } from "../../components/icons";

function UsersForHome() {
  return (
    <div className="mt-4 mb-5">
      <div className="sets-list">
        <div className="set-item mb-3">
          <Link to={`/class`}>
            <div className="set-body row mb-2">
              <div className="set-title col-2 d-flex align-items-center">
                <ClassIcon className="me-2" />
                3 Classes
              </div>
              <div className="col d-flex align-items-center">
                <div className="author-avatar">
                  <img src={"/"} alt="author avatar" className="w-100 h-100" />
                </div>
                <span className="author-username ms-2">Author</span>
              </div>
            </div>
            <div className="row">
              <div className="set-title col-2 d-flex align-items-center">
              <StudySetIcon className="me-2" />
                5 Sets
              </div>
              <div className="col d-flex align-items-center">
                <p
                  className="set-description m-0"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                Description about author
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UsersForHome;
