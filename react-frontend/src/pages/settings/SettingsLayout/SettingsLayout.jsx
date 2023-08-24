import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

import UserService from '../../../services/UserService'

import { WarningSolidIcon } from '../../../components/icons'
import verifyAcc from '../../../assets/images/verify_account.png'
import './SettingsLayout.css'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const AccountLayout = () => {
    const { userInfo } = useSelector((state) => state.user)

    const [showVerifyModal, setShowVerifyModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    const sendVerifyAcc = async () => {
        setLoading(true)
        try {
            await UserService.sendVerificationEmail(userInfo?.username)
            setShowVerifyModal(true)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    return (
        <div className="container mt-4 mb-5">
            <h3 className="setting-h3">{t('accSetting')}</h3>
            {userInfo.status === 'pending' && (
                <div
                    className="alert alert-warning d-flex align-items-center mt-3"
                    role="alert"
                >
                    <WarningSolidIcon size="3rem" />
                    <div className="flex-fill d-flex flex-column ms-2">
                        <h6 className="alert-heading mb-0">{t('accVer')}!</h6>
                        <div>{t('msg59')}.</div>
                    </div>
                    <button
                        className="btn btn-warning mt-1"
                        style={{ minWidth: '7rem' }}
                        disabled={loading}
                        onClick={sendVerifyAcc}
                    >
                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <div
                                    className="spinner-border"
                                    style={{
                                        width: '1.5rem',
                                        height: '1.5rem',
                                    }}
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        ) : (
                            t('verifyNow')
                        )}
                    </button>
                </div>
            )}
            <div className="card-account__container">
                <div className="row">
                    <div className="card-account__sidebar flex-column border-end pe-4 setting-account-col-4 col-lg-3 col-xxl-2">
                        <NavLink
                            className={
                                'card-account__sidebar-link mb-2 ' +
                                +(({ isActive }) => (isActive ? 'active' : ''))
                            }
                            end
                            to="."
                        >
                            {t('myPro')}
                        </NavLink>
                        <NavLink
                            className={
                                'card-account__sidebar-link mb-2 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                            to="notification"
                        >
                            {t('noti')}
                        </NavLink>
                        <NavLink
                            to="change-language"
                            className={
                                'card-account__sidebar-link mb-2 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            {t('language')}
                        </NavLink>
                        <NavLink
                            to="change-password"
                            className={
                                'card-account__sidebar-link mb-2 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            {t('changePass')}
                        </NavLink>
                        <NavLink
                            to="delete-account"
                            className={
                                'card-account__sidebar-link card-account__sidebar-link--warning mt-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            {t('delete')} {t('account')}
                        </NavLink>
                    </div>
                    <div className="card-account__body col">
                        <Outlet />
                    </div>
                </div>
            </div>
            {/* send verify modal */}
            <Modal
                show={showVerifyModal}
                onHide={() => {
                    setShowVerifyModal(false)
                }}
            >
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>{t('msg60')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <img src={verifyAcc} className="verifyAcc_img" />
                    </div>
                    <p className="mt-3 mb-1">
                        {t('msg62')} {userInfo?.email} {t('msg63')}.
                    </p>
                    <p className="mt-1">
                        <a
                            href=""
                            onClick={(event) => {
                                event.preventDefault()
                                setShowVerifyModal(false)
                                sendVerifyAcc()
                            }}
                        >
                            {t('click')}
                        </a>{' '}
                        {t('msg61')}.
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default AccountLayout
