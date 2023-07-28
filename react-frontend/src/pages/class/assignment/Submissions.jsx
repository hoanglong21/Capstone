import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import AssignmentService from '../../../services/AssignmentService'
import { AddIcon, ProfileIcon } from '../../../components/icons'

const Submissions = () => {
    const { id } = useParams()
    const { assign_id } = useParams()

    const { userInfo } = useSelector((state) => state.user)

    const [assignment, setAssignment] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const tempAssignment = (
                await AssignmentService.getAssignmentById(assign_id)
            ).data
            setAssignment(tempAssignment)
        }
        fetchData()
    }, [id])

    return (
        <div>
            {userInfo?.id === assignment?.user?.id ? (
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-8"></div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-4">
                        <div className="card submission_card mt-4">
                            <div className="card-body py-3 px-4">
                                <div className="submission_heading">
                                    Your work
                                </div>
                                <button className="submission_btn d-flex align-items-center justify-content-center w-100 mt-3">
                                    <AddIcon
                                        size="18px"
                                        strokeWidth="2"
                                        className="me-2"
                                    />
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="card submission_card mt-4">
                            <div className="card-body py-3 px-4">
                                <div className="submission_subHeading d-flex align-items-center">
                                    <ProfileIcon size="24px" className="me-2" />
                                    <span>Private comment</span>
                                </div>
                                <button className="submission_CommentBtn d-flex align-items-center justify-content-center mt-3">
                                    Add comment to {assignment?.user?.username}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Submissions
