import { NavLink, Outlet } from 'react-router-dom'
import './AccountLayout.css'

const AccountLayout = () => {
    return (
        <div className="container mt-4 mb-5">
            <h3>Account Settings</h3>
            <div className="card-account__container">
                <div className="d-flex">
                    <div className="card-account__sidebar d-flex flex-column border-end pe-4">
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
                            Notification
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
                        <a className="card-account__sidebar-link card-account__sidebar-link--warning mt-3">
                            Delete Account
                        </a>
                    </div>
                    <div className="card-account__body flex-grow-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AccountLayout
