import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import ClassService from '../../../services/ClassService'
import TestService from '../../../services/TestService'

import DeleteTest from './DeleteTest'

import { AccountIcon, AddIcon, TestIcon } from '../../../components/icons'
import empty from '../../../assets/images/tutor_assign_empty.png'
import './test.css'

const TestList = () => {
    const navigate = useNavigate()

    const { id } = useParams()

    const { userInfo } = useSelector((state) => state.user)

    const [tests, setTests] = useState([])
    const [classroom, setClassroom] = useState({})
    const [loading, setLoading] = useState(true)
    const [today, setToday] = useState(new Date())
    const [loadingCount, setLoadingCount] = useState(false)

    function getToday() {
        const today = new Date()
        return (
            today.getFullYear() +
            '-' +
            padWithLeadingZeros(today.getMonth() + 1, 2) +
            '-' +
            padWithLeadingZeros(today.getDate(), 2) +
            'T' +
            padWithLeadingZeros(today.getHours(), 2) +
            ':' +
            padWithLeadingZeros(today.getMinutes(), 2)
        )
    }

    function padWithLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0')
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const tempClass = (await ClassService.getClassroomById(id)).data
                setClassroom(tempClass)
                const tempTests = (
                    await TestService.getFilterList(
                        '',
                        '',
                        '',
                        `${
                            userInfo.id === tempClass.user.id
                                ? ''
                                : `=${getToday()}`
                        }`,
                        '',
                        '',
                        `${userInfo.id === tempClass.user.id ? '' : `=0`}`,
                        '',
                        '',
                        '',
                        `=${tempClass.id}`,
                        '',
                        '=10'
                    )
                ).data.list
                setTests(tempTests)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
            setLoading(false)
        }
        if (id) {
            fetchData()
        }
    }, [id])

    const handleCountSubmission = async (test, index) => {
        if (userInfo?.id === classroom?.user?.id && !test?.attempted) {
            setLoadingCount(true)
            try {
                const tempCountSubmit = (
                    await TestService.getNumAttemptTest(test.id, classroom.id)
                ).data
                const attempted = tempCountSubmit.attempted
                const notattempted = tempCountSubmit.notattempted
                var tempTests = [...tests]
                tempTests[index] = {
                    ...test,
                    attempted,
                    notattempted,
                }
                setTests(tempTests)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
            setLoadingCount(false)
        }
    }

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
                <div>
                    {userInfo?.id === classroom?.user?.id ? (
                        <button
                            className="createTest_btn"
                            onClick={() => {
                                navigate('../create-test')
                            }}
                        >
                            <AddIcon
                                className="createTestIcon_btn"
                                size="1.125rem"
                                strokeWidth="2.25"
                            />
                            Create
                        </button>
                    ) : (
                        <div>
                            <button className="btn btn-outline-primary fw-semibold d-flex align-items-center">
                                <AccountIcon
                                    className="createAssignIcon_btn"
                                    size="20px"
                                    strokeWidth="2.25"
                                />
                                <span>View your work</span>
                            </button>
                        </div>
                    )}
                </div>
                {tests?.length === 0 && (
                    <div className="emptyTests_container d-flex flex-column align-items-center justify-content-center">
                        <img src={empty} alt="" />
                        <p className="mb-2 emptyTests_heading">
                            This is where you’ll assign test
                        </p>
                        <p className="emptyTests_content">
                            You can add test for the class, then organize it
                            into topics
                        </p>
                    </div>
                )}
                <div
                    className="accordion mt-4 accordionAssignments"
                    id="accordionTests"
                >
                    {tests?.map((test, index) => (
                        <div
                            className="accordion-item"
                            key={test.id}
                            onClick={() => handleCountSubmission(test, index)}
                        >
                            <button
                                className="accordion-button collapsed d-flex justify-content-between align-items-center"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#test${test?.id}`}
                                aria-expanded="false"
                                aria-controls={`test${test?.id}`}
                            >
                                <div className="d-flex align-items-center">
                                    <div
                                        className={`accordionAssign_icon ${
                                            (test._draft ||
                                                (!test._draft &&
                                                    new Date(test.start_date) >=
                                                        new Date())) &&
                                            'disabled'
                                        }`}
                                    >
                                        <TestIcon
                                            size="24px"
                                            strokeWidth="1.75"
                                        />
                                    </div>
                                    <div>{test.title || '...'}</div>
                                </div>
                                <div>
                                    {test?._draft
                                        ? 'Draft'
                                        : test?.start_date &&
                                          new Date(test?.start_date) > today
                                        ? `Scheduled for ${test?.start_date}`
                                        : test?.due_date
                                        ? `Due ${test?.due_date}`
                                        : 'No due date'}
                                </div>
                            </button>
                            <div
                                id={`test${test?.id}`}
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionTests"
                            >
                                <div className="accordion-body">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>Posted {test?.created_date}</div>
                                        {userInfo?.id !==
                                            classroom?.user?.id && <div></div>}
                                    </div>
                                    <div className="mt-3 d-flex justify-content-between">
                                        <button
                                            className="viewTest_btn"
                                            onClick={() =>
                                                navigate(
                                                    `../test/${test?.id}/details`
                                                )
                                            }
                                        >
                                            View details
                                        </button>
                                        {userInfo?.id ===
                                            classroom?.user?.id && (
                                            <div className="d-flex">
                                                <div className="asignInfo_block">
                                                    <div className="assignInfo_number">
                                                        {loadingCount && '...'}
                                                        {test?.attempted}
                                                    </div>
                                                    <div className="assignInfo_title">
                                                        Turned in
                                                    </div>
                                                </div>
                                                <div className="asignInfo_block">
                                                    <div className="assignInfo_number">
                                                        {loadingCount && '...'}
                                                        {test?.notattempted}
                                                    </div>
                                                    <div className="assignInfo_title">
                                                        Assigned
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {userInfo?.id === classroom?.user?.id && (
                                        <div className="mt-5 d-flex justify-content-between">
                                            <button
                                                className="editTest_btn"
                                                onClick={() => {
                                                    navigate(
                                                        `../edit-test/${test?.id}`
                                                    )
                                                }}
                                            >
                                                Edit test
                                            </button>
                                            <button
                                                className="deleteTest_btn"
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target={`#deleteTestModal${test?.id}`}
                                            >
                                                Delete test
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <DeleteTest
                                    index={index}
                                    test={test}
                                    tests={tests}
                                    stateChanger={setTests}
                                    classroom={classroom}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default TestList
