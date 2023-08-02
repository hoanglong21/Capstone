import { Outlet } from 'react-router-dom'

import logo from '../../assets/images/logo-1.png'
import "./auth.css"

const AuthLayout = () => {
    return (
        <div className="bg-white p-5">
            <div className="row px-4">
                <div className="col-md-6 col-sm-6 d-flex align-items-start">
                    <img src={logo} className="w-100" alt="logo" />
                </div>
                <div className="col-md-6 col-sm-6">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default AuthLayout
