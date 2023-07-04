import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

import { Card } from './Card'
import { useSelector } from 'react-redux'

import CardService from '../../services/CardService'
import StudySetService from '../../services/StudySetService'

import styles from '../../assets/styles/Form.module.css'
import '../../assets/styles/stickyHeader.css'
import CardStyles from '../../assets/styles/Card.module.css'

const CreateVocab = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    const { userInfo } = useSelector((state) => state.user)

    const [isScroll, setIsScroll] = useState(false)
    const [studySet, setStudySet] = useState({})
    const [cards, setCards] = useState([])
    const [error, setError] = useState('')
    const [showDiscardMess, setShowDiscardMess] = useState(false)

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            let temp = {}
            if (id) {
                temp = (await StudySetService.getStudySetById(id)).data
            } else {
                const listSets = (
                    await StudySetService.getFilterList(
                        '',
                        '',
                        '=1',
                        '',
                        `=${userInfo?.username}`,
                        '',
                        '',
                        '',
                        ''
                    )
                ).data
                if (listSets.totalItems > 0) {
                    temp = listSets.list[0]
                } else {
                    temp = (
                        await StudySetService.createStudySet({
                            user: {
                                id: userInfo.id,
                            },
                            title: '',
                            description: '',
                            _deleted: false,
                            _public: true,
                            _draft: true,
                            studySetType: {
                                id: 1,
                            },
                            deleted_date: '',
                        })
                    ).data
                }
            }
            setStudySet(temp)
            setCards((await CardService.getAllByStudySetId(temp.id)).data)
        }
        setError('')
        if (userInfo.username) {
            fetchData()
        }
    }, [userInfo])

    // handle sticky header
    useEffect(() => {
        setError('')
        const handleScroll = () => {
            setIsScroll(window.scrollY > 96)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // handle reload page
    useEffect(() => {
        const handleReload = (event) => {
            event.preventDefault()
            if (studySet._draft) {
                sessionStorage.setItem('isReload', 'true')
            }
            return false
        }
        window.addEventListener('beforeunload', handleReload)
        return () => {
            window.removeEventListener('beforeunload', handleReload)
        }
    }, [studySet._draft])

    // toggle discard toast
    useEffect(() => {
        setShowDiscardMess(sessionStorage.getItem('isReload') === 'true')
    }, [])

    const toggleShowDiscardMess = () => {
        setShowDiscardMess(!showDiscardMess)
        sessionStorage.clear()
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
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
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

        try {
            form.classList.add('was-validated')
            if (!studySet.title) {
                titleEl.classList.add('is-invalid')
            } else if (cards.length === 0) {
                setError('You must have at least one cards to save your set.')
            } else {
                const emptyCards = (
                    await StudySetService.checkStudySet(studySet.id)
                ).data
                if (emptyCards.length === 0) {
                    setStudySet({ ...studySet, _draft: false })
                    console.log(studySet)
                    await StudySetService.updateStudySet(studySet.id, studySet)
                    // navigate('/set/' + id)

                    form.classList.remove('was-validated')
                    titleEl.classList.remove('is-invalid')
                    setError('')
                } else {
                    setError(
                        `<p class="mb-0">Your card can not be empty. Please review your set.</p>
                    <a href="#${emptyCards[0]}" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                    Go to empty card.
                    </a>`
                    )
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
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
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
        }
    }

    const handleChange = (event) => {
        setStudySet({ ...studySet, [event.target.name]: event.target.value })
    }

    const doUpdate = async () => {
        try {
            console.log(studySet)
            await StudySetService.updateStudySet(studySet.id, studySet)
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
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
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
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
                    {studySet._draft ? (
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
                    ) : (
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
                    )}
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
                        {/* title */}
                        <div className="form-group mb-3 col-6">
                            <label className={styles.formLabel}>Title</label>
                            <input
                                placeholder="Enter your title"
                                id="title"
                                name="title"
                                className={`form-control ${styles.formControl}`}
                                value={studySet.title || ''}
                                onChange={handleChange}
                                onBlur={doUpdate}
                                required
                            />
                            <div className="invalid-feedback">
                                Please enter a title to create your set.
                            </div>
                        </div>
                        {/* is_public */}
                        <div className="form-group mb-3 col-6">
                            <label className={styles.formLabel}>Access</label>
                            <select
                                className={`form-select ${styles.formSelect}`}
                                aria-label="public"
                                name="_public"
                                value={studySet._public}
                                onChange={handleChange}
                                onBlur={doUpdate}
                            >
                                <option value={true}>Public</option>
                                <option value={false}>Private</option>
                            </select>
                        </div>
                    </div>
                    {/* description */}
                    <div className="form-group mb-5">
                        <label className={styles.formLabel}>Description</label>
                        <textarea
                            className={`form-control ${styles.formControl}`}
                            style={{ height: '6rem' }}
                            placeholder="Add a description..."
                            name="description"
                            value={studySet.description || ''}
                            onChange={handleChange}
                            onBlur={doUpdate}
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
export default CreateVocab
