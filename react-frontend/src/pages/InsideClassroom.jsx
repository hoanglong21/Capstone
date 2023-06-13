import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Classroom.css";

const InsideClassroom = ({ classData }) => {
  return (
    <li className="inside__list">
      <div className="inside__wrapper">
        <div className="inside__container">
          <div className="inside__imgWrapper" />
          <div className="inside__image" />
          <div className="inside__content">
            <Link className="inside__title" to={`/`}>
              <h2>ClassName</h2>
            </Link>
            <p className="inside__owner">Tutor</p>
          </div>
        </div>
        <img
          className="inside__avatar"
          src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg" alt=""
        />
      </div>
      <div className="inside__bottom">
        
      </div>
    </li>
  );
};

export default InsideClassroom;