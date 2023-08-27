import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import AssignmentService from '../../../services/AssignmentService'
import TutorSubmission from './TutorSubmission'
import LearnerSubmission from './LearnerSubmission'

import './assignment.css'

const Submissions = () => {
    const navigate = useNavigate()
    
    const { id } = useParams()
    const { assign_id } = useParams()

    const { userInfo } = useSelector((state) => state.user)

    const [assignment, setAssignment] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempAssignment = (
                    await AssignmentService.getAssignmentById(assign_id)
                ).data
                setAssignment(tempAssignment)
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
        }
        fetchData()
    }, [id])

    if (userInfo?.id === assignment?.user?.id) {
        return <TutorSubmission assignment={assignment} />
    } else {
        return <LearnerSubmission assignment={assignment} />
    }
}

export default Submissions
