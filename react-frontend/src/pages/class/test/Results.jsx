import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import TestService from '../../../services/TestService'
import TutorResults from './TutorResults'

const Results = () => {
    const { test_id } = useParams()

    const { userInfo } = useSelector((state) => state.user)

    const [test, setTest] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempTest = (await TestService.getTestById(test_id)).data
                setTest(tempTest)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        fetchData()
    }, [test_id])

    if (userInfo?.id === test?.user?.id) {
        return <TutorResults test={test} />
    } else {
        // return <LearnerSubmission assignment={assignment} />
    }
}
export default Results
