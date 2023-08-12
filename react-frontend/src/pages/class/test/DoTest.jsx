import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import TestService from '../../../services/TestService'
import { getUser } from '../../../features/user/userAction'

import { CloseIcon } from '../../../components/icons'
import '../../../assets/styles/test.css'
import Pagination from '../../../components/Pagination'

const DoTest = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()

    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    const [test, setTest] = useState({})
    const [testLearner, setTestLearner] = useState({})
    const [questions, setQuestions] = useState([])

    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [answers, setAnswers] = useState([])
    const [results, setResults] = useState([])
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const [isEnd, setIsEnd] = useState(false)

    var totalSeconds = 0
    var handleCount = 0

    function setTime() {
        ++totalSeconds
        document.getElementById('secondsTest').innerHTML = pad(
            totalSeconds % 60
        )
        document.getElementById('minutesTest').innerHTML = pad(
            parseInt(totalSeconds / 60)
        )
    }

    function pad(val) {
        var valString = val + ''
        if (valString.length < 2) {
            return '0' + valString
        } else {
            return valString
        }
    }

    // fetch userInfo
    useEffect(() => {
        if (userToken && !userInfo?.id) {
            dispatch(getUser(userToken))
        }
    }, [userToken, userInfo])

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // questions
                const tempQuestions = (
                    await TestService.startTest(userInfo.id, id)
                ).data
                setQuestions(tempQuestions.questionList)
                // test
                setTest(tempQuestions.questionList[0]?.question?.test)
                // set test learner
                setTestLearner(tempQuestions.testLearner)
                // current question
                setCurrentQuestion(tempQuestions.questionList[0])
                // set answers
                var tempAnswers = []
                var tempResults = []
                for (
                    let index = 0;
                    index < tempQuestions.questionList.length;
                    index++
                ) {
                    if (
                        tempQuestions.questionList[index].question.questionType
                            .id === 2
                    ) {
                        tempAnswers.push([])
                    } else {
                        tempAnswers.push(null)
                    }
                    tempResults.push({
                        question: {
                            id: tempQuestions.questionList[index].question.id,
                        },
                        testLearner: { id: tempQuestions.testLearner.id },
                        _true: null,
                    })
                }
                setAnswers(tempAnswers)
                // results
                setResults(tempResults)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (id && userInfo?.id) {
            fetchData()
            handleCount = setInterval(setTime, 1000)
        }
        return () => {
            clearInterval(handleCount)
        }
    }, [id, userInfo])

    const handleChangeAnswer = (ans, index) => {
        if (!isEnd) {
            var tempAnswers = [...answers]
            tempAnswers[index] = ans
            if (ans && answers[index] === null) {
                setProgress(progress + 1)
            }
            if (!ans && answers[index] !== null) {
                setProgress(progress + 1)
            }
            setAnswers(tempAnswers)
        }
    }

    const handleChangeMultipleAnswer = (ans, index, isExist) => {
        if (!isEnd) {
            var tempAnswers = [...answers]
            if (isExist) {
                const temp = tempAnswers[index].filter(
                    (answer) => answer !== ans
                )
                tempAnswers[index] = [...temp]
            } else {
                tempAnswers[index] = [...tempAnswers[index], ans]
            }
            if (tempAnswers[index].length > 0 && answers[index].length === 0) {
                setProgress(progress + 1)
            }
            if (tempAnswers[index].length === 0 && answers[index].length > 0) {
                setProgress(progress - 1)
            }
            setAnswers(tempAnswers)
        }
    }

    const handleCheckSubmit = () => {
        // validation
        if (progress < questions?.length) {
            for (let index = 0; index < answers.length; index++) {
                const ans = answers[index]
                if (questions[index].question.questionType.id === 2) {
                    if (ans.length === 0) {
                        document
                            .getElementById('testSubmitModalToggleBtn')
                            .click()
                        return
                    }
                } else {
                    if (!ans) {
                        document
                            .getElementById('testSubmitModalToggleBtn')
                            .click()
                        return
                    }
                }
            }
        } else {
            handleSubmit()
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            var tempResults = [...results]
            for (let index = 0; index < questions.length; index++) {
                const ques = questions[index]
                if (ques.question.questionType.id === 1) {
                    console.log(answers[index], ques.answerList[0].content)
                    if (answers[index] === ques.answerList[0].content) {
                        tempResults[index]._true = 1
                    } else {
                        tempResults[index]._true = 0
                    }
                } else if (ques.question.questionType.id === 2) {
                    var isCorrect = 1
                    for (const ans of ques.answerList) {
                        if (!answers[index].includes(ans.id) && ans._true) {
                            isCorrect = 0
                            break
                        }
                    }
                    tempResults[index]._true = isCorrect
                } else if (ques.question.questionType.id === 3) {
                    var isCorrect = 0
                    for (const ans of ques.answerList) {
                        if (ans._true && answers[index] === ans.content) {
                            isCorrect = 1
                            break
                        }
                    }
                    tempResults[index]._true = isCorrect
                }
            }
            const tempEnd = (await TestService.endTest(tempResults)).data
            clearInterval(handleCount)
            setResults(tempResults)
            document.getElementById('testSubmitModalCloseBtn')?.click()
            setIsEnd(true)
            setLoading(false)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    return (
        <div className="d-flex flex-column h-100">
            {/* Header */}
            <div className="doTest_header d-flex justify-content-between align-items-center">
                <h3>{test?.title}</h3>
                <div>
                    <label id="minutesTest">00</label>:
                    <label id="secondsTest">00</label>
                </div>
                <div className="d-flex">
                    <button
                        className="btn btn-primary"
                        onClick={handleCheckSubmit}
                    >
                        Submit
                    </button>
                    <button
                        className="quizClose_btn ms-3 d-flex align-items-center"
                        onClick={() => {
                            navigate(`/test/${id}`)
                        }}
                    >
                        <CloseIcon strokeWidth="2" />
                    </button>
                </div>
            </div>
            {/* Question */}
            <div className="doTest_container mt-5 mb-4 flex-grow-1">
                <div className="card">
                    <div className="quizQues_number">
                        {currentIndex + 1} of {questions?.length}
                    </div>
                    <div className="card-body d-flex flex-column">
                        {/* question */}
                        <div className="flex-fill">
                            <div>{currentQuestion?.question?.question}</div>
                            {/* picture + audio + video */}
                            {currentQuestion?.video && (
                                <video controls src={currentQuestion?.video} />
                            )}
                        </div>
                        <div className="row">
                            {currentQuestion?.picture && (
                                <div className="col-6">
                                    <img
                                        src={currentQuestion?.picture}
                                        className="quizQues_img"
                                    />
                                </div>
                            )}
                            {currentQuestion?.audio && (
                                <div className="col-6">
                                    <audio
                                        controls
                                        src={currentQuestion?.audio}
                                    />
                                </div>
                            )}
                        </div>
                        {/* answer */}
                        {/* written */}
                        {currentQuestion?.question?.questionType?.id === 1 && (
                            <div>
                                <div className="quizQues_label my-4">
                                    Your answer
                                </div>
                                <input
                                    className={`form-control quizAns_input ${
                                        results[currentIndex]?._true === 0
                                            ? 'incorrect'
                                            : results[currentIndex]?._true === 1
                                            ? 'correct'
                                            : ''
                                    }`}
                                    type="text"
                                    placeholder="Type your answer here"
                                    readOnly={
                                        results[currentIndex]?._true !== null
                                    }
                                    value={answers[currentIndex] || ''}
                                    onChange={(event) =>
                                        handleChangeAnswer(
                                            event.target.value,
                                            currentIndex
                                        )
                                    }
                                />
                                {results[currentIndex]?._true === 0 && (
                                    <div>
                                        <div className="quizQues_label my-4">
                                            Correct answer
                                        </div>
                                        <div className="quizQues_answer correct">
                                            <div className="learnCorrectAnswer">
                                                {
                                                    currentQuestion
                                                        ?.answerList[0].content
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {/* multiple */}
                        {currentQuestion?.question?.questionType?.id === 2 && (
                            <div>
                                {/* answer */}
                                <div className="quizQues_label my-4">
                                    Choose the answer
                                </div>
                                <div className="row">
                                    {currentQuestion?.answerList.map(
                                        (ans, ansIndex) => (
                                            <div
                                                key={ansIndex}
                                                className="col-12 mb-3"
                                            >
                                                <div
                                                    className={`quizQues_answer ${
                                                        Array.isArray(
                                                            answers[
                                                                currentIndex
                                                            ]
                                                        )
                                                            ? answers[
                                                                  currentIndex
                                                              ]?.includes(
                                                                  ans?.id
                                                              ) &&
                                                              results[
                                                                  currentIndex
                                                              ]?._true === 0
                                                                ? 'incorrect'
                                                                : answers[
                                                                      currentIndex
                                                                  ]?.includes(
                                                                      ans?.id
                                                                  ) &&
                                                                  results[
                                                                      currentIndex
                                                                  ]?._true === 1
                                                                ? 'correct'
                                                                : answers[
                                                                      currentIndex
                                                                  ]?.includes(
                                                                      ans?.id
                                                                  )
                                                                ? 'active'
                                                                : ''
                                                            : ''
                                                    }`}
                                                    disabled={
                                                        results[currentIndex]
                                                            ?._true !== null
                                                    }
                                                    onClick={() => {
                                                        handleChangeMultipleAnswer(
                                                            ans?.id,
                                                            currentIndex,
                                                            answers[
                                                                currentIndex
                                                            ]?.includes(ans?.id)
                                                        )
                                                    }}
                                                >
                                                    <div>{ans?.content}</div>
                                                    {/* picture + audio + video */}
                                                    {ans?.video && (
                                                        <video
                                                            controls
                                                            src={ans?.video}
                                                        />
                                                    )}
                                                    <div className="row">
                                                        {ans?.picture && (
                                                            <div className="col-6">
                                                                <img
                                                                    src={
                                                                        ans?.picture
                                                                    }
                                                                    className="quizQues_img"
                                                                />
                                                            </div>
                                                        )}
                                                        {ans?.audio && (
                                                            <div className="col-6">
                                                                <audio
                                                                    controls
                                                                    src={
                                                                        ans?.audio
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                                {results[currentIndex]?._true === 0 && (
                                    <div>
                                        <div className="quizQues_label my-4">
                                            Correct answer
                                        </div>
                                        <div className="quizQues_answer correct">
                                            {currentQuestion?.answerList.map(
                                                (answer) => {
                                                    if (answer?._true) {
                                                        return (
                                                            <div
                                                                key={answer?.id}
                                                            >
                                                                {
                                                                    answer?.content
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                }
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {/* true false */}
                        {currentQuestion?.question?.questionType?.id === 3 && (
                            <div>
                                {/* answer */}
                                <div className="quizQues_label my-4">
                                    Choose the answer
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div
                                            className={`quizQues_answer ${
                                                answers[currentIndex] ===
                                                    'True' &&
                                                results[currentIndex]?._true ===
                                                    0
                                                    ? 'incorrect'
                                                    : answers[currentIndex] ===
                                                          'True' &&
                                                      results[currentIndex]
                                                          ?._true === 1
                                                    ? 'correct'
                                                    : answers[currentIndex] ===
                                                      'True'
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            disabled={
                                                results[currentIndex]?._true !==
                                                null
                                            }
                                            onClick={() => {
                                                if (
                                                    answers[currentIndex] ===
                                                    'True'
                                                ) {
                                                    handleChangeAnswer(
                                                        null,
                                                        currentIndex
                                                    )
                                                } else {
                                                    handleChangeAnswer(
                                                        'True',
                                                        currentIndex
                                                    )
                                                }
                                            }}
                                        >
                                            True
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div
                                            className={`quizQues_answer ${
                                                answers[currentIndex] ===
                                                    'False' &&
                                                results[currentIndex]?._true ===
                                                    0
                                                    ? 'incorrect'
                                                    : answers[currentIndex] ===
                                                          'False' &&
                                                      results[currentIndex]
                                                          ?._true === 1
                                                    ? 'correct'
                                                    : answers[currentIndex] ===
                                                      'False'
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            disabled={
                                                results[currentIndex]?._true !==
                                                null
                                            }
                                            onClick={() => {
                                                if (
                                                    answers[currentIndex] ===
                                                    'False'
                                                ) {
                                                    handleChangeAnswer(
                                                        null,
                                                        currentIndex
                                                    )
                                                } else {
                                                    handleChangeAnswer(
                                                        'False',
                                                        currentIndex
                                                    )
                                                }
                                            }}
                                        >
                                            False
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Pagination */}
            <Pagination
                className="mb-5"
                currentPage={currentIndex + 1}
                totalCount={questions?.length}
                pageSize={1}
                onPageChange={(page) => {
                    setCurrentIndex(page - 1)
                    setCurrentQuestion(questions[page - 1])
                }}
            />
            {/* Submit modal */}
            <button
                id="testSubmitModalToggleBtn"
                type="button"
                className="d-none"
                data-bs-toggle="modal"
                data-bs-target="#testSubmitModal"
            >
                Submit Quiz
            </button>
            <div className="modal fade quizOptionModal" id="testSubmitModal">
                <div className="modal-dialog modal-lg">
                    <button
                        id="testSubmitModalCloseBtn"
                        type="button"
                        className="d-none"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <h2 className="modal-title mb-2">
                                You haven't answered all the questions.
                            </h2>
                            <p className="modal-text">
                                Would you like to review the skipped questions
                                or submit the test now?
                            </p>
                        </div>
                        <div className="modal-footer border border-0">
                            <button
                                type="button"
                                className="btn btn-outline-secondary me-2"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Submit test
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DoTest
