import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

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
    const [showDiscardMess, setShowDiscardMess] = useState(false)

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            setStudySet((await StudySetService.getStudySetById(id)).data)
            setCards((await CardService.getAllByStudySetId(id)).data)
        }
        setError('')
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

    // toggle discard toast
    useEffect(() => {
        setShowDiscardMess(sessionStorage.getItem('isReload', 'true'))
        console.log(sessionStorage.getItem('isReload', 'true'))
    }, [])

    const toggleShowDiscardMess = () => {
        setShowDiscardMess(!showDiscardMess)
        sessionStorage.clear()
    }

    const handleReload = (event) => {
        event.preventDefault()
        sessionStorage.setItem('isReload', 'true')
        return false
    }

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
        console.log(studySet)

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

    const handleDiscard = async () => {
        try {
            const newStudySet = (
                await StudySetService.createStudySet({
                    user: {
                        id: studySet.user.id,
                    },
                    title: '',
                    description: '',
                    deleted: false,
                    public: true,
                    studySetType: {
                        id: 1,
                    },
                    deleted_date: '',
                })
            ).data
            await StudySetService.deleteStudySet(studySet.id)
            navigate('/create-set/' + newStudySet.id)
            toggleShowDiscardMess()
        } catch (error) {
            console.log(error)
        }
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
                                name="_public"
                                value={studySet.public}
                                onChange={handleChange}
                                onBlur={doUpdate}
                            >
                                <option value={1} selected>
                                    Public
                                </option>
                                <option value={0}>Private</option>
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
            {/* discard message */}
            <ToastContainer
                className="p-3 mt-5 opacity-75 position-sticky"
                position="bottom-start"
                style={{ zIndex: 9999 }}
            >
                <Toast
                    show={showDiscardMess}
                    onClose={toggleShowDiscardMess}
                    delay={10000}
                    className="toast align-items-center text-bg-dark border-0"
                    autohide
                >
                    <Toast.Body className="d-flex flex-column p-3">
                        <div className="d-flex justify-content-between">
                            <span className="me-auto">
                                This is an auto-saved set.
                            </span>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="toast"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div>
                            <button
                                className="btn text-white"
                                onClick={handleDiscard}
                            >
                                Discard it
                            </button>
                        </div>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}
export default CreateStudySet
