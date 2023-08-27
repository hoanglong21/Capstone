import { NavLink, Outlet, useSearchParams } from 'react-router-dom'
import './trash.css'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const Trash = () => {
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])
    
    return (
        <div className="flex-grow-1">
            <div className="trash_container">
                <h3>{t('trassh')}</h3>
                <p>{t('msg41')}.</p>
                <div className="mainClass_navbar mt-3">
                    <ul className="nav">
                        <li>
                            <NavLink
                                to="sets"
                                className={
                                    'mainClass_navlink ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <span className="align-middle">
                                    {t('studySet')}
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="classes"
                                end
                                className={
                                    'mainClass_navlink ' +
                                    (({ isActive }) =>
                                        isActive ? 'active' : '')
                                }
                            >
                                <span className="align-middle">
                                    {t('class')}
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <Outlet />
            </div>
        </div>
    )
}
export default Trash
