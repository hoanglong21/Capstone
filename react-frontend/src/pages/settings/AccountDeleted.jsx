import { useNavigate } from 'react-router-dom'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const AccountDeleted = () => {
    const navigate = useNavigate()
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])
    
    useEffect(() => {
        if (!sessionStorage.getItem('isAccountDeleted')) {
            navigate('/')
        } else {
            sessionStorage.clear()
        }
    }, [])

    return (
        <div>
            <h1>
                {t('account')} {t('delete')}
            </h1>
            <p>{t('msg56')}</p>
            <p>{t('msg57')}.</p>
            <p>{t('msg58')}.</p>
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
export default AccountDeleted
