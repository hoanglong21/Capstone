import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../../features/user/userAction";
import { useParams } from "react-router-dom";
import { SearchIcon } from "../../../components/icons";
import "../../../assets/styles/Classroom.css";
import "./Class.css";
import UpdateClassroom from "../../UpdateClassroom"

const ClassList = () => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userToken) {
      dispatch(getUser(userToken));
    }
  }, [userToken, dispatch]);

  const [classroom, setClassroom] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    loadClassroom();
  }, []);

  const loadClassroom = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/class");
    setClassroom(result.data);
  };

  const DeleteClass = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your class has been deleted.", "success");
        await axios.delete(`http://localhost:8080/api/v1/class/${id}`);
        loadClassroom();
      }
    });
  };
  return (
    <div className="container mt-4 mb-5">
      {classroom.length === 0 ? (
        <div className="noClass__container">
          <img
            className="noClass__img"
            src="https://www.gstatic.com/classroom/empty_states_home.svg"
            alt=""
          />
          <p className="noClass__message">One more class to get started</p>
          <div className="noClass__link">
            <Link className="noClass__link1" to="/createclass">
              Create Class
            </Link>
            <Link className="noClass__link2" to="/joinclass">
              Join Class
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="sets-search mb-4 d-flex align-items-center">
            <input
              className="search-control flex-grow-1"
              placeholder="Search your class"
              type="text"
              value=""
            ></input>
            <SearchIcon />
          </div>
          <div className="set-list">
            {classroom.map((classroom) => (
              <div key={classroom.id} className="set-item mb-3">
                <Link to={`/mainclass/${classroom.id}`}>
                  <div className="set-body d-flex mb-2">
                    <div className="term-count me-4">
                      {classroom.description}
                    </div>
                    <div className="author-username ms-2">
                      <p className="description ms-2">{classroom.class_name}</p>
                      <span style={{ color: "#2BC2FC" }}>Created By </span>
                      {classroom.user.username}
                    </div>
                  </div>
                </Link>
                <button className="inside__close" type="button" data-bs-toggle="dropdown" aria-expanded="false">&#8801;</button>
              <ul className="dropdown-menu dropdown-menu-end p-2">
                <li>
                  <Popup
                    modal
                    trigger={
                      <button className="dropdown-item py-2 px-2" type="button">
                        <span className="align-middle fw-semibold">
                          Update Classroom
                        </span>
                      </button>
                    }
                  >
                    {(close) => <UpdateClassroom close={close} />}
                  </Popup>
                </li>
                <li>
                  <button
                    className="dropdown-item py-2 px-2"
                    onClick={() => DeleteClass(classroom.id)}
                  >
                    <span className="align-middle fw-semibold">
                      Delete Classroom
                    </span>
                  </button>
                </li>
              </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ClassList;
