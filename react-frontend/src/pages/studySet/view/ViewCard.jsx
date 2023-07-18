import { useEffect, useState } from 'react'
import ContentService from '../../../services/ContentService'

const ViewCard = ({ card }) => {
    const [term, setTerm] = useState('')
    const [definition, setDefinition] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const tempContents = (await ContentService.getAllByCardId(card.id))
                .data
            const type = card.studySet.studySetType.id
            if (type === 1) {
                setTerm(tempContents[0].content)
                setDefinition(tempContents[1].content)
            } else if (type === 2) {
                setTerm(tempContents[0].content)
                setDefinition(tempContents[1].content)
            } else if (type === 3) {
                setTerm(tempContents[0].content)
                setDefinition(tempContents[2].content)
            }
        }
        fetchData()
    }, [card.id])

    return (
        <div className="setPageTerm mb-3">
            <div className="row d-flex align-items-center">
                <div
                    className="col-3"
                    style={{ borderRight: '0.125rem solid #f6f7fb' }}
                >
                    <div className="setPageTerm_termText">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: term ? term : '...',
                            }}
                        ></div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="setPageTerm_definitionText">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: definition ? definition : '...',
                                }}
                            ></div>
                        </div>
                        <div className="setPageTerm_imageWrap d-flex align-items-center">
                            {card.picture && <img src={card?.picture} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewCard
