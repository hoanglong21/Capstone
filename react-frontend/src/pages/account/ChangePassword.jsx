import FormStyles from '../../assets/styles/Form.module.css'

const ChangePassword = () => {
    return (
        <div className="mx-5 ps-3 pe-5">
            <h4>Change your password</h4>
            <form className="mt-4">
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
            </form>
        </div>
    )
}
export default ChangePassword
