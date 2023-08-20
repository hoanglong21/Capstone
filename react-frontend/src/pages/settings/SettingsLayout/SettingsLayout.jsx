import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

import UserService from '../../../services/UserService'

import { WarningSolidIcon } from '../../../components/icons'
import verifyAcc from '../../../assets/images/verify_account.png'
import './SettingsLayout.css'

const AccountLayout = () => {
    const { userInfo } = useSelector((state) => state.user)

    const [showVerifyModal, setShowVerifyModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const sendVerifyAcc = async () => {
        setLoading(true)
        try {
            await UserService.sendVerificationEmail(userInfo?.username)
            setShowVerifyModal(true)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    return (
        <div className="container mt-4 mb-5">
            <h3 className="setting-h3">Account Settings</h3>
            {userInfo.status === 'pending' && (
                <div
                    className="alert alert-warning d-flex align-items-center mt-3"
                    role="alert"
                >
                    <WarningSolidIcon size="3rem" />
                    <div className="flex-fill d-flex flex-column ms-2">
                        <h6 className="alert-heading mb-0">
                            Account Not Verified!
                        </h6>
                        <div>
                            Please verify your account in order to change
                            account settings.
                        </div>
                    </div>
                    <button
                        className="btn btn-warning mt-1"
                        style={{ minWidth: '7rem' }}
                        disabled={loading}
                        onClick={sendVerifyAcc}
                    >
                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <div
                                    className="spinner-border"
                                    style={{
                                        width: '1.5rem',
                                        height: '1.5rem',
                                    }}
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        ) : (
                            'Verify now'
                        )}
                    </button>
                </div>
            )}
            <div className="card-account__container">
                <div className="row">
                    <div className="card-account__sidebar flex-column border-end pe-4 setting-account-col-4 col-lg-3 col-xxl-2">
                        <NavLink
                            className={
                                'card-account__sidebar-link mb-2 ' +
                                +(({ isActive }) => (isActive ? 'active' : ''))
                            }
                            end
                            to="."
                        >
                            My Profile
                        </NavLink>
                        <NavLink
                            className={
                                'card-account__sidebar-link mb-2 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                            to="notification"
                        >
                            Notifications
                        </NavLink>
                        <NavLink
                            to="change-language"
                            className={
                                'card-account__sidebar-link mb-2 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            Language
                        </NavLink>
                        <NavLink
                            to="change-password"
                            className={
                                'card-account__sidebar-link mb-2 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            Change Password
                        </NavLink>
                        <NavLink
                            to="delete-account"
                            className={
                                'card-account__sidebar-link card-account__sidebar-link--warning mt-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            Delete Account
                        </NavLink>
                    </div>
                    <div className="card-account__body col">
                        <Outlet />
                    </div>
                </div>
            </div>
            {/* send verify modal */}
            <Modal
                show={showVerifyModal}
                onHide={() => {
                    setShowVerifyModal(false)
                }}
            >
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>Verify your account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <img src={verifyAcc} className="verifyAcc_img" />
                    </div>
                    <p className="mt-3 mb-1">
                        We've send an email to {userInfo?.email} to verify your
                        account.
                    </p>
                    <p className="mt-1">
                        <a
                            href=""
                            onClick={(event) => {
                                event.preventDefault()
                                setShowVerifyModal(false)
                                sendVerifyAcc()
                            }}
                        >
                            Click here
                        </a>{' '}
                        to resend email if you did not receive an email.
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default AccountLayout
