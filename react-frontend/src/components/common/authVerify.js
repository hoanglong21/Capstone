import { useEffect } from 'react'
import { withRouter } from './withRouter'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthVerify = (props) => {
    let location = props.router.location
    const navigate = useNavigate()

    function setCookie(cname, cvalue, exdays) {
        // const d = new Date()
        // console.log(d)
        // d.setUTCHours(23, 59, 59, 999)
        // console.log(d)
        // d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
        // let expires = 'expires=' + d.toUTCString()
        // document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
    }

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
