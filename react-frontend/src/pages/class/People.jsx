import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import ClassService from '../../services/ClassService'
import ClassLearnerService from '../../services/ClassLearnerService'

import defaultAvatar from '../../assets/images/default_avatar.png'

const People = () => {
    const { userInfo } = useSelector((state) => state.user)

    const { id } = useParams()

    const [classroom, setClassroom] = useState({})
    const [learners, setLearners] = useState([])

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempClass = (await ClassService.getClassroomById(id)).data
                setClassroom(tempClass)
                const tempLearners = (
                    await ClassLearnerService.filterGetLeaner(
                        '',
                        `=${id}`,
                        `=${1}`,
                        '',
                        '',
                        '',
                        ''
                    )
                ).data.list
                setLearners(tempLearners)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [userInfo])

    return (
        <div>
            <div className="people_section">
                <div className="people_heading mb-3">
                    <h2>Tutor</h2>
                </div>
                <div className="ps-3 d-flex align-items-center">
                    <img
                        className="people_avatar"
                        src={classroom?.user?.avatar || defaultAvatar}
                    />
                    <span className="people_username">
                        {classroom?.user?.username}
                    </span>
                </div>
            </div>
            <div className="mt-5 people_section">
                <div className="people_heading mb-3 d-flex justify-content-between">
                    <h2>Members</h2>
                    <p>{learners?.length} members</p>
                </div>
                {learners?.map((learner, index) => (
                    <div className="ps-3 mb-2 d-flex align-items-center" key={index}>
                        <img
                            className="people_avatar"
                            src={learner?.avatar || defaultAvatar}
                        />
                        <span className="people_username">
                            {learner?.username}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default People
