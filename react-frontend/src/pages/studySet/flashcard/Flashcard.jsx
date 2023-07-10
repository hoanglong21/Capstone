import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useEventListener } from '@uidotdev/usehooks'

import CardService from '../../../services/CardService'
import ContentService from '../../../services/ContentService'

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

const Flashcard = () => {
    const navigate = useNavigate()

    const { id } = useParams()

    const [cards, setCards] = useState([])
    const [cardIndex, setCardIndex] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const tempCards = (await CardService.getAllByStudySetId(id)).data
            setCards(tempCards)
        }
        if (id) {
            fetchData()
        }
    }, [id])

    // catch press arrow event
    // useEffect(() => {
    //     window.addEventListener('keydown', function (event) {
    //         if (event.code === 'ArrowLeft' && cardIndex !== 0) {
    //             setCardIndex(cardIndex - 1)
    //             console.log('555')
    //         } else if (
    //             event.code === 'ArrowRight' &&
    //             cardIndex !== cards.length
    //         ) {
    //             setCardIndex(cardIndex + 1)
    //             console.log('666')
    //         } else if (event.code === 'Space') {
    //             toggleFlip()
    //             console.log('888')
    //         }
    //     })
    // }, [])

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
                                        Test
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
                <div className="flashcardOptions d-flex">
                    <button className="flashcardOptions_btn">Options</button>
                    <button
                        className="flashcardClose_btn ms-3 d-flex align-items-center"
                        onClick={() => {
                            navigate(`/set/${cards[cardIndex]?.studySet?.id}`)
                        }}
                    >
                        <CloseIcon strokeWidth="2" />
                    </button>
                </div>
            </div>
            <div className="flashcardMain mx-auto mb-5">
                <FlashcardItem card={cards[cardIndex]} />
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
                        <button className="flashcardPlay_btn">
                            <ShuffleIcon size="1.5rem" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Flashcard

export const FlashcardItem = ({ card }) => {
    const [contents, setContents] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const tempContents = (await ContentService.getAllByCardId(card.id))
                .data
            setContents(tempContents)
        }
        if (card?.id) {
            fetchData()
        }
    }, [card])

    const toggleFlip = () => {
        document.getElementById('flipElement').classList.toggle('is-flipped')
    }

    useEventListener(document, 'space', toggleFlip)

    return (
        <div
            className="flashcardContentContainer"
            onClick={() => {
                toggleFlip()
            }}
        >
            <div className="flashcardContentWrapper" id="flipElement">
                <div className="flashcardFront">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: contents[0]?.content,
                        }}
                    ></div>
                </div>
                <div className="flashcardBack">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: contents[1]?.content,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    )
}
