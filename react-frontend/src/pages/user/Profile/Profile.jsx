import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { updateUser } from '../../../features/user/userAction'

import avatar from '../../../assets/images/avatar-default.jpg'
import { EditIcon } from '../../../components/icons'
import FormStyles from '../../../assets/styles/Form.module.css'
import './Profile.css'

const Profile = () => {
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.user)

    const [newUser, setNewUser] = useState({})
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        setNewUser({ ...userInfo })
    }, [userInfo])

    const handleChange = (event) => {
        setNewUser({ ...newUser, [event.target.name]: event.target.value })
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
        setError('')
        setSuccess(false)

        form.classList.add('was-validated')

        if (!form.checkValidity()) {
            if (!newUser.first_name) {
                setError("First name can't be blank.")
                firstNameEl.classList.add('is_invalid')
            } else if (!newUser.last_name) {
                setError("Last name can't be blank.")
                lastNameEl.classList.add('is_invalid')
            }
            console.log(newUser)
        } else {
            dispatch(updateUser(newUser))
            setSuccess(true)
            // auto hide after 5s
            setTimeout(function () {
                setSuccess(false)
            }, 5000)
        }
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
        <div className="mx-5 px-3">
            <h4>My Profile</h4>
            <form className="row g-4 mt-3 needs-validation" noValidate>
                {/* error message */}
                {error && (
                    <div
                        className="alert alert-danger"
                        role="alert"
                        dangerouslySetInnerHTML={{ __html: error }}
                    ></div>
                )}
                {/* success message */}
                {success && (
                    <div className="alert alert-success" role="alert">
                        Your changes have been successfully saved!
                    </div>
                )}
                {/* avatar */}
                <div className="col-12">
                    <div className="userAvatar mx-auto mb-2">
                        <img src={avatar} alt="" className="h-100" />
                        <button type="button" className="btn btn-primary p-0">
                            <EditIcon size="0.75rem" />
                        </button>
                    </div>
                </div>
                {/* Username */}
                <div className="form-group col-6">
                    <label className={FormStyles.formLabel}>Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={newUser.username}
                        className="form-control-plaintext p-0"
                        readOnly
                        required
                    />
                </div>
                {/* Email */}
                <div className="form-group col-6">
                    <label className={FormStyles.formLabel}>Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={newUser.email}
                        className="form-control-plaintext p-0"
                        readOnly
                        required
                    />
                </div>
                {/* First name */}
                <div className="form-group col-6">
                    <label className={FormStyles.formLabel}>First Name</label>
                    <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        value={newUser.first_name}
                        className={`form-control ${FormStyles.formControl}`}
                        required
                        onChange={handleChange}
                    />
                </div>
                {/* Last name */}
                <div className="form-group col-6">
                    <label className={FormStyles.formLabel}>Last Name</label>
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        value={newUser.last_name}
                        className={`form-control ${FormStyles.formControl}`}
                        required
                        onChange={handleChange}
                    />
                </div>
                {/* DOB  */}
                <div className="form-group col-6">
                    <label className={FormStyles.formLabel}>
                        Date of Birth
                    </label>
                    <input
                        id="dob"
                        name="dob"
                        type="date"
                        value={formatDate(newUser.dob)}
                        className={`form-control ${FormStyles.formControl}`}
                        onChange={handleChange}
                    />
                </div>
                {/* Phone */}
                <div className="form-group col-6">
                    <label className={FormStyles.formLabel}>Phone</label>
                    <input
                        id="phone"
                        name="phone"
                        type="phone"
                        value={newUser.phone}
                        className={`form-control ${FormStyles.formControl}`}
                        onChange={handleChange}
                    />
                </div>
                {/* Gender */}
                <div className="form-group col-12">
                    <label className={`d-block ${FormStyles.formLabel}`}>
                        Gender
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
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="male">
                            Male
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
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="female">
                            Female
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
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="other">
                            Other
                        </label>
                    </div>
                </div>
                {/* Address */}
                <div className="form-group col-12">
                    <label className={FormStyles.formLabel}>Address</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={newUser.address}
                        className={`form-control ${FormStyles.formControl}`}
                        onChange={handleChange}
                    />
                </div>
                {/* Bio */}
                <div className="form-group col-12">
                    <label className={FormStyles.formLabel}>Bio</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={newUser.bio}
                        className={`form-control ${FormStyles.formControl}`}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <button
                        className="btn btn-primary px-4 mt-1"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
export default Profile
