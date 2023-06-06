import { useState } from 'react'
import styles from '../assets/styles/Form.module.css'

const CreateStudySet = () => {
    const [studySet, setStudySet] = useState({
        title: '',
        description: '',
        status: false,
    })

    return (
        <div className="container mt-4">
            {/* Heading */}
            <div className="d-flex justify-content-between divider pb-2 px-3">
                <h3 className="fw-bold">Create a new study set</h3>
                <button type="button" class="btn btn-primary">
                    Create
                </button>
            </div>
            <form className="m-2">
                {/* Study set */}
                <div className="form-group mb-3">
                    <label className={styles.formLabel}>Title</label>
                    <input
                        placeholder="Enter your title"
                        name="title"
                        className={`form-control ${styles.formControl}`}
                        value={studySet.title}
                    />
                </div>
                <div className="form-group mb-3">
                    <label className={styles.formLabel}>Access</label>
                    <select
                        class={`form-select ${styles.formSelect}`}
                        aria-label="access"
                    >
                        <option value="0">Public</option>
                        <option value="1">Private</option>
                    </select>
                </div>
            </form>
        </div>
    )
}
export default CreateStudySet
