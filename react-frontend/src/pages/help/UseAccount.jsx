import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/styles/Helpcenter.css'
import register from '../../assets/images/register.png'

function UseAccount() {
    return (
        <div className="container">
            <div className="row useaccount mt-4">
                <div className="col-8">
                    <h4>Create Account ?</h4>
                    <ul className="useaccount-ul">
                        <li>
                            User need to access the <Link>Register</Link> to
                            create account.
                        </li>
                        <li>
                            On the Register page, user need fill all information
                            display on the screen to create.
                        </li>
                        <li>
                            All information is validated and user must follow.
                        </li>
                        <li>
                            After fill, please click on{' '}
                            <strong>"Register"</strong> button after that the
                            screen show message "Registered successfully. Please
                            Login to continue."
                        </li>
                    </ul>
                </div>
                <div className="col-4">
                    <img
                        src={register}
                        alt=""
                        style={{ width: '300px', height: '200px' }}
                    />
                </div>
            </div>
            <div>
                <h4>Update profile?</h4>
                <ul className="useaccount-ul">
                    <li>
                        On Header bar, when user click to icon avatar, pop-up
                        settings will display. User choose{' '}
                        <strong>"Settings"</strong> on the screen.
                    </li>
                    <li>
                        Account profile display with all information user
                        registered.
                    </li>
                    <li>
                        User can update related information. And click to{' '}
                        <strong>"Save"</strong> to save all data.
                    </li>
                </ul>
            </div>
            <div>
                <h4>Change Language?</h4>
                <ul className="useaccount-ul">
                    <li>
                        In <strong>"Settings"</strong>, user choose{' '}
                        <strong>"Language"</strong> in left sidebar.
                    </li>
                    <li>
                        If the user wants the website to display in any
                        language, then select that language. And then press{' '}
                        <strong>"Change your language"</strong> to save.
                    </li>
                </ul>
            </div>
            <div>
                <h4>Change your Password?</h4>
                <ul className="useaccount-ul">
                    <li>
                        In <strong>"Settings"</strong>, user choose{' '}
                        <strong>"Change Password"</strong> in left sidebar.
                    </li>
                    <li>
                        User must enter current password, new password and
                        confirm new password to be able to change password.
                    </li>
                    <li>
                        After enter all field, click <strong>"Save"</strong> to
                        change successfully.
                    </li>
                </ul>
            </div>
            <div>
                <h4>Reset Password?</h4>
                <ul className="useaccount-ul">
                    <li>
                        In <strong>"Change Password"</strong> screen, user click
                        to <strong>"Reset your password"</strong>.
                    </li>
                    <li>
                        The system show screen reset password and user click to
                        button <strong>"Submit"</strong>.
                    </li>
                    <li>
                        After click button <strong>"Submit"</strong>, the system
                        show message "Check your mail".
                    </li>
                    <li>
                        User need to go to mail and read mail. User can click
                        button <strong>"Reset Password"</strong> to reset.
                    </li>
                    <li>
                        In the redirected page, user must enter new password and
                        confirm password.
                    </li>
                    <li>Now, user reset password successfully.</li>
                </ul>
            </div>
            <div>
                <h4>Delete Account?</h4>
                <ul className="useaccount-ul">
                    <li>
                        In <strong>"Settings"</strong>, user choose{' '}
                        <strong>"Delete Account"</strong> in left sidebar.
                    </li>
                    <li>
                        User need to enter correct current password to delete
                        account.
                    </li>
                    <li>
                        Click to button <strong>"Delete Account"</strong> to
                        delete.
                    </li>
                </ul>
            </div>
            <div className="useaccount">
                <h4>Study Flashcard?</h4>
                <ul className="useaccount-ul">
                    <li>
                        User can select multiple types of study in flashcards to
                        display.
                    </li>
                    <li>
                        After that, press the{' '}
                        <strong>"Create new flashcards"</strong> button to get
                        started.
                    </li>
                </ul>
            </div>
            <div className="useaccount">
                <h4>Do Quiz?</h4>
                <ul className="useaccount-ul">
                    <li>User can select multiple types of quiz to display.</li>
                    <li>
                        After that, press the <strong>"Create new quiz"</strong>{' '}
                        button to get started.
                    </li>
                </ul>
            </div>
            <div className="useaccount">
                <h4>Learn?</h4>
                <ul className="useaccount-ul">
                    <li>User can select multiple types of quiz to display.</li>
                    <li>
                        After that, press the <strong>"Start"</strong> button to
                        get started.
                    </li>
                </ul>
            </div>
            <div className="useaccount">
                <h4>Create Class?</h4>
                <ul className="useaccount-ul">
                    <li>
                        With Tutor access, user can create class in header
                        sidebar with icon <strong>"+"</strong> button.
                    </li>
                    <li>
                        Select <strong>"Create Class"</strong>.
                    </li>
                    <li>
                        Fill all field requirement on the screen and then click{' '}
                        <strong>"Create"</strong> button.
                    </li>
                    <li>The class created will be displayed on the screen</li>
                </ul>
            </div>
            <div className="useaccount">
                <h4>Join Class?</h4>
                <ul className="useaccount-ul">
                    <li>
                        With Tutor or Learner access, user can join class in
                        header sidebar with icon <strong>"+"</strong> button.
                    </li>
                    <li>
                        Select <strong>"Join Class"</strong>.
                    </li>
                    <li>Input class code.</li>
                    <li>
                        Then, click <strong>"Join class"</strong> to join.
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UseAccount
