import { useEffect } from 'react'
import { withRouter } from './withRouter'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'

const AuthVerify = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let location = props.router.location

    useEffect(() => {
        const token = localStorage.getItem('userToken')
        if (token) {
            const decodedJwt = jwtDecode(token)
            if (decodedJwt.exp * 1000 < Date.now()) {
                dispatch(logout())
                navigate('/')
            }
        }
    }, [location])

    return <div></div>
}

export default withRouter(AuthVerify)
