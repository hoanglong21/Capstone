import { Link, Outlet } from 'react-router-dom'
import './AccountLayout.css'

const AccountLayout = () => {
    return (
        <div className="container mt-4 mb-5">
            <h3>Account Settings</h3>
            <div className="card-account__container">
                <div className="d-flex">
                    <div className="card-account__sidebar d-flex flex-column border-end pe-4">
                        <Link
                            className="card-account__sidebar-link card-account__sidebar-link--active mb-1"
                            to="."
                        >
                            My Profile
                        </Link>
                        <Link className="card-account__sidebar-link mb-1">
                            Notification
                        </Link>
                        <Link className="card-account__sidebar-link mb-1">
                            Change Password
                        </Link>
                        <Link className="card-account__sidebar-link card-account__sidebar-link--warning">
                            Delete Account
                        </Link>
                    </div>
                    <div className="card-account__body flex-shrink-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AccountLayout
