import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { getUser } from '../../features/user/userAction'
import UserService from '../../services/UserService'
import { useTranslation } from 'react-i18next'

const VerifyAccount = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()
    const { userToken } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(true)
    const { userLanguage } = useSelector((state) => state.user)
    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (!searchParams.get('token')) {
            setLoading(false)
            navigate('/')
        }
    }, [])

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                await UserService.verifyAccount(searchParams.get('token'))
                dispatch(getUser(userToken))
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
                    <span className="visually-hidden">{t('loading')}...</span>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>{t('verify')}</h1>
                <p>
                {t('msg6')}.
                </p>
                <div>
                    <button
                        className="btn btn-info mt-4 px-5"
                        onClick={() => {
                            navigate('/')
                        }}
                    >
                        {t('goToHome')}
                    </button>
                </div>
            </div>
        )
    }
}
export default VerifyAccount
