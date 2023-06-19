import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Card } from '../../components/Card'
import CardService from '../../services/CardService'
import StudySetService from '../../services/StudySetService'

import styles from '../../assets/styles/Form.module.css'
import '../../assets/styles/stickyHeader.css'
import CardStyles from '../../assets/styles/Card.module.css'

const CreateStudySet = () => {
    const navigate = useNavigate()

    const { id } = useParams()

    const [isScroll, setIsScroll] = useState(false)
    const [studySet, setStudySet] = useState({})
    const [cards, setCards] = useState([])
    const [error, setError] = useState('')

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            setStudySet((await StudySetService.getStudySetById(id)).data)
            setCards((await CardService.getAllByStudySetId(id)).data)
        }
        fetchData()
    }, [id])

    // handle sticky header
    useEffect(() => {
        const handleScroll = () => {
            setIsScroll(window.scrollY > 96)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // handle reload page
    useEffect(() => {
        window.addEventListener('beforeunload', handleReload)
        return () => {
            window.removeEventListener('beforeunload', handleReload)
        }
    }, [])

    const handleReload = (event) => {
        event.preventDefault()
        return false
    }

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
        setCards([...cards, card])
    }

    const handleSubmit = (event) => {
        const titleEl = document.querySelector('#title')
        // clear validate
        titleEl.classList.remove('is-invalid')

        event.preventDefault()
        var form = document.querySelector('.needs-validation')
        if (!form.checkValidity()) {
            titleEl.classList.add('is-invalid')
            return
        }
        // navigate('/set/' + id)
    }

    const handleDelete = (event) => {
        var array = [...cards]
        var index = event.target.closest('.card').id
        array.splice(index, 1)
        setCards([...array])
    }

    const handleChange = (event) => {
        setStudySet({ ...studySet, [event.target.name]: event.target.value })
    }

    const doUpdate = async () => {
        await StudySetService.updateStudySet(studySet.id, studySet)
    }

    return (
        <div>
            <form className="mt-2 needs-validation" noValidate>
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
                    {/* error message */}
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    {/* Study set */}
                    <div className="row">
                        <div className="form-group mb-3 col-6">
                            <label className={styles.formLabel}>Title</label>
                            <input
                                placeholder="Enter your title"
                                id="title"
                                name="title"
                                className={`form-control ${styles.formControl}`}
                                value={studySet.title}
                                onChange={handleChange}
                                onBlur={doUpdate}
                                required
                            />
                            <div className="invalid-feedback">
                                Please enter a title to create your set.
                            </div>
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
                                required
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
                    {cards.map((card, index) => (
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
