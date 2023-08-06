import { useEffect } from 'react'
import { withRouter } from './withRouter'
import jwtDecode from 'jwt-decode'

const AuthVerify = (props) => {
    let location = props.router.location

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            const decodedJwt = jwtDecode(localStorage.getItem('userToken'))
            if (decodedJwt.exp * 1000 < Date.now()) {
                props.logOut()
            }
        }
    }, [location, props])

    return <div></div>
}

export default withRouter(AuthVerify)
