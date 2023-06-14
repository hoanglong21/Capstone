import React, { useState } from 'react'
import '../assets/styles/Classroom.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function CreateClassroom() {
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
        navigate('/login')
    }

    return (
        <div className="form">
            <div className="form__inputs">
                <p className="class__title">Create Classroom</p>
                <Link to="/" className="close">
                    &times;
                </Link>
                <form onSubmit={(e) => onSubmit(e)}>
                    <fieldset className="form__input">
                        <input
                            type={'text'}
                            name="className"
                            placeholder="Class Name"
                            value={className}
                            required
                            onChange={(e) => onInputChange(e)}
                        />
                    </fieldset>
                    <fieldset className="form__input">
                        <input
                            type={'text'}
                            name="tutor"
                            placeholder="Tutor Guide"
                            value={tutor}
                            required
                            onChange={(e) => onInputChange(e)}
                        />
                    </fieldset>
                    <fieldset className="form__input">
                        <input
                            type={'text'}
                            name="classDescription"
                            placeholder="Class Description"
                            value={classDescription}
                            required
                            onChange={(e) => onInputChange(e)}
                        />
                    </fieldset>
                    <fieldset className="form__input">
                        <input
                            type={'date'}
                            name="createDate"
                            placeholder="Create Date"
                            value={createDate}
                            required
                            onChange={(e) => onInputChange(e)}
                        />
                    </fieldset>
                    <button type="submit" className="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}