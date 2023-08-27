import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'

import TestService from '../../../services/TestService'
import { getUser } from '../../../features/user/userAction'

import Pagination from '../../../components/Pagination'

import { CloseIcon } from '../../../components/icons'
import '../../../assets/styles/test.css'
import HistoryService from '../../../services/HistoryService'
import { useTranslation } from 'react-i18next'

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
    const [showSubmitModal, setShowSubmitModal] = useState(false)
    const [showResultModal, setShowResultModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [testEnd, setTestEnd] = useState({})

    const [second, setSecond] = useState(null)
    const [minute, setMinute] = useState(null)
    const [endSecond, setEndSecond] = useState(null)
    const [endMinute, setEndMinute] = useState(null)

    const { userLanguage } = useSelector((state) => state.user)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    var totalSeconds = 0
    var handleCount = 0

    function setTime() {
        ++totalSeconds
        const tempSecond = pad(totalSeconds % 60)
        setSecond(tempSecond)
        const minutes = pad(parseInt(totalSeconds / 60))
        setMinute(minutes)
        document.getElementById('secondsTest').innerHTML = tempSecond
        document.getElementById('minutesTest').innerHTML = minutes
    }

    // end test
    useEffect(() => {
        if (
            endMinute !== null &&
            endSecond !== null &&
            second !== null &&
            minute !== null &&
            Number(second) === Number(endSecond) &&
            Number(minute) === Number(endMinute)
        ) {
            console.log(
                Number(second),
                Number(endMinute),
                Number(minute),
                Number(endSecond)
            )
            setIsEnd(true)
            handleSubmit()
        }
    }, [endMinute, endSecond, second, minute])

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
                const tempTest = tempQuestions.questionList[0]?.question?.test
                setTest(tempTest)
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
                // time end test
                if (tempTest?.duration) {
                    const tempDuration = Number(tempTest.duration)
                    const tempEndMinute = Math.floor(tempDuration)
                    // console.log((tempDuration - tempEndMinute) * 60)
                    setEndSecond((tempDuration - tempEndMinute) * 60)
                    setEndMinute(tempEndMinute)
                }
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
                        setShowSubmitModal(true)
                        return
                    }
                } else {
                    if (!ans) {
                        setShowSubmitModal(true)
                        return
                    }
                }
            }
        } else {
            handleSubmit()
        }
    }

    const handleClearInterval = () => {
        // Clear any timeout/interval up to that id
        const interval_id = window.setInterval(function () {},
        Number.MAX_SAFE_INTEGER)
        for (let i = 1; i < interval_id; i++) {
            window.clearInterval(i)
        }
    }

    const handleSubmit = async () => {
        handleClearInterval()
        setShowConfirmModal(false)
        setShowSubmitModal(false)
        setLoading(true)
        try {
            var tempResults = [...results]
            for (let index = 0; index < questions.length; index++) {
                const ques = questions[index]
                if (ques.question.questionType.id === 1) {
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
            setResults(tempResults)
            const tempEnd = (await TestService.endTest(tempResults)).data
            setTestEnd(tempEnd)
            setIsEnd(true)
            setShowResultModal(true)
            HistoryService.createHistory({
                historyType: { id: 6 },
                user: { id: userInfo.id, username: userInfo.username },
                classroom: { id: test.classroom.id },
            })
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
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
                        disabled={loading}
                    >
                        {t('sb')}
                    </button>
                    <button
                        className="quizClose_btn ms-3 d-flex align-items-center"
                        onClick={() => {
                            if (isEnd) {
                                navigate(
                                    `/class/${test?.classroom?.id}/test/${id}/details`
                                )
                            } else {
                                setShowConfirmModal(true)
                            }
                        }}
                    >
                        <CloseIcon strokeWidth="2" />
                    </button>
                </div>
            </div>
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
                            {currentQuestion?.question?.video && (
                                <video
                                    controls
                                    src={currentQuestion?.question?.video}
                                />
                            )}
                            <div className="row">
                                {currentQuestion?.question?.picture && (
                                    <div className="col-6">
                                        <img
                                            src={
                                                currentQuestion?.question
                                                    ?.picture
                                            }
                                            className="quizQues_img"
                                        />
                                    </div>
                                )}
                                {currentQuestion?.question?.audio && (
                                    <div className="col-6">
                                        <audio
                                            controls
                                            src={
                                                currentQuestion?.question?.audio
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* answer */}
                        {/* written */}
                        {currentQuestion?.question?.questionType?.id === 1 && (
                            <div>
                                <div className="quizQues_label my-4">
                                    {t('yanswer')}
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
                                            {t('correctans')}
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
                                    {t('choose')}
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
                                            {t('correctans')}
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
                                    {t('choose')}
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
                                            {t('true')}
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
                                            {t('false')}
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
            {/* submit modal */}
            <Modal
                className="testSubmitModal"
                show={showSubmitModal}
                onHide={() => {
                    setShowSubmitModal(false)
                }}
            >
                <Modal.Body>
                    <h2 className="modal-title mb-2">
                        You haven't answered all the questions.
                    </h2>
                    <p className="modal-text">
                        Would you like to review the skipped questions or submit
                        the test now?
                    </p>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <button
                        type="button"
                        className="btn btn-outline-secondary me-2"
                        onClick={() => setShowSubmitModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-warning"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Submit test
                    </button>
                </Modal.Footer>
            </Modal>
            {/* Results */}
            <Modal
                show={showResultModal}
                onHide={() => {
                    setShowResultModal(false)
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Finished!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Mark: {testEnd?.mark}/100</p>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-light"
                        onClick={() => {
                            navigate(
                                `/class/${test?.classroom?.id}/test/${id}/details`
                            )
                        }}
                    >
                        Exit
                    </button>
                    <button
                        className="btn btn-info"
                        onClick={() => {
                            setShowResultModal(false)
                        }}
                    >
                        Review
                    </button>
                </Modal.Footer>
            </Modal>
            {/* confirm modal */}
            <Modal
                className="testSubmitModal"
                show={showConfirmModal}
                onHide={() => {
                    setShowConfirmModal(false)
                }}
            >
                <Modal.Body className="pb-2">
                    <h5 className="modal-title mb-3">
                        Are you sure you want to turn it off?
                    </h5>
                    <p className="modal-text">
                        Are you sure you want to turn it off? If you turn it
                        off, all test results will be lost and you will get 0.
                    </p>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <button
                        type="button"
                        className="btn btn-outline-secondary me-2"
                        onClick={() => setShowConfirmModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-warning"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Yes, I want to out.
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default DoTest
