import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Classroom.css";
import { AiFillContacts, AiOutlineFolder } from "react-icons/ai";
import Footer from "../components/Footer.jsx"
import Swal from "sweetalert2";

const InsideClassroom = () => {
  const UpdateClass = () =>{
      
  }
  const DeleteClass = () =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your class has been deleted.',
          'success'
        )
      }
    })
  }
  return (
    <>
      <li className="inside__list">
        <div className="inside__wrapper">
          <div className="inside__container">
            <div className="inside__imgWrapper" />
            <div className="inside__image" />
            <div className="inside__content">
            <button className="inside__close" type="button" data-bs-toggle="dropdown" aria-expanded="false">&#8801;</button>
            <ul className="dropdown-menu dropdown-menu-end p-2">
                            <li>
                                <button className="dropdown-item py-2 px-2" onClick={UpdateClass}>
                                    <span className="align-middle fw-semibold">
                                        Update Classroom
                                    </span>
                                </button>
                            </li>   
                            <li>
                                <button className="dropdown-item py-2 px-2" onClick={DeleteClass}>
                                    <span className="align-middle fw-semibold">
                                        Delete Classroom
                                    </span>
                                </button>
                            </li>
                        </ul>
              <Link className="inside__title" to={`/mainclass`}>
                <h2>Class Name</h2>
              </Link>
              <p className="inside__owner">Tutor</p>
            </div>
          </div>
          <img
            className="inside__avatar"
            src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg" alt="" />
        </div>
        <div className="inside__bottom">
          <AiFillContacts />
          <AiOutlineFolder />
        </div>
      </li><Footer /></>
  );
};

export default InsideClassroom
