import React, { useState } from 'react'
import '../assets/styles/Classroom.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateClassroom() {
    let navigate = useNavigate()

    const [classroom, setClassroom] = useState({
        className: '',
        tutor: '',
        classDescription: '',
        createDate: '',
    })

    const { className, tutor, classDescription, createDate } = classroom

    const onInputChange = (e) => {
        setClassroom({ ...classroom, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:8080', classroom)
        navigate('/')
    }

  return (
    <div className="createClass__form">
      <div className="createClass__form__inputs">
        <p className="createClass__title">Update Classroom</p>
        <Link to="/" className="createClass__close">&times;</Link>
        <form onSubmit={(e) => onSubmit(e)}>
          <fieldset className="createClass__form__input">
            <input className="createClass__input" type={"text"} name="className" placeholder='Class Name' value={className} required onChange={(e) => onInputChange(e)} />
          </fieldset>
          <fieldset className="createClass__form__input">
            <input className="createClass__input" type={"text"} name="tutor" placeholder='Tutor Guide' value={tutor} required onChange={(e) => onInputChange(e)} />
          </fieldset>
          <fieldset className="createClass__form__input">
            <input className="createClass__input" type={"text"} name="classDescription" placeholder='Class Description' value={classDescription} required onChange={(e) => onInputChange(e)} />
          </fieldset>
          <fieldset className="createClass__form__input">
            <input className="createClass__input" type={"date"} name="createDate" placeholder='Create Date' value={createDate} required onChange={(e) => onInputChange(e)} />
          </fieldset>
          <div className="createClass__submit">
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
