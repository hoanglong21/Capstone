import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { logout as authLogout } from '../../features/auth/authSlice'
import { logout as userLogout } from '../../features/user/userSlice'

const AdminProtectedRoute = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    useEffect(() => {
        if (!userToken) {
            dispatch(userLogout())
            dispatch(authLogout())
            navigate('/')
        }
    }, [userToken])

    useEffect(() => {
        if (userInfo?.role !== 'ROLE_ADMIN') {
            navigate('/')
        }
    }, [userInfo])

    // returns child route elements
    return <Outlet />
}
export default AdminProtectedRoute
