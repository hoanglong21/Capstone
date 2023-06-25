import avatar from '../../../assets/images/avatar-default.jpg'
import { EditIcon } from '../../../components/icons'
import FormStyles from '../../../assets/styles/Form.module.css'
import './Profile.css'

const Profile = () => {
    return (
        <div className="mx-5 px-3">
            <h4>My Profile</h4>
            <form className="row g-4 mt-4">
                <div className="col-12">
                    <div className="userAvatar mx-auto">
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
                        value="tuyet"
                        className="form-control-plaintext p-0"
                        readOnly
                        required
                    />
                </div>
                {/* Email */}
                <div className="form-group col-6">
                    <label className={FormStyles.formLabel}>Email</label>
                    <input
                        id="username"
                        name="username"
                        type="email"
                        value="tuyetnta@gmail.com"
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
                        value="Tuyet"
                        className={`form-control ${FormStyles.formControl}`}
                        required
                    />
                </div>
                {/* Last name */}
                <div className="form-group col-6">
                    <label className={FormStyles.formLabel}>Last Name</label>
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        value="Nguyen"
                        className={`form-control ${FormStyles.formControl}`}
                        required
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
                        className={`form-control ${FormStyles.formControl}`}
                    />
                </div>
                {/* Phone */}
                <div className="form-group col-6">
                    <label className={FormStyles.formLabel}>Phone</label>
                    <input
                        id="last_name"
                        name="last_name"
                        type="phone"
                        value="0914065298"
                        className={`form-control ${FormStyles.formControl}`}
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
                            checked
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
                        value="0914065298"
                        className={`form-control ${FormStyles.formControl}`}
                    />
                </div>
                {/* Bio */}
                <div className="form-group col-12">
                    <label className={FormStyles.formLabel}>Bio</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value="0914065298"
                        className={`form-control ${FormStyles.formControl}`}
                    />
                </div>
            </form>
        </div>
    )
}
export default Profile
