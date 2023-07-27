import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

import CardService from '../../../services/CardService'
import VocabCard from './VocabCard'

import KanjiCard from './KanjiCard'
import GrammarCard from './GrammarCard'

import {
    ArrowDownIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CloseIcon,
    LearnSolidIcon,
    PauseSolidIcon,
    PlaySolidIcon,
    ShuffleIcon,
    StudySetSolidIcon,
    TestSolidIcon,
} from '../../../components/icons'
import illustration from '../../../assets/images/permafetti.png'
import './Flashcard.css'

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

    const { id } = useParams()

    const [cards, setCards] = useState([])
    const [cardIndex, setCardIndex] = useState(null)
    const [type, setType] = useState(1)

    const [isEnd, setIsEnd] = useState(false)
    const [isAuto, setIsAuto] = useState(false)
    const [showAutoMess, setShowAutoMess] = useState(false)

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            const tempCards = (await CardService.getAllByStudySetId(id)).data
            setCards(tempCards)
            setCardIndex(0)
            setType(tempCards[0]?.studySet?.studySetType?.id)
        }
        if (id) {
            fetchData()
        }
    }, [id])

    // catch press arrow event event
    useEffect(() => {
        const handleUserKeyPress = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    clearSetTimeout()
                    var tempIndex1 = cardIndex - 1
                    if (tempIndex1 > -1) {
                        setCardIndex(tempIndex1)
                        document
                            .getElementById(`flipElement${cardIndex}`)
                            ?.classList.remove('is-flipped')
                    }
                    // Do something for "left arrow" key press.
                    break
                case 'ArrowRight':
                    clearSetTimeout()
                    var tempIndex2 = cardIndex + 1
                    if (tempIndex2 === cards.length) {
                        setIsEnd(true)
                    }
                    if (tempIndex2 < cards.length) {
                        setCardIndex(tempIndex2)
                        document
                            .getElementById(`flipElement${cardIndex}`)
                            ?.classList.remove('is-flipped')
                        clearSetTimeout()
                    }
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

    return (
        <div>
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
                <button
                    className="flashcardClose_btn ms-3 d-flex align-items-center"
                    onClick={() => {
                        navigate(`/set/${cards[cardIndex]?.studySet?.id}`)
                    }}
                >
                    <CloseIcon strokeWidth="2" />
                </button>
            </div>
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
                            card={cards[cardIndex]}
                            cardIndex={cardIndex}
                            handleAutoPlay={handleAutoPlay}
                            isAuto={isAuto}
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
                                    clearSetTimeout()
                                    setCardIndex(cardIndex - 1)
                                    document
                                        .getElementById(
                                            `flipElement${cardIndex}`
                                        )
                                        ?.classList.remove('is-flipped')
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
                                    const tempIndex = cardIndex + 1
                                    if (tempIndex === cards.length) {
                                        setIsEnd(true)
                                    } else {
                                        clearSetTimeout()
                                        setCardIndex(tempIndex)
                                        document
                                            .getElementById(
                                                `flipElement${cardIndex}`
                                            )
                                            ?.classList.remove('is-flipped')
                                    }
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
