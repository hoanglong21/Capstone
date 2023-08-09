import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import TestService from '../../../services/TestService'
import { getUser } from '../../../features/user/userAction'

import '../../../assets/styles/test.css'

const DoTest = () => {
    const dispatch = useDispatch()

    const { id } = useParams()

    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        if (userToken && !userInfo?.id) {
            dispatch(getUser(userToken))
        }
    }, [userToken, userInfo])

    useEffect(() => {
        const fetchData = async () => {
            const tempQuestions = (await TestService.startTest(userInfo.id, id))
                .data
            setQuestions(tempQuestions)
        }
        if (id && userInfo?.id) {
            fetchData()
        }
    }, [id, userInfo])

    return <div>{/* Header */}</div>
}
export default DoTest
