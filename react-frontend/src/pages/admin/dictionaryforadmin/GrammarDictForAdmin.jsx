import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import DictionaryService from '../../../services/DictionaryService'
import GrammarDetail from './GrammarDetailForAdmin'
import './dictionary.css'
import Pagination from '../../../components/Pagination'
const GrammarDictForAdmin = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search')
    const [showGrammarDetail, setShowGrammarDetail] = useState(false)
    const [grammars, setGrammars] = useState([])
    const [grammar, setGrammar] = useState({})
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    const fetchData = async (searchKey) => {
        setLoading(true)
        try {
            const temp = (
                await DictionaryService.getGrammar(
                    `=${page}`,
                    '=40',
                    `${searchKey ? '=' + searchKey : ''}`
                )
            ).data
            setGrammars(temp.list)
            setTotalItems(temp.totalItems)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
            if (
                error.message.includes('not exist') ||
                error?.response.data.includes('not exist')
            ) {
                navigate('/notFound')
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData(search ? search : '')
    }, [search, page])

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
                 <Pagination
                        className="mt-5"
                        currentPage={page}
                        totalCount={totalItems}
                        pageSize={40}
                        onPageChange={(page) => {
                            setPage(page)
                        }}
                    />
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
export default GrammarDictForAdmin
