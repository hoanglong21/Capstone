import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'

import {
    deleteFileByUrl,
    getAll,
    uploadFile,
} from '../../../features/fileManagement'
import { updateUser } from '../../../features/user/userAction'
import { reset } from '../../../features/user/userSlice'

import { DeleteIcon, EditIcon } from '../../../components/icons'
import defaultAvatar from '../../../assets/images/default_avatar.png'
import FormStyles from '../../../assets/styles/Form.module.css'
import './Profile.css'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo, error, success } = useSelector((state) => state.user)

    const [newUser, setNewUser] = useState({})
    const [errorMess, setErrorMess] = useState('')
    const [successMess, setSuccessMess] = useState(false)
    const [defaultAvatars, setDefaultAvatars] = useState([])
    const [userAvatars, setUserAvatars] = useState([])
    const [loading, setLoading] = useState(false)

    const [showAvatarModal, setShowAvatarModal] = useState(false)
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    // fetch user state
    useEffect(() => {
        setNewUser({ ...userInfo })
        if (userInfo?.dob) {
            document.getElementById('dobProfile').value = formatDate(userInfo?.dob)
        }
    }, [userInfo])

    // fetch avatar
    useEffect(() => {
        async function fetchAvatar() {
            setLoading(true)
            try {
                // fetch default avatar
                const tempDefault = await getAll('system/default_avatar')
                setDefaultAvatars(tempDefault)
                // fetch user avatar
                const tempUser = await getAll(
                    `files/${newUser.username}/avatar`
                )
                setUserAvatars(tempUser)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
                if (
                    error.message.includes('not exist') ||
                    error?.response.data.includes('not exist')
                ) {
                    navigate('/notFound')
                }
            }
            setLoading(false)
        }
        fetchAvatar()
    }, [newUser.username])

    // reset state
    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    // hide success mess
    useEffect(() => {
        if (success) {
            setSuccessMess(true)
            setTimeout(function () {
                setSuccessMess(false)
            }, 5000)
        }
    }, [success])

    const handleChange = (event) => {
        setNewUser({ ...newUser, [event.target.name]: event.target.value })
    }

    const handleSelectAvatar = (avatarURL) => () => {
        setNewUser({ ...newUser, avatar: avatarURL })
        setShowAvatarModal(false)
    }

    const handleUploadAvatar = async (event) => {
        const file = event.target.files[0]
        if (file) {
            setLoading(true)
            try {
                await uploadFile(file, `${newUser.username}/avatar`)
                // reload userAvatars
                const tempUser = await getAll(
                    `files/${newUser.username}/avatar`
                )
                setUserAvatars(tempUser)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
            setLoading(false)
        }
    }

    const handleDeleteAvatar = (avatarUrl) => async () => {
        setLoading(true)
        try {
            await deleteFileByUrl(avatarUrl, `${newUser.username}/avatar`)
            // reload userAvatars
            const tempUser = await getAll(`files/${newUser.username}/avatar`)
            setUserAvatars(tempUser)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        var form = document.querySelector('.needs-validation')
        const firstNameEl = document.getElementById('first_name')
        const lastNameEl = document.getElementById('last_name')
        // clear validation
        form.classList.remove('was-validated')
        firstNameEl.classList.remove('is_invalid')
        lastNameEl.classList.remove('is_invalid')
        setErrorMess('')
        setSuccessMess(false)

        form.classList.add('was-validated')
        if (!newUser.first_name) {
            setErrorMess("First name can't be blank.")
            firstNameEl.classList.add('is_invalid')
        } else if (!newUser.last_name) {
            setErrorMess("Last name can't be blank.")
            lastNameEl.classList.add('is_invalid')
        } else {
            dispatch(updateUser(newUser))
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0')
    }

    function formatDate(timestamp) {
        let date = new Date(timestamp)
        return (
            date.getFullYear() +
            '-' +
            padTo2Digits(date.getMonth() + 1) +
            '-' +
            padTo2Digits(date.getDate())
        )
    }

    return (
        <div className="setting-profile">
            <h4 className="my-profile">{t('myPro')}</h4>
            <form className="row g-4 needs-validation" noValidate>
                {/* error message */}
                {(errorMess || error) && (
                    <div
                        className="alert alert-danger col-12 mb-0"
                        role="alert"
                        dangerouslySetInnerHTML={{ __html: errorMess || error }}
                    ></div>
                )}
                {/* successMess message */}
                {successMess && (
                    <div
                        className="alert alert-success col-12 mb-0"
                        role="alert"
                    >
                        {t('msg44')}!
                    </div>
                )}
                {/* avatar */}
                <div className="col-12">
                    <div className="userAvatar mx-auto">
                        <img
                            src={
                                newUser.avatar ? newUser.avatar : defaultAvatar
                            }
                            alt=""
                            className="h-100"
                        />
                        <button
                            type="button"
                            className="btn btn-primary p-0"
                            disabled={userInfo?.status === 'pending'}
                            onClick={() => setShowAvatarModal(true)}
                        >
                            <EditIcon size="0.75rem" />
                        </button>
                    </div>
                </div>
                {/* Username */}
                <div className="form-group profile-col-6">
                    <label className={FormStyles.formLabel}>
                        {t('username')}
                    </label>
                    <input
                        id="username"
                        className="form-control-plaintext p-0"
                        name="username"
                        type="text"
                        value={newUser.username || ''}
                        disabled={userInfo?.status === 'pending'}
                        readOnly
                    />
                </div>
                {/* Email */}
                <div className="form-group profile-col-6">
                    <label className={FormStyles.formLabel}>{t('email')}</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={newUser.email || ''}
                        className="form-control-plaintext p-0"
                        disabled={userInfo?.status === 'pending'}
                        readOnly
                    />
                </div>
                {/* First name */}
                <div className="form-group profile-col-6">
                    <label className={FormStyles.formLabel}>
                        {t('firstname')}
                    </label>
                    <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        value={newUser.first_name || ''}
                        className={`form-control ${FormStyles.formControl}`}
                        disabled={userInfo?.status === 'pending'}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Last name */}
                <div className="form-group profile-col-6">
                    <label className={FormStyles.formLabel}>
                        {t('lastname')}
                    </label>
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        value={newUser.last_name || ''}
                        className={`form-control ${FormStyles.formControl}`}
                        disabled={userInfo?.status === 'pending'}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* DOB  */}
                <div className="form-group profile-col-6">
                    <label className={FormStyles.formLabel}>{t('dob')}</label>
                    <input
                        id="dobProfile"
                        className={`form-control ${FormStyles.formControl}`}
                        name="dob"
                        type="date"
                        disabled={userInfo?.status === 'pending'}
                        onBlur={handleChange}
                    />
                </div>
                {/* Phone */}
                <div className="form-group profile-col-6">
                    <label className={FormStyles.formLabel}>{t('phone')}</label>
                    <input
                        id="phone"
                        className={`form-control ${FormStyles.formControl}`}
                        name="phone"
                        type="phone"
                        value={newUser.phone || ''}
                        disabled={userInfo?.status === 'pending'}
                        onChange={handleChange}
                    />
                </div>
                {/* Gender */}
                <div className="form-group profile-col-6">
                    <label className={`d-block ${FormStyles.formLabel}`}>
                        {t('gender')}
                    </label>
                    <div className="form-check form-check-inline me-5">
                        <input
                            type="radio"
                            className={`form-check-input ${FormStyles.formCheckInput}`}
                            name="gender"
                            id="male"
                            value="male"
                            autoComplete="off"
                            checked={newUser.gender === 'male' ? true : false}
                            disabled={userInfo?.status === 'pending'}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="male">
                            {t('male')}
                        </label>
                    </div>
                    <div className="form-check form-check-inline me-5">
                        <input
                            type="radio"
                            className={`form-check-input ${FormStyles.formCheckInput}`}
                            name="gender"
                            id="female"
                            value="female"
                            autoComplete="off"
                            checked={newUser.gender === 'female' ? true : false}
                            disabled={userInfo?.status === 'pending'}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="female">
                            {t('female')}
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className={`form-check-input ${FormStyles.formCheckInput}`}
                            name="gender"
                            id="other"
                            value="other"
                            autoComplete="off"
                            checked={newUser.gender === 'other' ? true : false}
                            disabled={userInfo?.status === 'pending'}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="other">
                            {t('other')}
                        </label>
                    </div>
                </div>
                {/* Role */}
                <div className="form-group profile-col-6">
                    <label className={FormStyles.formLabel}>{t('role')}</label>
                    <input
                        name="role"
                        type="text"
                        value={
                            newUser.role === 'ROLE_LEARNER'
                                ? 'Learner'
                                : newUser.role === 'ROLE_TUTOR'
                                ? 'Tutor'
                                : 'Admin'
                        }
                        className="form-control-plaintext p-0"
                        disabled={userInfo?.status === 'pending'}
                        readOnly
                    />
                </div>
                {/* Address */}
                <div className="form-group col-12">
                    <label className={FormStyles.formLabel}>
                        {t('address')}
                    </label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={newUser.address || ''}
                        className={`form-control ${FormStyles.formControl}`}
                        disabled={userInfo?.status === 'pending'}
                        onChange={handleChange}
                    />
                </div>
                {/* Bio */}
                <div className="form-group col-12">
                    <label className={FormStyles.formLabel}>{t('bio')}</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={newUser.bio || ''}
                        className={`form-control ${FormStyles.formControl}`}
                        disabled={userInfo?.status === 'pending'}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <button
                        type='button'
                        className="btn btn-primary px-4 mt-1"
                        disabled={userInfo?.status === 'pending'}
                        onClick={handleSubmit}
                    >
                        {t('save')}
                    </button>
                </div>
            </form>
            {/* Avatar Modal */}
            <div
                className="avatarModal modal fade"
                id="avatarModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="avatarModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog"></div>
            </div>
            <Modal
                className="avatarModal"
                show={showAvatarModal}
                onHide={() => setShowAvatarModal(false)}
            >
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="d-flex modal-heading justify-content-between align-items-center">
                            <p className="">{t('propic')}</p>
                            <button
                                id="toggleModal"
                                type="button"
                                className="btn-close me-1 mt-1"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="defaultAvatar mt-3 row m-0">
                            {loading ? (
                                <div
                                    className="spinner-border text-secondary mx-auto"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        LoadingUpload...
                                    </span>
                                </div>
                            ) : (
                                <div>
                                    {defaultAvatars.map((avatarURL, index) => (
                                        <div
                                            key={`defaultAvatars${index}`}
                                            className="avatarItem col-1 d-inline"
                                        >
                                            <button
                                                key={avatarURL}
                                                className="btn "
                                                onClick={handleSelectAvatar(
                                                    avatarURL
                                                )}
                                            >
                                                <img src={avatarURL} alt="" />
                                            </button>
                                        </div>
                                    ))}
                                    {userAvatars.map((avatarURL, index) => (
                                        <div
                                            key={`userAvatars${index}`}
                                            className="col-1 avatarItem d-inline"
                                        >
                                            <button
                                                key={avatarURL}
                                                className="btn"
                                                onClick={handleSelectAvatar(
                                                    avatarURL
                                                )}
                                            >
                                                <img src={avatarURL} alt="" />
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-del p-1 rounded-circle"
                                                onClick={handleDeleteAvatar(
                                                    avatarURL
                                                )}
                                            >
                                                <DeleteIcon size="0.85rem" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="col-12 mt-4 p-0 text-center mb-2">
                                <input
                                    type="file"
                                    id="uploadAvatar"
                                    accept="image/*"
                                    name="picture"
                                    className="avatarUpload"
                                    onChange={handleUploadAvatar}
                                />
                                <button className="btn btn-info p-0">
                                    <label htmlFor="uploadAvatar">
                                        {t('ava')}
                                    </label>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default Profile
