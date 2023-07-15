import React from "react";
import img from "../../assets/images/avatar-default.jpg";

function People() {
  return (
    <div className="container">
      <div className="header">
        <span className="fs-5 me-3 ms-4" style={{ color: "#137333" }}>
          Teacher
        </span>
        <hr className="me-3" style={{ color: "#137333" }} />
        <p>
          <img
            src={img}
            alt=""
            className="ms-4"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              marginRight: "15px",
            }}
          />
          Sofia
        </p>
      </div>
      <div className="body">
        <span className="fs-5 me-3 ms-4" style={{ color: "#137333" }}>
          Student (50 people)
        </span>
        <hr className="me-2" style={{ color: "#137333" }} />
        <p>
          <img
            src={img}
            alt=""
            className="ms-4"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              marginRight: "15px",
            }}
          />
          Linda
        </p>
        <hr className="me-2" style={{ color: "#A8A9AD" }} />
      </div>
    </div>
  );
}

export default People;
