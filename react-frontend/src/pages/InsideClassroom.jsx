import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "../assets/styles/Classroom.css";
import { AiFillContacts, AiOutlineFolder } from "react-icons/ai";
import Swal from "sweetalert2";
import UpdateClassroom from "./UpdateClassroom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../features/user/userAction';
import { useParams } from "react-router-dom";

const InsideClassroom = () => {
  const dispatch = useDispatch()
    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    useEffect(() => {
      if (userToken) {
          dispatch(getUser(userToken))
      }
  }, [userToken, dispatch])

  const [classroom, setClassroom] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    loadClassroom();
  }, []);

  const loadClassroom = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/class");
    setClassroom(result.data);
  };

  const DeleteClass = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your class has been deleted.", "success");
      }
    });
  };
  return (
    // <>
    // {classroom.map((classroom) => (
    //   <li className="inside__list">
    //     <div className="inside__wrapper">
    //       <div className="inside__container">
    //         <div className="inside__imgWrapper" />
    //         <div className="inside__image" />
    //         <div className="inside__content">
    //           <button
    //             className="inside__close"
    //             type="button"
    //             data-bs-toggle="dropdown"
    //             aria-expanded="false"
    //           >
    //             &#8801;
    //           </button>
    //           <ul className="dropdown-menu dropdown-menu-end p-2">
    //             <li>
    //               <Popup
    //                 modal
    //                 trigger={
    //                   <button className="dropdown-item py-2 px-2" type="button">
    //                     <span className="align-middle fw-semibold">
    //                       Update Classroom
    //                     </span>
    //                   </button>
    //                 }
    //               >
    //                 {(close) => <UpdateClassroom close={close} />}
    //               </Popup>
    //             </li>
    //             <li>
    //               <button
    //                 className="dropdown-item py-2 px-2"
    //                 onClick={DeleteClass}
    //               >
    //                 <span className="align-middle fw-semibold">
    //                   Delete Classroom
    //                 </span>
    //               </button>
    //             </li>
    //           </ul>
    //           <Link className="inside__title" to={`/mainclass`}>
    //             <h2>{classroom.class_name}</h2>
    //           </Link>
    //           <p className="inside__owner">{userInfo.username}</p>
    //         </div>
    //       </div>
    //       <img
    //         className="inside__avatar"
    //         src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg"
    //         alt=""
    //       />
    //     </div>
    //     <div className="inside__bottom">
    //       <AiFillContacts />
    //       <AiOutlineFolder />
    //     </div>
    //   </li>
    //   ))}
    // </>
    <div className="container mt-4 mb-5">
            <div className="sets-search mb-4 d-flex align-items-center">
                <input
                    className="search-control flex-grow-1"
                    placeholder="Search your sets"
                    type="text"
                    value=""
                ></input>
                {/* <SearchIcon /> */}
            </div>
            <div className="sets-list">
                {classroom.map((classroom) => (
                    <div key={classroom.id} className="set-item mb-3">
                        <Link to={`/mainclass/${classroom.id}`}>
                            <div className="set-body d-flex mb-2">
                                <div className="term-count me-4">{classroom.class_name}</div>
                                <a className="set-author d-flex" href="#">
                                    {/* <div className="author-avatar">
                                        <img
                                            src={av}
                                            alt="author avatar"
                                            className="w-100"
                                        />
                                    </div> */}
                                    <span className="author-username ms-2">
                                        {classroom.description}
                                    </span>
                                </a>
                            </div>
                            {/* <div className="set-title">{set.title}</div> */}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
  );
};

export default InsideClassroom;
