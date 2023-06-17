import { useEffect, useState } from 'react'

import styles from '../../assets/styles/Form.module.css'
import '../../assets/styles/stickyHeader.css'
import CardStyles from '../../assets/styles/Card.module.css'
import { Card } from '../../components/Card'
import { useLocation } from 'react-router-dom'
import CardService from '../../services/CardService'
import ContentService from '../../services/ContentService'
import StudySetService from '../../services/StudySetService'

const CreateStudySet = () => {
    const location = useLocation()

    const [isScroll, setIsScroll] = useState(false)
    const [studySet, setStudySet] = useState(location.state)
    const [cardList, setCardList] = useState([])

    useEffect(() => {
        // handle sticky header
        const handleScroll = () => {
            setIsScroll(window.scrollY > 96)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleAddCard = async () => {
        const card = (
            await CardService.createCard({
                picture: '',
                audio: '',
                studySet: {
                    id: studySet.id,
                },
            })
        ).data
        const term = (
            await ContentService.createContent({
                card: {
                    id: card.id,
                },
                field: {
                    id: 1,
                },
                content: '',
            })
        ).data
        const definition = (
            await ContentService.createContent({
                card: {
                    id: card.id,
                },
                field: {
                    id: 2,
                },
                content: '',
            })
        ).data
        setCardList([...cardList, { ...card, contents: [term, definition] }])
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

    const handleChange = (event) => {
        setStudySet({ ...studySet, [event.target.name]: event.target.value })
    }

    const doUpdate = async () => {
        await StudySetService.updateStudySet(studySet.id, studySet)
    }

    return (
        <div>
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
                                onChange={handleChange}
                                onBlur={doUpdate}
                            />
                        </div>
                        <div className="form-group mb-3 col-6">
                            <label className={styles.formLabel}>Access</label>
                            <select
                                className={`form-select ${styles.formSelect}`}
                                aria-label="public"
                                name="public"
                                value={studySet.public}
                                onChange={handleChange}
                                onBlur={doUpdate}
                            >
                                <option value={true}>Public</option>
                                <option value={false}>Private</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group mb-5">
                        <label className={styles.formLabel}>Description</label>
                        <textarea
                            className={`form-control ${styles.formControl}`}
                            placeholder="Add a description..."
                            name="description"
                            value={studySet.description}
                            onChange={handleChange}
                            onBlur={doUpdate}
                            rows="3"
                        ></textarea>
                    </div>
                    {/* Card */}
                    {cardList.map((card, index) => (
                        <Card
                            key={index}
                            index={index}
                            card={card}
                            handleDelete={handleDelete}
                        />
                    ))}

                    {/* Add button */}
                    <div className={`card ${CardStyles.card} mb-3 py-4`}>
                        <div
                            className={`card-body ${CardStyles.card_body} d-flex justify-content-center`}
                        >
                            <button
                                type="button"
                                className={CardStyles.card_button}
                                onClick={handleAddCard}
                            >
                                + ADD CARD
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default CreateStudySet
