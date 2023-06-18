import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import illustration from '../../../assets/images/access-denied_illustration.png'
import './ProtectedRoute.css'
import { useEffect } from 'react'
import { getUser } from '../../../features/user/userAction'

const ProtectedRoute = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    useEffect(() => {
        if (userToken) {
            dispatch(getUser(userToken))
        }
    }, [dispatch, userToken])

    if (!userInfo) {
        console.log(userInfo)
        return (
            <div className="d-flex justify-content-center bg-white">
                <div className="col">
                    <img className="w-100" src={illustration} alt="" />
                </div>
                <div className="unauthorize col-6 p-5 d-flex flex-column">
                    <h1 className="my-5">Sorry!</h1>
                    <span>This page is not publically available</span>
                    <span>
                        To access it please{' '}
                        <NavLink to="/login" className="nav-link">
                            Login
                        </NavLink>{' '}
                        first.
                    </span>
                    <div>
                        <button
                            className="btn btn-info mt-5 px-5"
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            Return home
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // returns child route elements
    return <Outlet />
}
export default ProtectedRoute
