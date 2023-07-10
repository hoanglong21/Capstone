import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

import './ProtectedRoute.css'
import { useEffect } from 'react'

const ProtectedRoute = () => {
    const navigate = useNavigate()

    const { userToken } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!userToken) {
            navigate('/login')
        }
    }, [userToken])

    // returns child route elements
    return <Outlet />
}
export default ProtectedRoute
