import { useState, useEffect } from 'react'

import ContentService from '../../../services/ContentService'

const GrammarCard = ({ card }) => {
    const [title, setTitle] = useState(null)
    const [jlptLevel, setJlptLevel] = useState(null)
    const [meaning, setMeaning] = useState(null)
    const [example, setExample] = useState(null)
    const [explanation, setExplanation] = useState(null)
    const [note, setNote] = useState(null)
    const [structure, setStructure] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const tempContents = (await ContentService.getAllByCardId(card.id))
                .data
            for (const content of tempContents) {
                switch (content.field.name) {
                    case 'title':
                        setTitle(content)
                        break
                    case 'jlptLevel':
                        setJlptLevel(content)
                        break
                    case 'meaning':
                        setMeaning(content)
                        break
                    case 'example':
                        setExample(content)
                        break
                    case 'explanation':
                        setExplanation(content)
                        break
                    case 'note':
                        setNote(content)
                        break
                    case 'structure':
                        setStructure(content)
                        break
                    default:
                        break
                }
            }
        }
        if (card?.id) {
            fetchData()
        }
    }, [card])

    const toggleFlip = () => {
        document.getElementById('flipElement')?.classList.toggle('is-flipped')
    }

    // catch press space event
    useEffect(() => {
        window.addEventListener(
            'keydown',
            (event) => {
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
            },
            true
        )
    }, [])

    return (
        <div
            className="flashcardContentContainer"
            onClick={() => {
                toggleFlip()
            }}
        >
            <div className="flashcardContentWrapper" id="flipElement">
                <div className="flashcardFront d-flex align-items-center justify-content-center">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: title?.content,
                        }}
                    ></div>
                </div>
                <div className="flashcardBack">
                    <div className="row">
                        {structure && (
                            <div className="col-12 col-xl-6 mb-3">
                                <div className="flashCardField_label mb-2">
                                    Structure
                                </div>
                                <div
                                    className="flashCardField_content"
                                    dangerouslySetInnerHTML={{
                                        __html: structure?.content || '...',
                                    }}
                                ></div>
                            </div>
                        )}
                        {jlptLevel && (
                            <div className="col-12 col-xl mb-3">
                                <div className="flashCardField_label mb-2">
                                    JLPT Level
                                </div>
                                <div
                                    className="flashCardField_content"
                                    dangerouslySetInnerHTML={{
                                        __html: jlptLevel?.content || '...',
                                    }}
                                ></div>
                            </div>
                        )}
                        {meaning && (
                            <div className="col-12 col-xl-6 mb-3">
                                <div className="flashCardField_label mb-2">
                                    Meaning
                                </div>
                                <div
                                    className="flashCardField_content"
                                    dangerouslySetInnerHTML={{
                                        __html: meaning?.content || '...',
                                    }}
                                ></div>
                            </div>
                        )}
                        {example && (
                            <div className="col-12 col-xl-6 mb-3">
                                <div className="flashCardField_label mb-2">
                                    Example
                                </div>
                                <div
                                    className="flashCardField_content"
                                    dangerouslySetInnerHTML={{
                                        __html: example?.content || '...',
                                    }}
                                ></div>
                            </div>
                        )}
                        {explanation && (
                            <div className="col-12 col-xl-6 mb-3">
                                <div className="flashCardField_label mb-2">
                                    Explanation
                                </div>
                                <div
                                    className="flashCardField_content"
                                    dangerouslySetInnerHTML={{
                                        __html: explanation?.content || '...',
                                    }}
                                ></div>
                            </div>
                        )}
                        {note && (
                            <div className="col-12 col-xl mb-3">
                                <div className="flashCardField_label mb-2">
                                    Note
                                </div>
                                <div
                                    className="flashCardField_content"
                                    dangerouslySetInnerHTML={{
                                        __html: note?.content || '...',
                                    }}
                                ></div>
                            </div>
                        )}
                    </div>
                    <div className="row my-2 flashCardNote">
                        <div className="col-12 col-xl-6">
                            {card?.picture && (
                                <div className="flashCardField_img d-flex align-items-center">
                                    <img
                                        src={card?.picture}
                                        alt="card picture"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-12 col-xl-6">
                            {card?.audio && (
                                <div className="d-flex align-items-center">
                                    <audio
                                        controls
                                        src={card?.audio}
                                        alt="card audio"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GrammarCard
