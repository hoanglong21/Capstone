import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import UserSettingService from '../../services/UserSettingService'

import FormStyles from '../../assets/styles/Form.module.css'
import './settings.css'
import { changeLanguage } from '../../features/user/userSlice'
import { useTranslation } from 'react-i18next'

const Language = () => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    const { userInfo } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { userLanguage } = useSelector((state) => state.user)

    const [language, setLanguage] = useState('en')

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    useEffect(() => {
        const fetchData = async () => {
            setLanguage(userLanguage)
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [userInfo, userLanguage])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                2,
                language
            )
            dispatch(changeLanguage(language))
            i18n.changeLanguage(language)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    return (
        <div className="settings-lang">
            <h4 className="settings-h4">{t('chooseLang')}</h4>
            <p className="settings-p">{t('msg51')}</p>
            <form className="mt-4 needs-validation" noValidate>
                <select
                    className={`form-select ${FormStyles.formSelect} mb-1`}
                    aria-label="select language"
                    value={language || 'en'}
                    onChange={(event) => {
                        setLanguage(event.target.value)
                    }}
                >
                    <option value="en">English</option>
                    <option value="vi">Tiếng Việt</option>
                    <option value="ja">日本語</option>
                </select>
                <button
                    className="btn btn-primary px-4 mt-4"
                    onClick={handleSubmit}
                >
                    {t('changeLang')}
                </button>
            </form>
        </div>
    )
}
export default Language
