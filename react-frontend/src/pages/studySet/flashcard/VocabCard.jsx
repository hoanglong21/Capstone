import { useState, useEffect } from 'react'

import ContentService from '../../../services/ContentService'

const VocabCard = ({ card }) => {
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
        document.getElementById('flipElement')?.classList.toggle('is-flipped')
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
                            __html: contents[0]?.content,
                        }}
                    ></div>
                </div>
                <div className="flashcardBack">
                    <div className="row h-100 p-5 d-flex align-items-center">
                        <div className="col-12 col-lg-8">
                            {contents.map((contentItem, index) => {
                                if (index > 0) {
                                    return (
                                        <div
                                            className="mb-5"
                                            key={contentItem?.id}
                                        >
                                            <div className="flashCardField_label mb-2">
                                                {contentItem?.field.name}
                                            </div>
                                            <div
                                                className="flashCardField_content"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        contentItem?.content ||
                                                        '...',
                                                }}
                                            ></div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <div className="col-12 col-lg-4">
                            {card?.picture && (
                                <div className="mb-4 flashCardField_img d-flex align-items-center">
                                    <img
                                        src={card?.picture}
                                        alt="card picture"
                                    />
                                </div>
                            )}
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

export default VocabCard
