import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { getUser } from '../../features/user/userAction'

const VerifyAccount = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userToken } = useSelector((state) => state.auth)

    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (!searchParams.get('token')) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        if (userToken && searchParams.get('token')) {
            dispatch(getUser(userToken))
        }
    }, [userToken])

    return (
        <div>
            <h1>Verification Success</h1>
            <p>
                Thank you, your account has been verified. Your account is now
                active.
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
export default VerifyAccount
