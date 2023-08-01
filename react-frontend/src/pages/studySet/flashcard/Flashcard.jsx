import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { useDispatch, useSelector } from 'react-redux'

import CardService from '../../../services/CardService'
import VocabCard from './VocabCard'
import { getUser } from '../../../features/user/userAction'

import KanjiCard from './KanjiCard'
import GrammarCard from './GrammarCard'

import {
    ArrowDownIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CloseIcon,
    DeleteIcon,
    ImageIcon,
    LearnSolidIcon,
    MicIcon,
    PauseSolidIcon,
    PlaySolidIcon,
    ShuffleIcon,
    StudySetSolidIcon,
    TestSolidIcon,
} from '../../../components/icons'
import illustration from '../../../assets/images/permafetti.png'
import FormStyles from '../../../assets/styles/Form.module.css'
import './Flashcard.css'
import { deleteFileByUrl, uploadFile } from '../../../features/fileManagement'
import ProgressService from '../../../services/ProgressService'
import NoteEditor from '../../../components/textEditor/NoteEditor'

const Confettiful = function (el) {
    this.el = el
    this.containerEl = null

    this.confettiFrequency = 3
    this.confettiColors = [
        '#EF2964',
        '#00C09D',
        '#2D87B0',
        '#48485E',
        '#EFFF1D',
    ]
    this.confettiAnimations = ['slow', 'medium', 'fast']

    this._setupElements()
    this._renderConfetti()
}

Confettiful.prototype._setupElements = function () {
    const containerEl = document.createElement('div')
    const elPosition = this.el.style.position

    if (elPosition !== 'relative' || elPosition !== 'absolute') {
        this.el.style.position = 'relative'
    }

    containerEl.classList.add('confetti-container')

    this.el.appendChild(containerEl)

    this.containerEl = containerEl
}

Confettiful.prototype._renderConfetti = function () {
    const confettiInterval = setInterval(() => {
        const confettiEl = document.createElement('div')
        const confettiSize = Math.floor(Math.random() * 3) + 7 + 'px'
        const confettiBackground =
            this.confettiColors[
                Math.floor(Math.random() * this.confettiColors.length)
            ]
        const confettiLeft =
            Math.floor(Math.random() * this.el.offsetWidth) + 'px'
        const confettiAnimation =
            this.confettiAnimations[
                Math.floor(Math.random() * this.confettiAnimations.length)
            ]

        confettiEl.classList.add(
            'confetti',
            'confetti--animation-' + confettiAnimation
        )
        confettiEl.style.left = confettiLeft
        confettiEl.style.width = confettiSize
        confettiEl.style.height = confettiSize
        confettiEl.style.backgroundColor = confettiBackground

        confettiEl.removeTimeout = setTimeout(function () {
            confettiEl.parentNode.removeChild(confettiEl)
        }, 10000)

        this.containerEl.appendChild(confettiEl)
    }, 25)

    setTimeout(function () {
        clearInterval(confettiInterval)
    }, 3000)
}

