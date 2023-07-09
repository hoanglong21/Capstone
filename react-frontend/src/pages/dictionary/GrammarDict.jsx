import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import DictionaryService from '../../services/DictionaryService'
import GrammarDetail from './GrammarDetail'

const GrammarDict = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search')

    const [grammars, setGrammars] = useState([])
    const [grammar, setGrammar] = useState({})

    const fetchData = async (searchKey) => {
        const temp = (
            await DictionaryService.getGrammar(
                '=1',
                '=40',
                `${searchKey ? '=' + searchKey : ''}`
            )
        ).data.list
        setGrammars(temp)
    }

    useEffect(() => {
        fetchData(search ? search : '')
    }, [search])

    return (
        <div>
            <div className="row mt-4 mb-5">
                {grammars.map((grammarInfo) => (
                    <div className="col-3 mb-2">
                        <div
                            className="card h-100 grammar_item"
                            onClick={() => {
                                document
                                    .getElementById('grammarDetailOpenBtn')
                                    .click()
                                setGrammar(grammarInfo)
                            }}
                        >
                            <div className="card-body">
                                <div className="grammar_title">
                                    {grammarInfo.title}
                                </div>
                                <div className="grammar_meaning">
                                    {grammarInfo.explanation}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Grammar modal */}
            <button
                type="button"
                className="btn btn-primary d-none"
                id="grammarDetailOpenBtn"
                data-bs-toggle="modal"
                data-bs-target="#grammarDetailModal"
            >
                Launch demo modal
            </button>
            <GrammarDetail grammar={grammar} />
        </div>
    )
}
export default GrammarDict
