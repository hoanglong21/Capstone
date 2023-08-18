import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ClassService from '../../services/ClassService'
import StudySetService from '../../services/StudySetService'

import { CloseIcon, SearchIcon } from '../../components/icons'

const Sets = () => {
    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [classroom, setClassroom] = useState({})
    const [sets, setSets] = useState([])

    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')

    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // class
                const tempClass = (await ClassService.getClassroomById(id)).data
                setClassroom(tempClass)
                // sets
                const tempSets = (
                    await StudySetService.getFilterListByClass(
                        `=${userInfo?.id}`,
                        `${search ? `=${search}` : ''}`,
                        `=${id}`,
                        '=0',
                        '',
                        '',
                        `=${page}`,
                        '=5'
                    )
                ).data
                setTotalItems(tempSets.totalItems)
                setSets(tempSets.list)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (id && userInfo?.id) {
            fetchData()
        }
    }, [id, userInfo, search, page])

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div
                    className="spinner-border"
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
                <form className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={searchInput || ''}
                        onChange={(event) => {
                            setSearchInput(event.target.value)
                        }}
                    />
                    {searchInput && (
                        <button
                            className="btn btn-outline-secondary px-2"
                            type="button"
                            onClick={() => {
                                setSearch('')
                                setSearchInput('')
                            }}
                        >
                            <CloseIcon />
                        </button>
                    )}
                    <button
                        className="btn btn-outline-secondary px-2"
                        type="submit"
                        onClick={(event) => {
                            event.preventDefault()
                            setSearch(searchInput)
                        }}
                    >
                        <SearchIcon />
                    </button>
                </form>
                {search ? <div>No matching found.</div> : <div></div>}
            </div>
        )
    }
}
export default Sets
