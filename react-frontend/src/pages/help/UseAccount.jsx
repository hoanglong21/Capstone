import React from 'react'
import { Link } from 'react-router-dom'

function UseAccount() {
  return (
    <div>
        <div className="container">
            <div>
                <h4>How to create Account ?</h4>
                <ul>
                    <li>
                        User need to access the link <Link>Register</Link> to create account
                    </li>
                    <li>On the Register page, user need fill all information display on the screen to create</li>
                    <li>
                    All information is validated and user must follow
                    </li>
                    <li>After fill, please click on "Register" button after that the screen show message "Registered successfully. Please Login to continue."</li>
                </ul>
            </div>
            <div>
                <h4>How to update profile?</h4>
                <li>On Header bar, click to icon avatar </li>
            </div>
        </div>
    </div>
  )
}

export default UseAccount