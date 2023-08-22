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
                        <a className="footer-link" href="privacy">
                            Privacy
                        </a>
                        <a className="footer-link" href="term">
                            Terms
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
                            <h5>About us</h5>
                            <a className="siteFooter-sectionLink" href="#">
                                About Nihongo Level Up
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                                Careers
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                                Advertise with us
                            </a>
                        </div>
                        <div className="d-flex flex-column col">
                            <h5>For Learners</h5>
                            <a className="siteFooter-sectionLink" href="#">
                                Flashcards
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                                Learn
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                                Dictionary
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                                Translate
                            </a>
                        </div>
                        <div className="d-flex flex-column col">
                            <h5>For Tutors</h5>
                            <a className="siteFooter-sectionLink" href="#">
                                Classes
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                                Checkpoint
                            </a>
                        </div>
                        <div className="d-flex flex-column col">
                            <h5>Resources</h5>
                            <a className="siteFooter-sectionLink" href="#">
                                Help centre
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                                Sign up
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                                Honour Code
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                                Community Guidelines
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                                Privacy
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                                Terms
                            </a>
                            <a className="siteFooter-sectionLink" href="#">
                                Ad and Cookie Policy
                            </a>
                        </div>
                        <div className="d-flex flex-column col">
                            <h5>Language</h5>
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
