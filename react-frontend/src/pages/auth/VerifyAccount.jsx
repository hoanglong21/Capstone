import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { getUser } from '../../features/user/userAction'
import UserService from '../../services/UserService'

const VerifyAccount = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userToken } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(true)

    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (!searchParams.get('token')) {
            setLoading(false)
            navigate('/')
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                await UserService.verifyAccount(searchParams.get('token'))
                dispatch(getUser(userToken))
                sessionStorage.setItem('verifyAcc', 'true')
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
            setLoading(false)
        }
        if (userToken && searchParams.get('token')) {
            fetchData()
        } else {
            setLoading(false)
        }
    }, [userToken])

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Verification Success</h1>
                <p>
                    Thank you, your account has been verified. Your account is
                    now active.
                </p>
                <div>
                    <button
                        className="btn btn-info mt-4 px-5"
                        onClick={() => {
                            navigate('/')
                        }}
                    >
                        Go to home
                    </button>
                </div>
            </div>
        )
    }
}
export default VerifyAccount
