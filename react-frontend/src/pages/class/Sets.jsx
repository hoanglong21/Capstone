import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ClassService from '../../services/ClassService'
import StudySetService from '../../services/StudySetService'

const Sets = () => {
    const { id } = useParams()

    const [classroom, setClassroom] = useState({})
    const [sets, setSets] = useState([])

    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            // class
            const tempClass = (await ClassService.getClassroomById(id)).data
            setClassroom(tempClass)
            // sets
            const tempSets = (
                await StudySetService.getFilterListByClass(
                    `${search ? `=${search}` : ''}`,
                    `=${id}`,
                    '=1',
                    '',
                    '',
                    `=${page}`,
                    '=10'
                )
            ).data
            setTotalItems(tempSets.totalItems)
            setSets(tempSets.list)
        }
        if (id) {
            fetchData()
        }
    }, [id, search, page])

    return <div>Sets</div>
}
export default Sets
