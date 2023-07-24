import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import CardService from '../../../services/CardService'
import VocabCard from './VocabCard'

import {
    ArrowDownIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CloseIcon,
    LearnSolidIcon,
    PlaySolidIcon,
    ShuffleIcon,
    StudySetSolidIcon,
    TestSolidIcon,
} from '../../../components/icons'
import './Flashcard.css'
import KanjiCard from './KanjiCard'
import GrammarCard from './GrammarCard'

const Flashcard = () => {
    const navigate = useNavigate()

    const { id } = useParams()

    const [cards, setCards] = useState([])
    const [cardIndex, setCardIndex] = useState(null)
    const [type, setType] = useState(1)

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
                    var tempIndex1 = cardIndex - 1
                    if (tempIndex1 > -1) {
                        setCardIndex(tempIndex1)
                        document
                            .getElementById('flipElement')
                            ?.classList.remove('is-flipped')
                    }
                    // Do something for "left arrow" key press.
                    break
                case 'ArrowRight':
                    var tempIndex2 = cardIndex + 1
                    if (tempIndex2 < cards.length) {
                        setCardIndex(tempIndex2)
                        document
                            .getElementById('flipElement')
                            ?.classList.remove('is-flipped')
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
                        width: `${((cardIndex + 1) / cards?.length) * 100}%`,
                    }}
                ></div>
            </div>
            <div className="flashcardMain mx-auto mb-5">
                {type === 1 ? (
                    <VocabCard card={cards[cardIndex]} />
                ) : type === 2 ? (
                    <KanjiCard card={cards[cardIndex]} />
                ) : (
                    <GrammarCard card={cards[cardIndex]} />
                )}
                <div className="d-flex align-items-center justify-content-between mt-4">
                    <div className="flashcardPlay">
                        <button className="flashcardPlay_btn">
                            <PlaySolidIcon size="1.5rem" />
                        </button>
                    </div>
                    <div className="flashCardSwitch">
                        <button
                            className="flashCardSwitch_btn"
                            style={{ marginRight: '4rem' }}
                            disabled={cardIndex === 0}
                            onClick={() => {
                                setCardIndex(cardIndex - 1)
                            }}
                        >
                            <ArrowLeftIcon size="1.7rem" strokeWidth="2.2" />
                        </button>
                        <button
                            className="flashCardSwitch_btn"
                            style={{ marginRight: '4rem' }}
                            disabled={cardIndex === cards.length - 1}
                            onClick={() => {
                                setCardIndex(cardIndex + 1)
                            }}
                        >
                            <ArrowRightIcon size="1.7rem" strokeWidth="2.2" />
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
        </div>
    )
}
export default Flashcard
