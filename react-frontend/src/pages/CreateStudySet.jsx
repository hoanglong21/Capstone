import { useEffect, useState } from 'react'

import styles from '../assets/styles/Form.module.css'
import '../assets/styles/stickyHeader.css'
import CardStyles from '../assets/styles/Card.module.css'
import { Card } from '../components/Card/Card'

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
                    return <Card index={index} handleDelete={handleDelete} />
                })}

                {/* Add button */}
                <div className={`card ${CardStyles.card} mb-3 py-4`}>
                    <div
                        className={`card-body ${CardStyles.card_body} d-flex justify-content-center`}
                    >
                        <button
                            type="button"
                            className={CardStyles.card_button}
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