const Flashcard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { id } = useParams()

    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    const [cards, setCards] = useState([])
    const [cardIndex, setCardIndex] = useState(null)
    const [type, setType] = useState(1)

    const [isEnd, setIsEnd] = useState(false)
    const [isAuto, setIsAuto] = useState(false)
    const [showAutoMess, setShowAutoMess] = useState(false)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [picture, setPicture] = useState('')
    const [audio, setAudio] = useState('')
    const [note, setNote] = useState('')
    const [showNote, setShowNote] = useState(false)
    const [loadingPicture, setLoadingPicture] = useState(false)
    const [loadingAudio, setLoadingAudio] = useState(false)

    function toBEDate(date) {
        if (date && !date.includes('+07:00')) {
            return date?.replace(/\s/g, 'T') + '.000' + '+07:00'
        }
        return ''
    }

    function getUrl(file) {
        try {
            return URL.createObjectURL(file)
        } catch (error) {
            return file
        }
    }

    // fetch user info
    useEffect(() => {
        if (userToken) {
            dispatch(getUser(userToken))
        }
    }, [userToken])

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempCards = (
                    await CardService.countCardInSet(
                        `=${userInfo.id}`,
                        `=${id}`,
                        '=still learning,mastered,not studied',
                        `=0`
                    )
                ).data
                setCards(tempCards)
                setCardIndex(0)
                setPicture(tempCards[0].progress?.picture || '')
                setAudio(tempCards[0].progress?.audio || '')
                setNote(tempCards[0].progress?.note || '')
                setType(tempCards[0].card?.studySet?.studySetType?.id)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (id && userInfo.id) {
            fetchData()
        }
    }, [userInfo, id])

    const nextCard = () => {
        clearSetTimeout()
        var tempIndex1 = cardIndex - 1
        if (tempIndex1 > -1) {
            const progress = cards[tempIndex1].progress
            setCardIndex(tempIndex1)
            setPicture(progress?.picture || '')
            setAudio(progress?.audio || '')
            setNote(progress?.note || '')
            document
                .getElementById(`flipElement${cardIndex}`)
                ?.classList.remove('is-flipped')
        }
    }

    const prevCard = () => {
        clearSetTimeout()
        var tempIndex2 = cardIndex + 1
        if (tempIndex2 === cards.length) {
            setIsEnd(true)
        }
        if (tempIndex2 < cards.length) {
            const progress = cards[tempIndex2].progress
            setCardIndex(tempIndex2)
            setPicture(progress?.picture || '')
            setAudio(progress?.audio || '')
            setNote(progress?.note || '')
            document
                .getElementById(`flipElement${cardIndex}`)
                ?.classList.remove('is-flipped')
            clearSetTimeout()
        }
    }

    // catch press arrow event event
    useEffect(() => {
        const handleUserKeyPress = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    nextCard()
                    // Do something for "left arrow" key press.
                    break
                case 'ArrowRight':
                    prevCard()
                    // Do something for "right arrow" key press.
                    break
                default:
                    return // Quit when this doesn't handle the key event.
            }

            // Cancel the default action to avoid it being handled twice
            event.preventDefault()
        }
        window.addEventListener('keydown', handleUserKeyPress, true)
        return () => {
            window.removeEventListener('keydown', handleUserKeyPress, true)
        }
    }, [cardIndex])

    // congratulation animation
    useEffect(() => {
        if (isEnd) {
            document
                .querySelector('#flashcardAnimation .confetti-container')
                ?.remove()
            window.confettiful = new Confettiful(
                document.getElementById('flashcardAnimation')
            )
        }
    }, [isEnd])

    const handleShuffle = () => {
        if (cards.length > 1) {
            var array = [...cards]
            let currentIndex = array.length,
                randomIndex
            // While there remain elements to shuffle.
            while (currentIndex != 0) {
                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex)
                currentIndex--
                // And swap it with the current element.
                ;[array[currentIndex], array[randomIndex]] = [
                    array[randomIndex],
                    array[currentIndex],
                ]
            }
            setCards([...array])
        }
    }

    const handleEndReset = (index) => {
        setIsEnd(false)
        setCardIndex(index)
        document
            .querySelector('#flashcardAnimation .confetti-container')
            .remove()
    }

    const handleAutoPlay = () => {
        var tempIndex = cardIndex + 1
        if (cardIndex < cards.length) {
            if (
                document
                    .getElementById(`flipElement${cardIndex}`)
                    .classList.contains('is-flipped')
            ) {
                setTimeout(function () {
                    document
                        .getElementById(`flipElement${cardIndex}`)
                        ?.classList.remove('is-flipped')
                    if (tempIndex === cards.length) {
                        setIsEnd(true)
                    } else {
                        setCardIndex(tempIndex)
                    }
                }, 5000)
            } else {
                setTimeout(function () {
                    document
                        .getElementById(`flipElement${cardIndex}`)
                        ?.classList.add('is-flipped')
                }, 5000)
                setTimeout(function () {
                    document
                        .getElementById(`flipElement${cardIndex}`)
                        ?.classList.remove('is-flipped')
                    if (tempIndex === cards.length) {
                        setIsEnd(true)
                    } else {
                        setCardIndex(tempIndex)
                    }
                }, 10000)
            }
        }
    }

    const clearSetTimeout = () => {
        var id = window.setTimeout(function () {}, 0)
        while (id--) {
            window.clearTimeout(id) // will do nothing if no timeout with id is present
        }
    }

    const handleChangeFile = async (event) => {
        const name = event.target.name
        name === 'picture' ? setLoadingPicture(true) : setLoadingAudio(true)
        const file = event.target.files[0]
        if (file) {
            name === 'picture' ? setPicture(file) : setAudio(file)
        }
        name === 'picture' ? setLoadingPicture(false) : setLoadingAudio(false)
    }

    const handleDeleteFile = async (event) => {
        const name = event.target.name
        name === 'picture' ? setPicture('') : setAudio('')
    }

    const handleSave = async () => {
        setLoading(true)
        const card = cards[cardIndex].card
        const progress = cards[cardIndex].progress
        var tempCard = { ...card }
        tempCard.studySet.created_date = toBEDate(
            tempCard.studySet.created_date
        )
        tempCard.studySet.user.created_date = toBEDate(
            tempCard.studySet.user.created_date
        )
        var tempUser = {
            ...userInfo,
            created_date: toBEDate(userInfo.created_date),
        }
        var tempProgress = {
            user: tempUser,
            card: tempCard,
            star: progress?.id ? progress?._star : 0,
            note: note,
        }
        try {
            if (progress?.id) {
                // delete old
                if (picture?.type && progress?.picture) {
                    await deleteFileByUrl(
                        progress.picture,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${progress.id}`
                    )
                }
                if (audio?.type && progress?.audio) {
                    await deleteFileByUrl(
                        progress.audio,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${progress.id}`
                    )
                }
                // upload new
                var tempPicture = picture
                if (picture && picture != progress.picture) {
                    tempPicture = await uploadFile(
                        picture,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${progress.id}`
                    )
                    setPicture(tempPicture)
                }
                var tempAudio = audio
                if (audio && audio != progress.audio) {
                    tempAudio = await uploadFile(
                        audio,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${progress.id}`
                    )
                    setAudio(tempAudio)
                }
                tempProgress = {
                    ...tempProgress,
                    picture: tempPicture,
                    audio: tempAudio,
                }
            } else {
                tempProgress = (
                    await ProgressService.customUpdateProgress(tempProgress)
                ).data
                // upload new
                var tempPicture = picture
                if (picture) {
                    tempPicture = await uploadFile(
                        picture,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${tempProgress.id}`
                    )
                    setPicture(tempPicture)
                }
                var tempAudio = audio
                if (audio) {
                    tempAudio = await uploadFile(
                        audio,
                        `${card.studySet.user.username}/studySet/${card.studySet.id}/card/${card.id}/progress/${tempProgress.id}`
                    )
                    setAudio(tempAudio)
                }
                tempProgress = {
                    ...tempProgress,
                    picture: tempPicture,
                    audio: tempAudio,
                }
            }
            tempProgress = { ...tempProgress, user: tempUser, card: tempCard }
            tempProgress = (
                await ProgressService.customUpdateProgress(tempProgress)
            ).data
            var tempCards = [...cards]
            tempCards[cardIndex].progress = tempProgress
            setCards(tempCards)
            setShowNote(false)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    const handleCancel = () => {
        const progress = cards[cardIndex].progress
        setShowNote(false)
        setPicture(progress?.picture || '')
        setAudio(progress?.audio || '')
        setNote(progress?.note || '')
    }

    return (
        <div>
            {/* header */}
            <div className="flashcardHeader d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <StudySetSolidIcon
                        className="flashcardModeIcon"
                        size="2rem"
                    />
                    <div className="flashcardMode dropdown d-flex align-items-center">
                        <button
                            type="button dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="ps-2 me-2">Flashcards</span>
                            <ArrowDownIcon size="1rem" strokeWidth="2.6" />
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <button
                                    className="dropdown-item flashcardModeIcon py-2 px-3 d-flex align-items-center"
                                    type="button"
                                    onClick={() => {
                                        navigate(`/learn/${id}`)
                                    }}
                                >
                                    <LearnSolidIcon
                                        className="me-3 flashcardModeIcon"
                                        size="1.3rem"
                                        strokeWidth="2"
                                    />
                                    <span className="align-middle fw-semibold">
                                        Learn
                                    </span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                                    type="button"
                                    onClick={() => {
                                        navigate(`/quiz/${id}`)
                                    }}
                                >
                                    <TestSolidIcon
                                        className="me-3 flashcardModeIcon"
                                        size="1.3rem"
                                    />
                                    <span className="align-middle fw-semibold">
                                        Quiz
                                    </span>
                                </button>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <button
                                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                                    type="button"
                                >
                                    <span className="align-middle fw-semibold">
                                        Home
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flashcardInfo d-flex flex-column align-items-center">
                    <h3>
                        {cardIndex + 1} / {cards.length}
                    </h3>
                    <h3>{cards[cardIndex]?.studySet?.title}</h3>
                </div>
                <div className="quizOptions d-flex">
                    {isEnd ? (
                        <button
                            id="toggleQuizOptionsModalBtn"
                            className="quizOptions_btn"
                            // onClick={handleCreateQuiz}
                        >
                            Take a new test
                        </button>
                    ) : (
                        <button
                            id="toggleQuizOptionsModalBtn"
                            className="quizOptions_btn"
                            data-bs-toggle="modal"
                            data-bs-target="#flashcardOptionModal"
                        >
                            Options
                        </button>
                    )}
                    <button
                        className="quizClose_btn ms-3 d-flex align-items-center"
                        onClick={() => {
                            navigate(`/set/${id}`)
                        }}
                    >
                        <CloseIcon strokeWidth="2" />
                    </button>
                </div>
            </div>
            {/* progress */}
            <div className="flashcardProgressContainer">
                <div
                    className="flashcardProgress"
                    style={{
                        width: `${
                            ((isEnd ? cards?.length : cardIndex) /
                                cards?.length) *
                            100
                        }%`,
                    }}
                ></div>
            </div>
            {isEnd ? (
                <div id="flashcardAnimation">
                    <div className="flashcardEnd mx-auto p-5">
                        <div>
                            <h2>Way to go! You’ve reviewed all the cards.</h2>
                            <img src={illustration} alt="congratulation img" />
                        </div>
                        <div className="d-flex justify-content-between mt-5">
                            <button
                                className="flashcardEnd_btn"
                                onClick={() => handleEndReset(cards.length - 1)}
                            >
                                <ArrowLeftIcon size="1rem" />
                                <span className="ms-2">
                                    Back to the last card
                                </span>
                            </button>
                            <button
                                className="flashcardEnd_btn"
                                onClick={() => handleEndReset(0)}
                            >
                                <span className="me-2">Learning again</span>
                                <ArrowRightIcon size="1rem" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flashcardMain mx-auto mb-5">
                    {type === 1 ? (
                        <VocabCard
                            userInfo={userInfo}
                            fullCard={cards[cardIndex]}
                            cardIndex={cardIndex}
                            handleAutoPlay={handleAutoPlay}
                            isAuto={isAuto}
                            fullCards={cards}
                            setFullCards={setCards}
                            setShowNote={setShowNote}
                        />
                    ) : type === 2 ? (
                        <KanjiCard
                            card={cards[cardIndex]}
                            cardIndex={cardIndex}
                            handleAutoPlay={handleAutoPlay}
                            isAuto={isAuto}
                        />
                    ) : (
                        <GrammarCard
                            card={cards[cardIndex]}
                            cardIndex={cardIndex}
                            handleAutoPlay={handleAutoPlay}
                            isAuto={isAuto}
                        />
                    )}
                    {showNote && (
                        <div className="flashcardContent_noteModal">
                            <div className="modal-content">
                                <div className="d-flex justify-content-between mb-3">
                                    <div>
                                        <input
                                            type="file"
                                            id="noteUploadImage"
                                            accept="image/*"
                                            name="picture"
                                            className="d-none"
                                            onClick={(event) => {
                                                event.target.value = null
                                            }}
                                            onChange={(event) =>
                                                handleChangeFile(event)
                                            }
                                        />
                                        <label htmlFor="noteUploadImage">
                                            <ImageIcon className="ms-3 icon-warning" />
                                        </label>
                                        <input
                                            type="file"
                                            id="noteUploadAudio"
                                            accept="audio/*"
                                            name="audio"
                                            className="d-none"
                                            onClick={(event) => {
                                                event.target.value = null
                                            }}
                                            onChange={(event) =>
                                                handleChangeFile(event)
                                            }
                                        />
                                        <label htmlFor="noteUploadAudio">
                                            <MicIcon className="ms-3 icon-warning" />
                                        </label>
                                    </div>
                                    <button
                                        className="close p-0"
                                        onClick={handleCancel}
                                    >
                                        <CloseIcon size="1.875rem" />
                                    </button>
                                </div>
                                <div className="setPage_noteEditor">
                                    <NoteEditor
                                        data={note}
                                        onChange={(event, editor) => {
                                            setNote(editor.getData())
                                        }}
                                    />
                                </div>
                                {(loadingPicture ||
                                    loadingAudio ||
                                    picture ||
                                    audio) && (
                                    <div className="row mt-2 setPage_noteUploadFile">
                                        <div className="col-6 d-flex flex-column align-items-center">
                                            {loadingPicture && (
                                                <div
                                                    className="spinner-border text-secondary mb-3"
                                                    role="status"
                                                >
                                                    <span className="visually-hidden">
                                                        LoadingUpload...
                                                    </span>
                                                </div>
                                            )}
                                            {!loadingPicture && picture && (
                                                <div className="d-flex align-self-start align-items-center">
                                                    <img
                                                        src={getUrl(picture)}
                                                    />
                                                    <button
                                                        type="button"
                                                        name="picture"
                                                        className="btn btn-danger ms-5 p-0 rounded-circle"
                                                        onClick={(event) =>
                                                            handleDeleteFile(
                                                                event
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon size="1.25rem" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-6 d-flex flex-column align-items-center">
                                            {loadingAudio && (
                                                <div
                                                    className="spinner-border text-secondary mb-3"
                                                    role="status"
                                                >
                                                    <span className="visually-hidden">
                                                        LoadingUpload...
                                                    </span>
                                                </div>
                                            )}
                                            {!loadingAudio && audio && (
                                                <div className="d-flex align-self-start align-items-center">
                                                    <audio
                                                        controls
                                                        src={getUrl(audio)}
                                                    ></audio>
                                                    <button
                                                        type="button"
                                                        name="audio"
                                                        className="btn btn-danger ms-5 p-0 rounded-circle"
                                                        onClick={(event) =>
                                                            handleDeleteFile(
                                                                event
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon size="1.25rem" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="d-flex justify-content-end mt-3">
                                    <button
                                        className="btn btn-secondary me-3"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleSave}
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving' : 'Save'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* action button */}
                    <div className="d-flex align-items-center justify-content-between mt-4">
                        <div className="flashcardPlay">
                            {isAuto ? (
                                <button
                                    className="flashcardPlay_btn"
                                    onClick={() => {
                                        setIsAuto(false)
                                        clearSetTimeout()
                                        setShowAutoMess(true)
                                        setTimeout(function () {
                                            document
                                                .getElementById(
                                                    'autoPlayToastClose'
                                                )
                                                .click()
                                        }, 2000)
                                    }}
                                >
                                    <PauseSolidIcon size="1.5rem" />
                                </button>
                            ) : (
                                <button
                                    className="flashcardPlay_btn"
                                    onClick={() => {
                                        setIsAuto(true)
                                        setShowAutoMess(true)
                                    }}
                                >
                                    <PlaySolidIcon size="1.5rem" />
                                </button>
                            )}
                        </div>
                        <div className="flashCardSwitch">
                            <button
                                className="flashCardSwitch_btn"
                                style={{ marginRight: '4rem' }}
                                disabled={cardIndex === 0}
                                onClick={() => {
                                    nextCard()
                                }}
                            >
                                <ArrowLeftIcon
                                    size="1.7rem"
                                    strokeWidth="2.2"
                                />
                            </button>
                            <button
                                className="flashCardSwitch_btn"
                                style={{ marginRight: '4rem' }}
                                onClick={() => {
                                    prevCard()
                                }}
                            >
                                <ArrowRightIcon
                                    size="1.7rem"
                                    strokeWidth="2.2"
                                />
                            </button>
                        </div>
                        <div className="flashcardPlay">
                            <button
                                className="flashcardPlay_btn"
                                onClick={handleShuffle}
                            >
                                <ShuffleIcon size="1.5rem" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Option modal */}
            <div
                className="modal fade quizOptionModal"
                id="flashcardOptionModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Options</h3>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                // onClick={handleCancelCreateQuiz}
                            ></button>
                            <button
                                id="quizOptionModalCloseBtn"
                                type="button"
                                className="d-none"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {/* error message */}
                            {error && (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}
                            <div className="row mb-3">
                                <div className="col-6">
                                    {/* types */}
                                    <div className="quizOptionBlock">
                                        <legend>QUESTION TYPES</legend>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                value={1}
                                                // checked={
                                                //     optionQuestionTypes?.includes(
                                                //         1
                                                //     ) || ''
                                                // }
                                                id="written"
                                                // onChange={
                                                //     handleChangeQuestionType
                                                // }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="written"
                                            >
                                                Written
                                            </label>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                value={2}
                                                // checked={
                                                //     optionQuestionTypes?.includes(
                                                //         2
                                                //     ) || ''
                                                // }
                                                id="mupltipleChoice"
                                                // onChange={
                                                //     handleChangeQuestionType
                                                // }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="mupltipleChoice"
                                            >
                                                Multiple choice
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                value={3}
                                                // checked={
                                                //     optionQuestionTypes?.includes(
                                                //         3
                                                //     ) || ''
                                                // }
                                                id="trueFalse"
                                                // onChange={
                                                //     handleChangeQuestionType
                                                // }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="trueFalse"
                                            >
                                                True/False
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    {/* picture */}
                                    <div className="quizOptionBlock">
                                        <legend>PICTURE</legend>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                // checked={optionShowPicture}
                                                id="showPicture"
                                                // onChange={() => {
                                                //     setOptionShowPicture(
                                                //         !optionShowPicture
                                                //     )
                                                // }}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="showPicture"
                                            >
                                                Show picture
                                            </label>
                                        </div>
                                    </div>
                                    {/* audio */}
                                    <div className="quizOptionBlock">
                                        <legend>AUDIO</legend>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                // checked={optionShowAudio}
                                                id="showAudio"
                                                // onChange={() => {
                                                //     setOptionShowAudio(
                                                //         !optionShowAudio
                                                //     )
                                                // }}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="showAudio"
                                            >
                                                Show audio
                                            </label>
                                        </div>
                                    </div>
                                    {/* note */}
                                    <div className="quizOptionBlock">
                                        <legend>NOTE</legend>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                // checked={optionShowNote}
                                                id="note"
                                                // onChange={() => {
                                                //     setOptionShowNote(
                                                //         !optionShowNote
                                                //     )
                                                // }}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="note"
                                            >
                                                Show note
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary classModalBtn me-3"
                                data-bs-dismiss="modal"
                                // onClick={handleCancelCreateQuiz}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary classModalBtn"
                                // onClick={handleCreateQuiz}
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="d-flex justify-content-center">
                                        <div
                                            className="spinner-border"
                                            role="status"
                                        >
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    'Create new quiz'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* auto play message */}
            <ToastContainer
                className="p-3"
                position="bottom-end"
                style={{ zIndex: 9999999 }}
            >
                <Toast
                    show={showAutoMess}
                    onClose={() => {
                        setShowAutoMess(false)
                    }}
                    className="toast align-items-center text-bg-dark border-0"
                >
                    <Toast.Body className="d-flex flex-column p-3">
                        <div className="d-flex justify-content-between">
                            <span className="me-auto">
                                Auto-play cards is {isAuto ? 'on' : 'off'}.
                            </span>
                            <button
                                id="autoPlayToastClose"
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="toast"
                                aria-label="Close"
                            ></button>
                        </div>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}
export default Flashcard
