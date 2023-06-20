import React, { useState } from 'react'
import '../assets/styles/Classroom.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../features/user/userAction';

export default function CreateClassroom() {
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    useEffect(() => {
      if (userToken) {
          dispatch(getUser(userToken))
      }
  }, [userToken, dispatch])

    const [classroom, setClassroom] = useState({
        class_name: '',
        description: '',
        user: {
          id: userInfo.id,
          username: userInfo.username,
      },
    })

    const { class_name, description, } = classroom

    const onInputChange = (e) => {
        setClassroom({ ...classroom, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:8080/joinclass', classroom)
        navigate('/')
    }

  return (
    <div className="createClass__form">
      <div className="createClass__form__inputs">
        <p className="createClass__title">Create Classroom</p>
        <Link to="/" className="createClass__close">&times;</Link>
        <form onSubmit={(e) => onSubmit(e)}>
          <fieldset className="createClass__form__input">
            <input className="createClass__input" type={"text"} name="class_name" placeholder='Class Name' value={class_name} required onChange={(e) => onInputChange(e)} />
          </fieldset>
          {/* <fieldset className="createClass__form__input">
            <input className="createClass__input" type={"text"} name="tutor" placeholder='Tutor Guide' value={tutor} required onChange={(e) => onInputChange(e)} />
          </fieldset> */}
          <fieldset className="createClass__form__input">
            <input className="createClass__input" type={"text"} name="description" placeholder='Class Description' value={description} required onChange={(e) => onInputChange(e)} />
          </fieldset>
          {/* <fieldset className="createClass__form__input">
            <input className="createClass__input" type={"date"} name="createDate" placeholder='Create Date' value={createDate} required onChange={(e) => onInputChange(e)} />
          </fieldset> */}
          <div className="createClass__submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
