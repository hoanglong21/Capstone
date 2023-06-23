import { Link } from 'react-router-dom'
import FormStyles from '../../assets/styles/Form.module.css'

const ChangePassword = () => {
    return (
        <div className="mx-5 ps-3 pe-5">
            <h4>Change your password</h4>
            <form className="mt-5">
                <div className="form-group mb-3">
                    <label className={FormStyles.formLabel}>
                        Current Password
                    </label>
                    <input
                        id="current"
                        name="current"
                        type="password"
                        className={`form-control ${FormStyles.formControl}`}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label className={FormStyles.formLabel}>New Password</label>
                    <input
                        id="new"
                        name="new"
                        type="password"
                        className={`form-control ${FormStyles.formControl}`}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label className={FormStyles.formLabel}>
                        Confirm Password
                    </label>
                    <input
                        id="confirm"
                        name="confirm"
                        type="password"
                        className={`form-control ${FormStyles.formControl}`}
                        required
                    />
                </div>
                <button className="btn btn-primary px-4 mt-1">Save</button>
                <p className="mt-3">
                    If you forgot your password, you can{' '}
                    <Link
                        to=""
                        className="link-primary link-underline-opacity-0 link-underline-opacity-75-hover"
                    >
                        Reset your password
                    </Link>
                    .
                </p>
            </form>
        </div>
    )
}
export default ChangePassword
