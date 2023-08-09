import { useEffect } from 'react'
import { withRouter } from './withRouter'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthVerify = (props) => {
    let location = props.router.location
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            const decodedJwt = jwtDecode(localStorage.getItem('userToken'))
            if (decodedJwt.exp * 1000 < Date.now()) {
                props.logOut()
                navigate('/')
                window.location.reload()
            }
        }
    }, [location, props])

    return <div></div>
}

export default withRouter(AuthVerify)
