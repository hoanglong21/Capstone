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
    const { userLanguage } = useSelector((state) => state.user)

    const [language, setLanguage] = useState('en')

    useEffect(() => {
        const fetchData = async () => {
            setLanguage(userLanguage)
            i18n.changeLanguage(language)
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
            <h4 className="settings-h4">Choose your language</h4>
            <p className="settings-p">Adjust the language you see in menu</p>
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
                    Change your language
                </button>
            </form>
        </div>
    )
}
export default Language
