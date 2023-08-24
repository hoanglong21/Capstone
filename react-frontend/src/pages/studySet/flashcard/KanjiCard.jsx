import { useState, useEffect } from 'react'

import ProgressService from '../../../services/ProgressService'

import {
    EditIcon,
    ImageSolidIcon,
    MicIconSolid,
    StarSolidIcon,
} from '../../../components/icons'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const KanjiCard = ({
    userInfo,
    fullCard,
    cardIndex,
    handleAutoPlay,
    isAuto,
    fullCards,
    setFullCards,
    setShowPictureModal,
    setShowAudioModal,
    setShowNoteModal,
    handleUpdateNumStar,
}) => {
    const [card, setCard] = useState({})
    const [progress, setProgress] = useState({})
    const [character, setCharacter] = useState(null)
    const [name, setName] = useState(null)
    const [strokeOrder, setStrokeOrder] = useState(null)
    const [meanings, setMeanings] = useState(null)
    const [onyomi, setOnyomi] = useState(null)
    const [kunyomi, setKunyomi] = useState(null)
    const [radical, setRadical] = useState(null)
    const [example, setExample] = useState(null)
    const [jlptLevel, setJlptLevel] = useState(null)
    const [strokes, setStrokes] = useState(null)
    const { userLanguage } = useSelector((state) => state.user);
    const { userToken } = useSelector((state) => state.auth);
    const { t, i18n } = useTranslation();
  
    useEffect(() => {
      if (userToken) {
        i18n.changeLanguage(userLanguage);
      }
    }, [userLanguage]);
    function toBEDate(date) {
        if (date && !date.includes('+07:00')) {
            return date?.replace(/\s/g, 'T') + '.000' + '+07:00'
        }
        return ''
    }

    useEffect(() => {
        const fetchData = async () => {
            setCard(fullCard.card)
            setProgress(fullCard.progress)
            const tempContents = fullCard.content
            for (const content of tempContents) {
                switch (content.field.name) {
                    case 'character':
                        setCharacter(content)
                        break
                    case 'name':
                        setName(content)
                        break
                    case 'strokeOrder':
                        setStrokeOrder(content)
                        break
                    case 'meanings':
                        setMeanings(content)
                        break
                    case 'onyomi':
                        setOnyomi(content)
                        break
                    case 'kunyomi':
                        setKunyomi(content)
                        break
                    case 'radical':
                        setRadical(content)
                        break
                    case 'example':
                        setExample(content)
                        break
                    case 'jlptLevel':
                        setJlptLevel(content)
                        break
                    case 'strokes':
                        setStrokes(content)
                        break
                    default:
                        break
                }
            }
        }
        if (fullCard?.card.id) {
            fetchData()
        }
    }, [fullCard])

    useEffect(() => {
        if (isAuto) {
            handleAutoPlay()
        }
    }, [isAuto, character])

    const toggleFlip = () => {
        document
            .getElementById(`flipElement${cardIndex}`)
            ?.classList.toggle('is-flipped')
        if (
            document
                .getElementById(`progressNote${card?.id}`)
                ?.classList.contains('show')
        ) {
            document
                .getElementById(`toggleAccordionNoteBtn${card?.id}`)
                ?.click()
        }
    }

    // catch press space event
    useEffect(() => {
        const handleUserSpacePress = (event) => {
            if (event.defaultPrevented) {
                return // Do nothing if event already handled
            }
            switch (event.code) {
                case 'Space':
                    toggleFlip()
            }
            if (event.code !== 'Tab') {
                // Consume the event so it doesn't get handled twice,
                // as long as the user isn't trying to move focus away
                event.preventDefault()
            }
        }
        window.addEventListener('keydown', handleUserSpacePress, true)
        return () => {
            window.removeEventListener('keydown', handleUserSpacePress, true)
        }
    }, [])

    const handleChangeStar = async () => {
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
            star: progress?.id ? !progress?._star : 0,
            audio: progress?.audio || '',
            picture: progress?.picture || '',
            note: progress?.note || '',
        }
        tempProgress = (
            await ProgressService.customUpdateProgress(tempProgress)
        ).data
        // update progress
        setProgress(tempProgress)
        // update list cards
        var tempFullCards = [...fullCards]
        tempFullCards[cardIndex] = { ...fullCard, progress: tempProgress }
        setFullCards(tempFullCards)
        // update number star
        handleUpdateNumStar(tempProgress.status, tempProgress._star)
    }

    return (
        <div
            className="flashcardContentContainer"
            onClick={(event) => {
                if (event.target.name !== 'flashcardContent_noteBtn') {
                    toggleFlip()
                }
            }}
        >
            <div
                className="flashcardContentWrapper"
                id={`flipElement${cardIndex}`}
            >
                {/* front */}
                <div className="flashcardFront d-flex align-items-center justify-content-center">
                    <div className="flashcardContent_noteBtn">
                        <button
                            name="flashcardContent_noteBtn"
                            className={`setPageTerm_btn btn btn-customLight ${
                                progress?._star ? 'star' : ''
                            }`}
                            onClick={handleChangeStar}
                        >
                            <StarSolidIcon size="16px" />
                        </button>
                        <button
                            name="flashcardContent_noteBtn"
                            className="btn btn-customLight"
                            onClick={() => {
                                setShowPictureModal(true)
                            }}
                        >
                            <ImageSolidIcon size="16px" />
                        </button>
                        <button
                            name="flashcardContent_noteBtn"
                            className="btn btn-customLight"
                            onClick={() => {
                                setShowAudioModal(true)
                            }}
                        >
                            <MicIconSolid size="16px" />
                        </button>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: character?.content,
                        }}
                    ></div>
                </div>
                {/* back */}
                <div className="flashcardBack">
                    <div className="flashcardContent_noteBtn">
                        <button
                            name="flashcardContent_noteBtn"
                            className={`setPageTerm_btn btn btn-customLight ${
                                progress?._star ? 'star' : ''
                            }`}
                            onClick={handleChangeStar}
                        >
                            <StarSolidIcon size="16px" />
                        </button>
                        <button
                            name="flashcardContent_noteBtn"
                            className="btn btn-customLight"
                            onClick={() => {
                                setShowPictureModal(true)
                            }}
                        >
                            <ImageSolidIcon size="16px" />
                        </button>
                        <button
                            name="flashcardContent_noteBtn"
                            className="btn btn-customLight"
                            onClick={() => {
                                setShowAudioModal(true)
                            }}
                        >
                            <MicIconSolid size="16px" />
                        </button>
                    </div>
                    <div className="flashcardContent_wrapper h-100">
                        <div className="row">
                            {strokeOrder?.content && (
                                <div className="kanji-card-col-3 mb-3">
                                    <div className="flashCardField_img">
                                        <img
                                            src={strokeOrder?.content}
                                            alt="stroke order img"
                                        />
                                    </div>
                                </div>
                            )}
                            <div
                                className={
                                    strokeOrder?.content ? 'col-9' : 'col-12'
                                }
                            >
                                <div className="row">
                                    {name && (
                                        <div className="kanji-card-col-6 mb-3">
                                            <div className="flashCardField_label mb-2">
                                            {t('name')}
                                            </div>
                                            <div
                                                className="flashCardField_content"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        name?.content || '...',
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                    {meanings && (
                                        <div className="kanji-card-col-6 mb-3">
                                            <div className="flashCardField_label mb-2">
                                            {t('meaning')}
                                            </div>
                                            <div
                                                className="flashCardField_content"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        meanings?.content ||
                                                        '...',
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                    {onyomi && (
                                        <div className="kanji-card-col-6 mb-3">
                                            <div className="flashCardField_label mb-2">
                                            {t('onyomi')}
                                            </div>
                                            <div
                                                className="flashCardField_content"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        onyomi?.content ||
                                                        '...',
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                    {kunyomi && (
                                        <div className="kanji-card-col-6 mb-3">
                                            <div className="flashCardField_label mb-2">
                                            {t('kunyomi')}
                                            </div>
                                            <div
                                                className="flashCardField_content"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        kunyomi?.content ||
                                                        '...',
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                    {radical && (
                                        <div className="kanji-card-col-6 mb-3">
                                            <div className="flashCardField_label mb-2">
                                            {t('radical')}
                                            </div>
                                            <div
                                                className="flashCardField_content"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        radical?.content ||
                                                        '...',
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                    {example && (
                                        <div className="kanji-card-col-6 mb-3">
                                            <div className="flashCardField_label mb-2">
                                            {t('example')}
                                            </div>
                                            <div
                                                className="flashCardField_content"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        example?.content ||
                                                        '...',
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                    {jlptLevel && (
                                        <div className="kanji-card-col-6 mb-3">
                                            <div className="flashCardField_label mb-2">
                                            {t('level')}
                                            </div>
                                            <div
                                                className="flashCardField_content"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        jlptLevel?.content ||
                                                        '...',
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                    {strokes && (
                                        <div className="kanji-card-col-6 mb-3">
                                            <div className="flashCardField_label mb-2">
                                            {t('stroke')}
                                            </div>
                                            <div
                                                className="flashCardField_content"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        strokes?.content ||
                                                        '...',
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="kanji-card-col-6">
                                {(progress?.picture || card?.picture) && (
                                    <div className="flashCardField_img d-flex align-items-center">
                                        <img
                                            src={
                                                progress?.picture ||
                                                card?.picture
                                            }
                                            alt="card picture"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="col-6">
                                {(progress?.audio || card?.audio) && (
                                    <div className="d-flex align-items-center">
                                        <audio
                                            controls
                                            src={progress?.audio || card?.audio}
                                            alt="card audio"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            className="accordion flashcard_accordion"
                            id={`accordionNote${card?.id}`}
                        >
                            <div className="accordion-item border-0">
                                <h2 className="accordion-header">
                                    <button
                                        id={`toggleAccordionNoteBtn${card?.id}`}
                                        name="flashcardContent_noteBtn"
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#progressNote${card?.id}`}
                                        aria-expanded="false"
                                        aria-controls="progressNote"
                                    >
                                        <span>{t('note')}</span>
                                    </button>
                                </h2>
                                <div
                                    id={`progressNote${card?.id}`}
                                    className="accordion-collapse collapse"
                                    data-bs-parent={`#accordionNote${card?.id}`}
                                >
                                    <div className="row">
                                        <div className="col-11">
                                            <div
                                                className="accordion-body"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        progress?.note || '...',
                                                }}
                                            ></div>
                                        </div>
                                        <div className="col-1">
                                            <button
                                                name="flashcardContent_noteBtn"
                                                className="btn btn-customLight btn-customLight--sm ms-1 mt-2"
                                                onClick={() => {
                                                    setShowNoteModal(true)
                                                }}
                                            >
                                                <EditIcon size="1rem" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KanjiCard
