import React, { useState } from 'react'
import '../assets/styles/Classroom.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UpdateClassroom({close}) {
    let navigate = useNavigate()

    const [classroom, setClassroom] = useState({
        class_name: '',
        description: '',
    })

    const {class_name, description } = classroom

    const onInputChange = (e) => {
        setClassroom({ ...classroom, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:8080/api/v1/class', classroom)
        navigate('/sets/classes')
    }

  return (
    <div className="createClass__form">
      <div className="createClass__form__inputs">
        <p className="createClass__title">Update Classroom</p>
        <a onClick={close} className="createClass__close">&times;</a>
        <form onSubmit={(e) => onSubmit(e)}>
          <fieldset className="createClass__form__input">
            <input className="createClass__input" type={"text"} name="className" placeholder='Class Name' value={class_name} required onChange={(e) => onInputChange(e)} />
          </fieldset>
          <fieldset className="createClass__form__input">
            <input className="createClass__input" type={"text"} name="classDescription" placeholder='Class Description' value={description} required onChange={(e) => onInputChange(e)} />
          </fieldset>
          <div className="createClass__submit">
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
