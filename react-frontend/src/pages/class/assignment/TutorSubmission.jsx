import { useEffect, useState } from 'react'

import ClassLearnerService from '../../../services/ClassLearnerService'

import defaultAvatar from '../../../assets/images/default_avatar.png'

const TutorSubmission = ({ assignment }) => {
    const [learners, setLearners] = useState([])
    const [submission, setSubmission] = useState({})

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempLearners = (
                    await ClassLearnerService.filterGetLeaner(
                        '',
                        `=${assignment?.classroom?.id}`,
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
        if (assignment?.id) {
            fetchData()
        }
    }, [assignment])

    return (
        <div className="row">
            <div className="col-4 pe-0 border-end">
                <table className="table table-hover submission_table mb-0 h-100">
                    <tbody>
                        {learners?.map((learn, index) => (
                            <tr key={index}>
                                <td className="d-flex align-items-center">
                                    <img
                                        className="submission_learnerAvatar"
                                        src={learn?.avatar || defaultAvatar}
                                        alt=""
                                    />
                                    <span className="submission_learnerUsername ms-4">
                                        {learn?.username}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="col-8">

            </div>
        </div>
    )
}
export default TutorSubmission
