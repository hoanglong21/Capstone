import React, { useState } from "react";
import "../assets/styles/Classroom.css";
import { AiOutlineUser } from "react-icons/ai";
import Header from "../components/header/Header";

const MainClass = ({}) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <><Header /><div className="main">
      <div className="main__wrapper">
        <div className="main__content">
          <div className="main__wrapper1">
            <div className="main__bgImage">
              <div className="main__emptyStyles" />
            </div>
            <div className="main__text">
              <h1 className="main__heading main__overflow">Class Name</h1>
              <div className="main__section main__overflow">
                Class Description
              </div>
              <div className="main__wrapper2">
                <em className="main__code">Class Code :</em>
                <div className="main__id">ClassID </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main__announce">
          <div className="main__status">
            <p>Upcoming</p>
            <p className="main__subText">No work due</p>
          </div>
          <div className="main__announcements">
            <div className="main__announcementsWrapper">
              <div className="main__ancContent">
                {showInput ? (
                  <div className="main__form">
                    <input
                      id="filled-multiline-flexible"
                      placeholder="Announce something to class"
                      value={inputValue}
                      onChange={(e) => setInput(e.target.value)} />
                    <div className="main__buttons">
                      <input onChange={handleChange} type="file" />

                      <div>
                        <button onClick={() => setShowInput(false)} className="btn btn-outline-danger mx-2">
                          Cancel
                        </button>

                        <button onClick={'/'} className="btn btn-outline-primary">
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="main__wrapper100"
                    onClick={() => setShowInput(true)}
                  >
                    <AiOutlineUser />
                    <div>Announce Something to class</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default MainClass;
