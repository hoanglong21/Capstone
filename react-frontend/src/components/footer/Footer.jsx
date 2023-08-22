import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

import UserSettingService from '../../services/UserSettingService'
import { changeLanguage } from '../../features/user/userSlice'

import './Footer.css'

const Footer = () => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    const { userToken } = useSelector((state) => state.auth)
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

    const handleSubmit = async (value) => {
        try {
            await UserSettingService.updateCustomSettings(userInfo.id, 2, value)
            dispatch(changeLanguage(value))
            i18n.changeLanguage(value)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    return (
        <footer>
            {userToken ? (
                <div className="footer border-top p-3 px-4 d-flex justify-content-between">
                    <div className="d-flex column-gap-3">
                        <a className="footer-link" href="/privacy">
                        {t('privacy')}
                        </a>
                        <a className="footer-link" href="/term">
                        {t('terms')}
                        </a>
                    </div>
                    <div>
                        <select
                            className="footer-select"
                            value={language || 'en'}
                            onChange={(event) => {
                                setLanguage(event.target.value)
                                handleSubmit(event.target.value)
                            }}
                        >
                            <option value="en">English</option>
                            <option value="vi">Tiếng Việt</option>
                            <option value="ja">日本語</option>
                        </select>
                    </div>
                </div>
            ) : (
                <div className="siteFooter">
                    <div className="siteFooter-top d-flex row">
                        <div className="d-flex flex-column col">
                            <h5> {t('aboutUs')}</h5>
                            <a className="siteFooter-sectionLink" href="#">
                            {t('about')} Nihongo Level Up      
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                            {t('careers')}
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                            {t('advertiseWithUs')}
                            </a>
                        </div>
                        <div className="d-flex flex-column col">
                            <h5> {t('forLearners')}</h5>
                            <a className="siteFooter-sectionLink" href="#">
                            {t('flashcard')}
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                            {t('learn')}
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                            {t('dictionary')}
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                            {t('translate')}
                            </a>
                        </div>
                        <div className="d-flex flex-column col">
                            <h5> {t('forTutor')}</h5>
                            <a className="siteFooter-sectionLink" href="#">
                            {t('class')}
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                            {t('checkpoint')}
                            </a>
                        </div>
                        <div className="d-flex flex-column col">
                            <h5> {t('resources')}</h5>
                            <a className="siteFooter-sectionLink" href="#">
                            {t('helpcenter')}
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                            {t('signup')}
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                            {t('honourCode')}
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                            {t('communityGuidelines')}
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                            {t('privacy')}
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                            {t('terms')}
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                            {t('adandCookiePolicy')}
                            </a>
                        </div>
                        <div className="d-flex flex-column col">
                            <h5> {t('language')}</h5>
                            <select className="siteFooter-select" name="" id="">
                                <option value="">English</option>
                                <option value="">Tiếng Việt</option>
                                <option value="">日本語</option>
                            </select>
                        </div>
                    </div>
                    <div className="siteFooter-bottom">
                        © 2023 Nihongo Level Up Team
                    </div>
                </div>
            )}
        </footer>
    )
}
export default Footer
