import { useNavigate } from 'react-router-dom'

import illustration from '../../assets/images/bye.jpg'
import './AccountDeleted.css'
import { useEffect } from 'react'

const AccountDeleted = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!sessionStorage.getItem('isAccountDeleted')) {
            navigate('/')
        } else {
            sessionStorage.clear()
        }
    }, [])

    return (
        <div
            className="pt-5 accountDeleted d-flex flex-column align-items-center"
            style={{
                backgroundImage: `url(${illustration})`,
                minHeight: '90vh',
            }}
        >
            <h1>Account Deleted</h1>
            <p>
                Your account has been completely deleted and you have been
                logged out.
            </p>
            <p>We are sorry to see you leave.</p>
            <p>You are always welcome to join Nihongo Level Up again.</p>
            <div>
                <button
                    className="btn btn-info mt-5 px-5"
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
export default AccountDeleted
