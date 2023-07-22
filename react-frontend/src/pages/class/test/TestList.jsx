import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import ClassService from '../../../services/ClassService'
import TestService from '../../../services/TestService'

import DeleteTest from './DeleteTest'

import { AddIcon } from '../../../components/icons'
import empty from '../../../assets/images/assign_empty.jpg'
import './test.css'

const TestList = () => {
    const navigate = useNavigate()

    const { id } = useParams()

    const [tests, setTests] = useState([])
    const [classroom, setClassroom] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const tempClass = (await ClassService.getClassroomById(id)).data
            setClassroom(tempClass)
            const tempTests = (
                await TestService.getFilterList(
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    `=${tempClass.id}`,
                    '',
                    '=10'
                )
            ).data.list
            setTests(tempTests)
        }
        if (id) {
            fetchData()
        }
    }, [id])

    return (
        <div>
            <div>
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
            </div>
            {tests?.length === 0 && (
                <div className="emptyTests_container d-flex flex-column align-items-center justify-content-center">
                    <img src={empty} alt="" />
                    <p className="mb-2 emptyTests_heading">
                        This is where you’ll assign test
                    </p>
                    <p className="emptyTests_content">
                        You can add test for the class, then organize it into
                        topics
                    </p>
                </div>
            )}
            <div
                className="accordion mt-4 accordionAssignments"
                id="accordionTests"
            >
                {tests?.map((test, index) => (
                    <div className="accordion-item" key={test.id}>
                        <button
                            className="accordion-button collapsed d-flex justify-content-between align-items-center"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#test${test?.id}`}
                            aria-expanded="false"
                            aria-controls={`test${test?.id}`}
                        >
                            <div>{test.title || '...'}</div>
                            <div>
                                {test._draft
                                    ? 'Draft'
                                    : test?.due_date
                                    ? `Due ${test?.due_date}`
                                    : `Posted ${test?.created_date}`}
                            </div>
                        </button>
                        <div
                            id={`test${test?.id}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionTests"
                        >
                            <div className="accordion-body">
                                <p>
                                    {test?.due_date
                                        ? `Posted ${test?.created_date}`
                                        : 'No due date'}
                                </p>
                                <div className="mt-2 d-flex justify-content-between">
                                    <button className="viewTest_btn">
                                        View details
                                    </button>
                                    <div className="d-flex">
                                        <div className="asignInfo_block">
                                            <div className="assignInfo_number">
                                                0
                                            </div>
                                            <div className="assignInfo_title">
                                                Turned in
                                            </div>
                                        </div>
                                        <div className="asignInfo_block">
                                            <div className="assignInfo_number">
                                                1
                                            </div>
                                            <div className="assignInfo_title">
                                                Assigned
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 d-flex justify-content-between">
                                    <button
                                        className="editTest_btn"
                                        onClick={() => {
                                            navigate(`../edit-test/${test?.id}`)
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

export default TestList
