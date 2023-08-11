import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { deleteFolder } from '../../../features/fileManagement'
import TestService from '../../../services/TestService'

import { OptionHorIcon } from '../../../components/icons'

const TestDetails = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    const { test_id } = useParams()

    const { userInfo } = useSelector((state) => state.user)

    const [test, setTest] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // test
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
        if (test_id && userInfo?.id) {
            fetchData()
        }
    }, [test_id, userInfo])

    const handleDelete = async (e) => {
        e.preventDefault()
        // clear validation
        setLoading(true)
        try {
            await TestService.deleteTest(test_id)
            document
                .getElementById(`closeDeleteTestDetailModal${test_id}`)
                .click()
            navigate(`/class/${id}/tests`)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    const handleCopyLink = (event) => {
        navigator.clipboard.writeText(window.location.href)
    }

    return (
        <div className="instruction_container">
            <div className="instruction_main">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div>
                        <div className="instruction_heading">
                            {test?.title
                                ? test?.title
                                : test?._draft
                                ? 'Draft'
                                : '...'}
                        </div>
                        <div className="d-flex mt-1 instruction_info">
                            <div>{test?.user?.username}</div>
                            <div className="mx-1">·</div>
                            <div>
                                {test?.created_date}{' '}
                                {test?.modified_date
                                    ? `(Edited ${test?.modified_date})`
                                    : ''}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <button
                            className="btn btn-primary me-2"
                            data-bs-toggle="modal"
                            data-bs-target={`#startTestModal${test_id}`}
                        >
                            Do Test
                        </button>
                        <div className="dropdown">
                            <button
                                className="btn btn-outline-secondary icon-outline-secondary "
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <OptionHorIcon />
                            </button>
                            <ul className="dropdown-menu">
                                {userInfo?.id === test?.classroom?.user?.id && (
                                    <div>
                                        <li>
                                            <Link
                                                className="dropdown-item py-1 px-3 d-flex align-items-center"
                                                type="button"
                                                to={`../../../edit-test/${test_id}`}
                                                relative="path"
                                            >
                                                Edit
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item py-1 px-3 d-flex align-items-center"
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target={`#deleteTestDetailModal${test_id}`}
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    </div>
                                )}
                                <li>
                                    <button
                                        className="dropdown-item py-1 px-3 d-flex align-items-center"
                                        type="button"
                                        onClick={handleCopyLink}
                                    >
                                        Copy link
                                    </button>
                                </li>
                                {userInfo?.id !== test?.classroom?.user?.id && (
                                    <div>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item py-1 px-3 d-flex align-items-center"
                                                type="button"
                                            >
                                                Report
                                            </button>
                                        </li>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-3 instruction_date">
                    <div>
                        {test?.start_date
                            ? `Start ${test?.start_date}`
                            : 'No start date'}
                    </div>
                    <div>
                        {test?.due_date
                            ? `Due ${test?.due_date}`
                            : 'No due date'}
                    </div>
                </div>
            </div>
            {/* delete modal */}
            <div
                className="modal fade assignDeleteModal"
                tabIndex="-1"
                id={`deleteTestDetailModal${test_id}`}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete test?</h5>
                            <button
                                id={`closeDeleteTestDetailModal${test_id}`}
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Test results and comments will also be deleted
                            </p>
                            <div className="text-end mt-4">
                                <button
                                    type="button"
                                    className="btn btn-secondary me-3"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div
                                            className="spinner-border text-secondary mx-auto mb-1"
                                            role="status"
                                            id="loading"
                                        >
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    ) : (
                                        'Delete'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* start test modal */}
            <div
                className="modal fade startTestModal"
                tabIndex="-1"
                id={`startTestModal${test_id}`}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>
                                Are you sure you want to start taking the test?
                            </p>
                            <div className="text-end mt-4">
                                <button
                                    id="startTestModalClose"
                                    type="button"
                                    className="btn btn-secondary btn-sm me-3"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => {
                                        document
                                            .getElementById(
                                                'startTestModalClose'
                                            )
                                            .click()
                                        navigate(`/do-test/${test?.id}`)
                                    }}
                                >
                                    Start
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TestDetails
