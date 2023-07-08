import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import DictionaryService from '../../services/DictionaryService'

const VocabDict = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search')

    const [vocabs, setVocabs] = useState([])

    const fetchData = async (searchKey) => {
        const temp = (
            await DictionaryService.getVocabulary(
                '=1',
                '=10',
                `${searchKey ? '=' + searchKey : ''}`
            )
        ).data.list
        setVocabs(temp)
    }

    useEffect(() => {
        fetchData(search ? search : '')
    }, [search])

    return (
        <div>
            <div className="row gap-3">
                <div className="col-2">
                    <h1 className="dictSection_title">
                        Search result {search}
                    </h1>
                    <div className="listWordMatch">
                        {vocabs.map((vocab, index) => (
                            <div className="card item-word" key={index}>
                                <div className="card-body">
                                    <div className="wordKanji">
                                        {vocab.kanji}
                                    </div>
                                    <div className="wordReading">
                                        {vocab.reading}
                                    </div>
                                    <div className="wordSense">
                                        {vocab.sense[0].definition}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-9"></div>
            </div>
        </div>
    )
}
export default VocabDict
