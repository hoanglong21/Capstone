import { useState, useEffect } from 'react'

import ContentService from '../../../services/ContentService'

const KanjiCard = ({ card }) => {
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

    useEffect(() => {
        const fetchData = async () => {
            const tempContents = (await ContentService.getAllByCardId(card.id))
                .data
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
                            __html: character?.content,
                        }}
                    ></div>
                </div>
                <div className="flashcardBack">
                    <div className="row">
                        {strokeOrder?.content && (
                            <div className="col-3 mb-3">
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
                                    <div className="col-6 mb-3">
                                        <div className="flashCardField_label mb-2">
                                            Name
                                        </div>
                                        <div
                                            className="flashCardField_content"
                                            dangerouslySetInnerHTML={{
                                                __html: name?.content || '...',
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {meanings && (
                                    <div className="col-6 mb-3">
                                        <div className="flashCardField_label mb-2">
                                            Meanings
                                        </div>
                                        <div
                                            className="flashCardField_content"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    meanings?.content || '...',
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {onyomi && (
                                    <div className="col-6 mb-3">
                                        <div className="flashCardField_label mb-2">
                                            Onyomi
                                        </div>
                                        <div
                                            className="flashCardField_content"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    onyomi?.content || '...',
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {kunyomi && (
                                    <div className="col-6 mb-3">
                                        <div className="flashCardField_label mb-2">
                                            Kunyomi
                                        </div>
                                        <div
                                            className="flashCardField_content"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    kunyomi?.content || '...',
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {radical && (
                                    <div className="col-6 mb-3">
                                        <div className="flashCardField_label mb-2">
                                            Radical
                                        </div>
                                        <div
                                            className="flashCardField_content"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    radical?.content || '...',
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {example && (
                                    <div className="col-6 mb-3">
                                        <div className="flashCardField_label mb-2">
                                            Example
                                        </div>
                                        <div
                                            className="flashCardField_content"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    example?.content || '...',
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {jlptLevel && (
                                    <div className="col-6 mb-3">
                                        <div className="flashCardField_label mb-2">
                                            JLPT Level
                                        </div>
                                        <div
                                            className="flashCardField_content"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    jlptLevel?.content || '...',
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {strokes && (
                                    <div className="col-6 mb-3">
                                        <div className="flashCardField_label mb-2">
                                            Strokes
                                        </div>
                                        <div
                                            className="flashCardField_content"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    strokes?.content || '...',
                                            }}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-6">
                            {card?.picture && (
                                <div className="flashCardField_img d-flex align-items-center">
                                    <img
                                        src={card?.picture}
                                        alt="card picture"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-6">
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

export default KanjiCard
