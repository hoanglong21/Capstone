import { useEffect, useState } from 'react'

import styles from '../assets/styles/Form.module.css'
import '../assets/styles/stickyHeader.css'
import { DeleteIcon, MicIcon } from '../components/icons'

import TextEditor from '../components/ui/TextEditor'
import UploadImages from '../components/UploadImages'

const CreateStudySet = () => {
    const [isScroll, setIsScroll] = useState(false)
    const [studySet, setStudySet] = useState({
        user: '',
        title: '',
        description: '',
        isDeleted: false,
        isPublic: false,
        studySetType: 1,
    })
    const [cardList, setCardList] = useState([])

    useEffect(() => {
        const handleScroll = () => {
            setIsScroll(window.scrollY > 96)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleAdd = (event) => {
        let card = { picture: '', audio: '', studySet: '' }
        setCardList([...cardList, card])
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const handleDelete = (event) => {
        var array = [...cardList]
        var index = event.target.closest('.card').id
        array.splice(index, 1)
        setCardList([...array])
    }

    return (
        <form className="mt-2">
            {/* Heading */}
            <div
                className={`p-3 sticky-top sticky-header ${
                    isScroll ? 'scroll-shadows' : ''
                }`}
            >
                <div className="container d-flex justify-content-between">
                    <h3 className="fw-bold">Create a new study set</h3>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >
                        Create
                    </button>
                </div>
            </div>
            <div className="container mt-4">
                {/* Study set */}
                <div className="row">
                    <div className="form-group mb-3 col-6">
                        <label className={styles.formLabel}>Title</label>
                        <input
                            placeholder="Enter your title"
                            name="title"
                            className={`form-control ${styles.formControl}`}
                            value={studySet.title}
                        />
                    </div>
                    <div className="form-group mb-3 col-6">
                        <label className={styles.formLabel}>Access</label>
                        <select
                            className={`form-select ${styles.formSelect}`}
                            aria-label="access"
                        >
                            <option value="0">Public</option>
                            <option value="1">Private</option>
                        </select>
                    </div>
                </div>
                <div className="form-group mb-5">
                    <label className={styles.formLabel}>Description</label>
                    <textarea
                        className={`form-control ${styles.formControl}`}
                        placeholder="Add a description..."
                        rows="3"
                    ></textarea>
                </div>
                {/* Card */}
                {cardList.map((card, index) => {
                    return (
                        <div className="card mb-3" key={index} id={index}>
                            <div className="card-header d-flex justify-content-between align-items-center mb-1">
                                <span className="card-header-label">
                                    {index + 1}
                                </span>
                                <div className="d-flex justify-content-between align-items-center">
                                    <UploadImages />
                                    <MicIcon className="ms-3 icon-warning" />
                                </div>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={handleDelete}
                                >
                                    <DeleteIcon className="icon-warning" />
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6 d-flex flex-column">
                                        <TextEditor />
                                        <span className="card-header-label mt-1">
                                            TERM
                                        </span>
                                    </div>
                                    <div className="col-6 d-flex flex-column">
                                        <TextEditor />
                                        <span className="card-header-label mt-1">
                                            DEFINITION
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

                {/* Add button */}
                <div className="card mb-3 py-4">
                    <div className="card-body d-flex justify-content-center">
                        <button
                            type="button"
                            className="card-button"
                            onClick={handleAdd}
                        >
                            + ADD CARD
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default CreateStudySet
