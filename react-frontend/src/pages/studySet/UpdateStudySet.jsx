import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Card } from '../../components/Card'
import CardService from '../../services/CardService'
import StudySetService from '../../services/StudySetService'

import styles from '../../assets/styles/Form.module.css'
import '../../assets/styles/stickyHeader.css'
import CardStyles from '../../assets/styles/Card.module.css'

const UpdateStudySet = () => {
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

    const handleAddCard = async () => {
        try {
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
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const titleEl = document.querySelector('#title')
        var form = document.querySelector('.needs-validation')
        // clear validate
        form.classList.remove('was-validated')
        titleEl.classList.remove('is-invalid')
        setError('')

        if (!form.checkValidity()) {
            form.classList.add('was-validated')
            titleEl.classList.add('is-invalid')
        }
        if (cards.length === 0) {
            setError('You must have at least one cards to save your set.')
        } else {
            const emptyCards = (
                await StudySetService.checkStudySet(studySet.id)
            ).data
            if (emptyCards.length === 0) {
                // navigate('/set/' + id)
            } else {
                setError(
                    `<p class="mb-0">Your card can not be empty. Please review your set.</p>
                    <a href="#${emptyCards[0]}" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                    Go to empty card.
                    </a>`
                )
            }
        }
    }

    const handleDelete = async (event) => {
        try {
            var cardEl = event.target.closest('.card')
            await CardService.deleteCard(cardEl.id)
            var array = [...cards]
            var index = cardEl.getAttribute('index')
            if (index > -1) {
                array.splice(index, 1)
            }
            setCards([...array])
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        setStudySet({ ...studySet, [event.target.name]: event.target.value })
    }

    const doUpdate = async () => {
        try {
            await StudySetService.updateStudySet(studySet.id, studySet)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex-grow-1">
            <form className="mt-2 needs-validation" noValidate>
                {/* Heading */}
                <div
                    className={`p-3 sticky-top sticky-header ${
                        isScroll ? 'scroll-shadows' : ''
                    }`}
                >
                    <div className="container d-flex justify-content-between">
                        <Link
                            to={`/sets/${studySet.id}`}
                            className={CardStyles.card_button}
                            style={{
                                backgroundColor: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            BACK TO SET
                        </Link>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Done
                        </button>
                    </div>
                </div>
                <div className="container mt-4">
                    {/* error message */}
                    {error && (
                        <div
                            className="alert alert-danger"
                            role="alert"
                            dangerouslySetInnerHTML={{ __html: error }}
                        ></div>
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
                            key={card.id}
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
export default UpdateStudySet
