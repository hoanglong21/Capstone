import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import DictionaryService from '../../services/DictionaryService'
import GrammarDetail from './GrammarDetail'

const GrammarDict = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search')

    const [grammars, setGrammars] = useState([])
    const [grammar, setGrammar] = useState({})
    const [loading, setLoading] = useState(true)
    const [showGrammarDetail, setShowGrammarDetail] = useState(false)

    useEffect(() => {
        if (loading === true && document.getElementById('searchDictBtn')) {
            document.getElementById('searchDictBtn').disabled = true
            document.getElementById(
                'searchDictBtn'
            ).innerHTML = `<div class="d-flex justify-content-center">
                            <div class="spinner-border spinner-border-sm" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>`
            document.getElementById('searchDictInput').readOnly = true
        }
        if (loading === false && document.getElementById('searchDictBtn')) {
            document.getElementById('searchDictBtn').disabled = false
            document.getElementById('searchDictBtn').innerHTML = 'Search'
            document.getElementById('searchDictInput').readOnly = false
        }
    }, [loading])

    useEffect(() => {
        if (showGrammarDetail) {
            document
                .getElementsByTagName('body')[0]
                .classList.add('setPage_modalOpen')
        } else {
            document
                .getElementsByTagName('body')[0]
                .classList.remove('setPage_modalOpen')
        }
    }, [showGrammarDetail])

    const fetchData = async (searchKey) => {
        setLoading(true)
        try {
            const temp = (
                await DictionaryService.getGrammar(
                    '=1',
                    '=40',
                    `${searchKey ? '=' + searchKey : ''}`
                )
            ).data.list
            setGrammars(temp)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData(search ? search : '')
    }, [search])

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div
                    className="spinner-border mt-5"
                    style={{ width: '3rem', height: '3rem' }}
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className="row mt-4 mb-5">
                    {grammars.length == 0 && (
                        <p className="noFound">
                            No grammars matching {search} found
                        </p>
                    )}
                    {grammars.map((grammarInfo, index) => (
                        <div className="grammar-dict-col-3 mb-2" key={index}>
                            <div
                                className="card h-100 grammar_item"
                                onClick={() => {
                                    setGrammar(grammarInfo)
                                    setShowGrammarDetail(true)
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
                {showGrammarDetail && (
                    <GrammarDetail
                        grammar={grammar}
                        showGrammarDetail={showGrammarDetail}
                        setShowGrammarDetail={setShowGrammarDetail}
                    />
                )}
            </div>
        )
    }
}
export default GrammarDict
