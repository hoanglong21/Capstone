import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/Classroom.css'

export default function NoClass() {
    return (
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
    )
}
