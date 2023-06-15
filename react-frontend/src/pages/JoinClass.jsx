import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/Classroom.css'

const JoinClass = () => {
    const [classCode, setClassCode] = useState('')
    const [error, setError] = useState()
    return (
        <div className="joinClass">
            <div className="joinClass__wrapper">
                <div className="joinClass__wraper2">
                    <Link to="/" className="closeJoin">
                        &times;
                    </Link>
                    <div className="joinClass__topHead">Join Class</div>
                </div>
                <button className="joinClass__btn" onClick={'/'}>
                    Join
                </button>
            </div>
            <div className="joinClass__form">
                <p className="joinClass__formText">
                    You're currently signed in as \nameEmail\
                </p>
                <div className="joinClass__loginInfo">
                    <div className="joinClass__classLeft">
                        <img
                            src={'https://reactjs.org/logo-og.png'}
                            alt=""
                            style={{ width: '40px' }}
                        />
                        <div className="joinClass__loginText">
                            <div className="joinClass__loginName">
                                USER NAME
                            </div>
                            <div className="joinClass__loginEmail">
                                USER EMAIL
                            </div>
                        </div>
                    </div>
                    <button className="logout">Logout</button>
                </div>
            </div>
            <div className="joinClass__form">
                <div
                    style={{ fontSize: '1.5rem', color: '#3c4043' }}
                    className="joinClass__formText"
                >
                    Class Code
                </div>
                <div
                    style={{ color: '#3c4043', marginTop: '5px' }}
                    className="joinClass__formText"
                >
                    Ask your teacher for the class code, then enter it here.
                </div>
                <div className="joinClass__loginInfo">
                    <input
                        type="text"
                        className="joinClass__code"
                        placeholder="Class Code"
                        value={classCode}
                        onChange={(e) => setClassCode(e.target.value)}
                        error={error}
                        helperText={error && 'No class was found'}
                    />
                </div>
            </div>
            <div className="note">
                <div
                    style={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: '#3C4043',
                    }}
                    className="joinClass__formText"
                >
                    How to sign in with the class code:
                    <li className="joinClass__li">Using a licensed account </li>
                    <li className="joinClass__li">
                        Using the 5-7 letter or number class code, no spaces or
                        symbols
                    </li>
                </div>
            </div>
        </div>
    )
}
export default JoinClass
