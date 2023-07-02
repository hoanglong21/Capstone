import React, { useState } from "react";
import "../assets/styles/Classroom.css";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../features/user/userAction";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostInClass from "./PostInClass";

const MainClass = ({ classData }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userToken) {
      dispatch(getUser(userToken));
    }
  }, [userToken, dispatch]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const [classroom, setClassroom] = useState({
    id: "",
    class_code: "",
    class_name: "",
    description: "",
    user: {
      id: userInfo.id,
      username: userInfo.username,
    },
  });

  const { id } = useParams();

  useEffect(() => {
    loadClass();
  }, []);

  const loadClass = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/class/${id}`);
    setClassroom(result.data);
  };

  return (
    <>
      <div className="main">
        <div className="main__wrapper">
          <div className="main__content">
            <div className="main__wrapper1">
              <div className="main__bgImage">
                <div className="main__emptyStyles" />
              </div>
              <div className="main__text">
                <p className="main__heading main__overflow">
                  Class Name: {classroom.class_name}
                </p>
                <div className="main__section main__overflow">
                  Class Description: {classroom.description}
                </div>
                <div className="main__wrapper2">
                  <em className="main__code">
                    Class Code : {classroom.class_code}
                  </em>
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
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <div className="main__buttons">
                        <input onChange={handleChange} type="file" />

                        <div>
                          <button
                            onClick={() => setShowInput(false)}
                            className="btn btn-outline-danger mx-2"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={"/"}
                            className="btn btn-outline-primary"
                          >
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
                      <div>Announce something to class</div>
                    </div>
                  )}
                </div>
              </div>
              <PostInClass/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainClass;
