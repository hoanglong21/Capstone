import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'

import StudySetService from '../../../services/StudySetService'
import FieldService from '../../../services/FieldService'
import { getUser } from '../../../features/user/userAction'
import ProgressService from '../../../services/ProgressService'
import HistoryService from '../../../services/HistoryService'

import VocabCard from './VocabCard'
import KanjiCard from './KanjiCard'
import GrammarCard from './GrammarCard'

import {
    StudySetSolidIcon,
    ArrowDownIcon,
    CloseIcon,
    LearnSolidIcon,
    TestSolidIcon,
    ListIcon,
} from '../../../components/icons'
import finishQuizImg from '../../../assets/images/finish_quiz.png'
import FormStyles from '../../../assets/styles/Form.module.css'
import './quiz.css'
import { useTranslation } from 'react-i18next'

const DoQuiz = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { id } = useParams()

    const { userToken } = useSelector((state) => state.auth)
    const { userInfo } = useSelector((state) => state.user)

    const [isAllow, setIsAllow] = useState(true)

    const [studySet, setStudySet] = useState({})
    const [type, setType] = useState(1)
    const [fields, setFields] = useState([])
    const [numNot, setNumNot] = useState(0)
    const [numStill, setNumStill] = useState(0)
    const [numMaster, setNumMaster] = useState(0)
    const [numNotStar, setNumNotStar] = useState(0)
    const [numStillStar, setNumStillStar] = useState(0)
    const [numMasterStar, setNumMasterStar] = useState(0)

    const [questionTypes, setQuestionTypes] = useState([1, 2, 3])
    const [numQues, setNumQues] = useState(0)
    const [writtenPromptWith, setWrittenPromptWith] = useState([])
    const [writtenAnswerWith, setWrittenAnswerWith] = useState(0)
    const [multiplePromptWith, setMultiplePromptWith] = useState([])
    const [multipleAnswerWith, setMultipleAnswerWith] = useState([])
    const [trueFalsePromptWith, setTrueFalsePromptWith] = useState([])
    const [trueFalseAnswerWith, setTrueFalseAnswerWith] = useState([])
    const [showPicture, setShowPicture] = useState(false)
    const [showAudio, setShowAudio] = useState(false)
    const [isStar, setIsStar] = useState(false)

    const [optionQuestionTypes, setOptionQuestionTypes] = useState([1, 2, 3])
    const [optionNumQues, setOptionNumQues] = useState(0)
    const [optionShowPicture, setOptionShowPicture] = useState(false)
    const [optionShowAudio, setOptionShowAudio] = useState(false)
    const [optionWrittenPromptWith, setOptionWrittenPromptWith] = useState([])
    const [optionWrittenAnswerWith, setOptionWrittenAnswerWith] = useState(0)
    const [optionMultiplePromptWith, setOptionMultiplePromptWith] = useState([])
    const [optionMultipleAnswerWith, setOptionMultipleAnswerWith] = useState([])
    const [optionTrueFalsePromptWith, setOptionTrueFalsePromptWith] = useState(
        []
    )
    const [optionTrueFalseAnswerWith, setOptionTrueFalseAnswerWith] = useState(
        []
    )
    const [optionIsStar, setOptionIsStar] = useState(false)
    const [error, setError] = useState(false)

    const [progress, setProgress] = useState(0)
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [skipAnswer, setSkipAnswer] = useState(null)
    const [isEnd, setIsEnd] = useState(false)
    const [results, setResults] = useState([])
    const [correct, setCorrect] = useState(false)
    const [incorrect, setIncorrect] = useState(false)

    const [loading, setLoading] = useState(false)
    const [showOptionModal, setShowOptionModal] = useState(false)
    const [showSubmitModal, setShowSubmitModal] = useState(false)

    const [isAddHistory, setIsAddHistory] = useState(false)
    const { userLanguage } = useSelector((state) => state.user)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    // add history
    useEffect(() => {
        if (isAddHistory === false && userInfo?.id && isEnd === true) {
            try {
                HistoryService.createHistory({
                    historyType: { id: 2 },
                    user: { id: userInfo.id, username: userInfo.username },
                    studySet: { id: id },
                })
                setIsAddHistory(true)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
    }, [userInfo, isEnd, isAddHistory])

    // fetch user info
    useEffect(() => {
        if (userToken && !userInfo?.id) {
            dispatch(getUser(userToken))
        }
    }, [userToken, userInfo])

    // progress header
    useEffect(() => {
        if (!loading && isAllow) {
            const headerHeight =
                document.getElementById('quizHeader').clientHeight
            document.getElementById('quizProgressContainer').style.top =
                headerHeight
        }
    }, [loading, isAllow])

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                setResults([])
                setIsEnd(false)
                setSkipAnswer(null)
                setProgress(0)
                setError('')
                setIsAllow(true)
                // study set
                const tempStudySet = (await StudySetService.getStudySetById(id))
                    .data
                setStudySet(tempStudySet)
                // count
                const tempCounts = (
                    await StudySetService.countCardInSet(userInfo.id, id)
                ).data
                setNumNot(tempCounts['Not studied'])
                setNumStill(tempCounts['Still learning'])
                setNumMaster(tempCounts['Mastered'])
                setNumNotStar(tempCounts['Not studied star'])
                setNumStillStar(tempCounts['Still learning star'])
                setNumMasterStar(tempCounts['Mastered star'])
                // number of questions
                const tempNumQues =
                    tempCounts['Not studied'] +
                    tempCounts['Still learning'] +
                    tempCounts['Mastered']
                if (tempNumQues === 0) {
                    navigate('/notFound')
                    return
                }
                if (tempNumQues < 2) {
                    setIsAllow(false)
                    setLoading(false)
                    return
                }
                setNumQues(tempNumQues)
                setOptionNumQues(tempNumQues)
                // set type
                setType(tempStudySet.studySetType.id)
                // fields
                var tempFields = (
                    await FieldService.getFieldsByStudySetTypeId(
                        tempStudySet.studySetType.id
                    )
                ).data
                if (tempStudySet.studySetType.id === 1) {
                    tempFields.splice(2, 1)
                } else if (tempStudySet.studySetType.id === 2) {
                    tempFields.splice(9, 1)
                } else if (tempStudySet.studySetType.id === 2) {
                    tempFields.splice(3, 1)
                }
                setFields(tempFields)
                // prompt with + answer with
                var tempWrittenPromptWith = [tempFields[0].id]
                var tempWrittenAnsWith = []
                for (let index = 1; index < tempFields.length; index++) {
                    const field = tempFields[index]
                    tempWrittenAnsWith.push(field.id)
                }
                if (tempStudySet.studySetType.id === 1) {
                    setWrittenPromptWith(tempFields[0].id)
                    setOptionWrittenPromptWith(tempFields[0].id)
                    setMultiplePromptWith(tempFields[0].id)
                    setOptionMultiplePromptWith(tempFields[0].id)
                    setMultipleAnswerWith(tempFields[1].id)
                    setOptionMultipleAnswerWith(tempFields[1].id)
                    setTrueFalsePromptWith(tempFields[0].id)
                    setOptionTrueFalsePromptWith(tempFields[0].id)
                    setTrueFalseAnswerWith(tempFields[1].id)
                    setOptionTrueFalseAnswerWith(tempFields[1].id)
                } else {
                    setWrittenPromptWith([...tempWrittenPromptWith])
                    setOptionWrittenPromptWith([...tempWrittenPromptWith])
                    setMultiplePromptWith([...tempWrittenPromptWith])
                    setMultipleAnswerWith([...tempWrittenAnsWith])
                    setOptionMultiplePromptWith([...tempWrittenPromptWith])
                    setOptionMultipleAnswerWith([...tempWrittenAnsWith])
                    setTrueFalsePromptWith([...tempWrittenPromptWith])
                    setTrueFalseAnswerWith([...tempWrittenAnsWith])
                    setOptionTrueFalsePromptWith([...tempWrittenPromptWith])
                    setOptionTrueFalseAnswerWith([...tempWrittenAnsWith])
                }
                setWrittenAnswerWith(tempFields[1].id)
                setOptionWrittenAnswerWith(tempFields[1].id)
                // get quiz
                if (tempNumQues > 0) {
                    const tempQuestions = (
                        await StudySetService.getQuizByStudySetId(
                            tempStudySet.id,
                            questionTypes,
                            tempNumQues,
                            userInfo.id,
                            isStar
                        )
                    ).data
                    setQuestions(tempQuestions)
                }
                // set answers
                var tempAnswers = []
                for (let index = 0; index < tempNumQues; index++) {
                    tempAnswers.push(null)
                }
                setAnswers([...tempAnswers])
                setResults([...tempAnswers])
                setShowOptionModal(true)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
                if (
                    error.message.includes('not exist') ||
                    error?.response.data.includes('not exist') ||
                    isNaN(id)
                ) {
                    navigate('/notFound')
                }
            }
            setLoading(false)
        }
        if (id && userInfo?.id) {
            fetchData()
        }
    }, [userInfo, id])

    const handleChangeQuestionType = (event) => {
        var tempQuestionsTypes = [...optionQuestionTypes]
        const value = Number(event.target.value)
        if (event.target.checked) {
            tempQuestionsTypes.push(value)
        } else {
            tempQuestionsTypes = tempQuestionsTypes.filter(
                (item) => item !== value
            )
        }
        setOptionQuestionTypes(tempQuestionsTypes)
    }

    const handleCreateQuiz = async () => {
        if (document.getElementById('quizOptionModal')) {
            document.getElementById('quizOptionModal').scrollTop = 0
        }
        setProgress(0)
        setResults([])
        setIsEnd(false)
        setError('')
        setSkipAnswer(null)
        setIsAddHistory(false)
        // validation
        if (optionQuestionTypes?.length < 1) {
            setError('You must select at least one question type.')
            setLoading(false)
            return
        }
        if (optionNumQues < 1) {
            setError('Please enter a valid number of questions.')
            return
        }
        if (optionQuestionTypes.includes(1)) {
            if (optionWrittenPromptWith?.length < 1) {
                setError(
                    'You must select at least one side for your written prompt.'
                )
                return
            }
            if (optionWrittenAnswerWith === 0) {
                setError('You must select one side for your written answer.')
                return
            }
            if (type === 1) {
                if (optionWrittenAnswerWith === optionWrittenPromptWith) {
                    setError(
                        'Your written prompt and written answer cannot have the same item.'
                    )
                    return
                }
            } else {
                for (const prompt of optionWrittenPromptWith) {
                    if (optionWrittenAnswerWith === prompt) {
                        setError(
                            'Your written prompt and written answer cannot have the same item.'
                        )
                        return
                    }
                }
            }
        }
        if (optionQuestionTypes.includes(2)) {
            if (optionMultiplePromptWith?.length < 1) {
                setError(
                    'You must select at least one side for your multiple choice prompt.'
                )
                return
            }
            if (optionMultipleAnswerWith?.length < 1) {
                setError(
                    'You must select at least one side for your multiple choice answer.'
                )
                return
            }
            if (type === 1) {
                if (optionMultipleAnswerWith === optionMultiplePromptWith) {
                    setError(
                        'Your multiple choice prompt and multiple choice answer cannot have the same item.'
                    )
                    return
                }
            } else {
                for (const prompt of optionMultiplePromptWith) {
                    if (optionMultipleAnswerWith?.includes(prompt)) {
                        setError(
                            'Your multiple choice prompt and multiple choice answer cannot have the same item.'
                        )
                        return
                    }
                }
            }
        }
        if (optionQuestionTypes.includes(3)) {
            if (optionTrueFalsePromptWith?.length < 1) {
                setError(
                    'You must select at least one side for your true/false prompt.'
                )
                return
            }
            if (optionTrueFalseAnswerWith?.length < 1) {
                setError(
                    'You must select at least one side for your true/false answer.'
                )
                return
            }
            if (type === 1) {
                if (optionTrueFalsePromptWith === optionTrueFalseAnswerWith) {
                    setError(
                        'Your true/false prompt and true/false answer cannot have the same item.'
                    )
                    return
                }
            } else {
                for (const prompt of optionTrueFalsePromptWith) {
                    if (optionTrueFalseAnswerWith?.includes(prompt)) {
                        setError(
                            'Your true/false prompt and true/false answer cannot have the same item.'
                        )
                        return
                    }
                }
            }
        }
        // create
        setLoading(true)
        try {
            const tempQuestions = (
                await StudySetService.getQuizByStudySetId(
                    studySet.id,
                    optionQuestionTypes,
                    optionNumQues,
                    userInfo?.id,
                    optionIsStar
                )
            ).data
            setQuestions(tempQuestions)
            setNumQues(optionNumQues)
            setIsStar(optionIsStar)
            setShowPicture(optionShowPicture)
            setShowAudio(optionShowAudio)
            setQuestionTypes(optionQuestionTypes)
            setWrittenPromptWith(optionWrittenPromptWith)
            setWrittenAnswerWith(optionWrittenAnswerWith)
            setMultiplePromptWith(optionMultiplePromptWith)
            setMultipleAnswerWith(optionMultipleAnswerWith)
            setTrueFalsePromptWith(optionTrueFalsePromptWith)
            setTrueFalseAnswerWith(optionTrueFalseAnswerWith)
            var tempAnswers = []
            for (let index = 0; index < optionNumQues; index++) {
                tempAnswers.push(null)
            }
            setAnswers([...tempAnswers])
            setResults([...tempAnswers])
            setShowOptionModal(false)
            setError('')
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        setLoading(false)
    }

    const handleCancelCreateQuiz = () => {
        setError('')
        setShowOptionModal(false)
        setOptionQuestionTypes(questionTypes)
        setOptionNumQues(numQues)
        setOptionIsStar(isStar)
        setOptionShowPicture(showPicture)
        setOptionShowAudio(showAudio)
        setOptionWrittenPromptWith(writtenPromptWith)
        setOptionWrittenAnswerWith(writtenAnswerWith)
        setOptionMultiplePromptWith(multiplePromptWith)
        setOptionMultipleAnswerWith(multipleAnswerWith)
        setOptionTrueFalsePromptWith(trueFalsePromptWith)
        setOptionTrueFalseAnswerWith(trueFalseAnswerWith)
    }

    const handleChangeAnswer = (ans, index) => {
        var tempAnswers = [...answers]
        if (ans) {
            tempAnswers[index] = ans
        } else {
            tempAnswers[index] = null
        }
        setAnswers(tempAnswers)
    }

    const handleCheckSubmit = () => {
        // validation
        if (progress < numQues) {
            for (let index = 0; index < answers.length; index++) {
                const ans = answers[index]
                if (!ans) {
                    setSkipAnswer(index)
                    setShowSubmitModal(true)
                    return
                }
            }
        } else {
            handleSubmit()
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            var tempCorrect = 0
            var tempResults = []
            for (let index = 0; index < questions.length; index++) {
                const ques = questions[index]
                var tempIsCorrect = false
                if (ques.question_type === 1) {
                    var correctAnswer = ''
                    for (const itemContent of ques.question.content) {
                        if (itemContent.field.id === writtenAnswerWith) {
                            const tempContent = itemContent.content
                                .replaceAll(/(<([^>]+)>)/gi, ' ')
                                .trim()
                            correctAnswer = tempContent
                            break
                        }
                    }
                    if (answers[index] == correctAnswer) {
                        tempCorrect += 1
                        tempResults.push(1)
                        tempIsCorrect = true
                    } else {
                        tempResults.push(0)
                    }
                } else if (ques.question_type === 2) {
                    if (answers[index] == ques.question.card.id) {
                        tempCorrect += 1
                        tempResults.push(1)
                        tempIsCorrect = true
                    } else {
                        tempResults.push(0)
                    }
                } else if (ques.question_type === 3) {
                    const correctAnswer =
                        ques.question.card.id === ques.answers[0].card.id
                    if (answers[index] == correctAnswer) {
                        tempCorrect += 1
                        tempResults.push(1)
                        tempIsCorrect = true
                    } else {
                        tempResults.push(0)
                    }
                }
                await ProgressService.updateScore(
                    userInfo.id,
                    ques.question.card.id,
                    tempIsCorrect ? 1 : -1
                )
            }
            setCorrect(tempCorrect)
            setResults(tempResults)
            setIncorrect(numQues - tempCorrect)
            setShowSubmitModal(false)
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
        <div>
            {/* Header */}
            <div
                id="quizHeader"
                className="quizHeader d-flex justify-content-between align-items-center"
            >
                <div className="d-flex align-items-center">
                    <TestSolidIcon className="quizModeIcon" size="2rem" />
                    <div className="quizMode dropdown d-flex align-items-center">
                        <button
                            className="btn"
                            type="button dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="ps-2 me-2">{t('quiz')}</span>
                            <ArrowDownIcon size="1rem" strokeWidth="2.6" />
                        </button>
                        <ul
                            className="dropdown-menu"
                            style={{ zIndex: '100000' }}
                        >
                            <li>
                                <button
                                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                                    type="button"
                                    onClick={() => {
                                        navigate(`/flashcards/${id}`)
                                    }}
                                >
                                    <StudySetSolidIcon
                                        className="me-3 quizModeIcon"
                                        size="1.3rem"
                                    />
                                    <span className="align-middle fw-semibold">
                                        {t('flashcard')}
                                    </span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item quizModeIcon py-2 px-3 d-flex align-items-center"
                                    type="button"
                                    onClick={() => {
                                        navigate(`/learn/${id}`)
                                    }}
                                >
                                    <LearnSolidIcon
                                        className="me-3 quizModeIcon"
                                        size="1.3rem"
                                        strokeWidth="2"
                                    />
                                    <span className="align-middle fw-semibold">
                                        {t('learn')}
                                    </span>
                                </button>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <button
                                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                                    type="button"
                                >
                                    <span className="align-middle fw-semibold">
                                        {t('home')}
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="quizInfo d-flex flex-column align-items-center">
                    <h3>
                        {progress} / {numQues}
                    </h3>
                    <h3 className="quizInfo_title">{studySet?.title}</h3>
                </div>
                <div className="quizOptions d-flex">
                    {isEnd ? (
                        <button
                            className="quizOptions_btn"
                            onClick={handleCreateQuiz}
                        >
                            {t('take')}
                        </button>
                    ) : isAllow ? (
                        <button
                            className="quizOptions_btn"
                            onClick={() => {
                                setShowOptionModal(true)
                            }}
                        >
                            {t('option')}
                        </button>
                    ) : (
                        ''
                    )}
                    <button
                        className="quizClose_btn ms-3 d-flex align-items-center"
                        onClick={() => {
                            navigate(`/set/${id}`)
                        }}
                    >
                        <CloseIcon strokeWidth="2" />
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : isAllow ? (
                <div>
                    {/* Progress */}
                    {isEnd ? (
                        <div
                            id="quizProgressContainer"
                            className="progress-stacked quizEndProgressContainer"
                        >
                            <div
                                className="progress"
                                role="progressbar"
                                aria-label="Segment one"
                                aria-valuenow={`${(
                                    (correct / numQues) *
                                    100
                                ).toFixed(2)}`}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{
                                    width: `${(
                                        (correct / numQues) *
                                        100
                                    ).toFixed(2)}%`,
                                }}
                            >
                                <div className="progress-bar bg-success">
                                    {((correct / numQues) * 100).toFixed(2)}%
                                </div>
                            </div>
                            <div
                                className="progress"
                                role="progressbar"
                                aria-label="Segment two"
                                aria-valuenow={`${(
                                    (incorrect / numQues) *
                                    100
                                ).toFixed(2)}`}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{
                                    width: `${(
                                        (incorrect / numQues) *
                                        100
                                    ).toFixed(2)}%`,
                                }}
                            >
                                <div className="progress-bar bg-danger">
                                    {((incorrect / numQues) * 100).toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            id="quizProgressContainer"
                            className="quizProgressContainer"
                        >
                            <div
                                className="quizProgress"
                                style={{
                                    width: `${(progress / numQues) * 100}%`,
                                }}
                            ></div>
                        </div>
                    )}
                    {/* Questions sidebar */}
                    {questions.length > 0 && (
                        <div className="questionsSidebar">
                            <button
                                id="questionsListBtn"
                                className="btn quizQuesList_Btn"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasQuestionsList"
                                aria-controls="offcanvasQuestionsList"
                            >
                                <ListIcon strokeWidth="2" />
                            </button>
                            <div
                                className="offcanvas offcanvas-start"
                                tabIndex="-1"
                                id="offcanvasQuestionsList"
                                aria-labelledby="offcanvasQuestionsListLabel"
                            >
                                <div className="offcanvas-header">
                                    <h5
                                        className="offcanvas-title"
                                        id="offcanvasQuestionsListLabel"
                                    >
                                        {t('qlist')}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="offcanvas"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="offcanvas-body">
                                    <div className="list-group list-group-flush text-center">
                                        {questions.map((ques, index) => (
                                            <a
                                                key={index}
                                                href={`#question${index}`}
                                                className={`list-group-item list-group-item-action ${
                                                    results[index] === 0
                                                        ? 'incorrect'
                                                        : results[index] === 1
                                                        ? 'correct'
                                                        : answers[index]
                                                        ? 'selected'
                                                        : ''
                                                }`}
                                            >
                                                {index + 1}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Questions list */}
                    {questions?.map((ques, quesIndex) => (
                        <section
                            key={quesIndex}
                            id={`question${quesIndex}`}
                            className="quizQues_container mt-5"
                        >
                            {type === 1 && (
                                <VocabCard
                                    ques={ques}
                                    quesIndex={quesIndex}
                                    numQues={numQues}
                                    writtenPromptWith={writtenPromptWith}
                                    writtenAnswerWith={writtenAnswerWith}
                                    multiplePromptWith={multiplePromptWith}
                                    multipleAnswerWith={multipleAnswerWith}
                                    trueFalsePromptWith={trueFalsePromptWith}
                                    trueFalseAnswerWith={trueFalseAnswerWith}
                                    handleChangeAnswer={handleChangeAnswer}
                                    setProgress={setProgress}
                                    progress={progress}
                                    answers={answers}
                                    results={results}
                                    showPicture={showPicture}
                                    showAudio={showAudio}
                                />
                            )}
                            {type === 2 && (
                                <KanjiCard
                                    ques={ques}
                                    quesIndex={quesIndex}
                                    numQues={numQues}
                                    writtenPromptWith={writtenPromptWith}
                                    writtenAnswerWith={writtenAnswerWith}
                                    multiplePromptWith={multiplePromptWith}
                                    multipleAnswerWith={multipleAnswerWith}
                                    trueFalsePromptWith={trueFalsePromptWith}
                                    trueFalseAnswerWith={trueFalseAnswerWith}
                                    handleChangeAnswer={handleChangeAnswer}
                                    setProgress={setProgress}
                                    progress={progress}
                                    answers={answers}
                                    results={results}
                                    showPicture={showPicture}
                                    showAudio={showAudio}
                                />
                            )}
                            {type === 3 && (
                                <GrammarCard
                                    ques={ques}
                                    quesIndex={quesIndex}
                                    numQues={numQues}
                                    writtenPromptWith={writtenPromptWith}
                                    writtenAnswerWith={writtenAnswerWith}
                                    multiplePromptWith={multiplePromptWith}
                                    multipleAnswerWith={multipleAnswerWith}
                                    trueFalsePromptWith={trueFalsePromptWith}
                                    trueFalseAnswerWith={trueFalseAnswerWith}
                                    handleChangeAnswer={handleChangeAnswer}
                                    setProgress={setProgress}
                                    progress={progress}
                                    answers={answers}
                                    results={results}
                                    showPicture={showPicture}
                                    showAudio={showAudio}
                                />
                            )}
                        </section>
                    ))}
                    {/* Submit */}
                    <div className="quizSubmit_container d-flex flex-column align-items-center justify-content-center">
                        <img src={finishQuizImg} alt="finish quiz image" />
                        <h3>{t('msg30')}?</h3>
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleCheckSubmit}
                            >
                                {t('submit')}
                            </button>
                        </div>
                    </div>
                    {/* Submit modal */}
                    <Modal
                        id="quizSubmitModal"
                        className="quizOptionModal"
                        size="lg"
                        show={showSubmitModal}
                        onHide={() => setShowSubmitModal(false)}
                    >
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <h2 className="modal-title mb-2">
                                    {t('msg28')}.
                                </h2>
                                <p className="modal-text">{t('msg29')}?</p>
                            </div>
                            <div className="modal-footer border border-0">
                                <a
                                    className="btn btn-light me-3"
                                    href={`#question${skipAnswer}`}
                                >
                                    {t('msg27')}
                                </a>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                >
                                    {t('submit')}
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            ) : (
                <div className="mt-5 text-center">
                    <h4>{t('msg26')}</h4>
                </div>
            )}

            {/* Option modal */}
            <Modal
                id="quizOptionModal"
                className="quizOptionModal"
                size="lg"
                show={showOptionModal}
                onHide={() => {
                    setShowOptionModal(false)
                }}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">{t('option')}</h3>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={handleCancelCreateQuiz}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {/* error message */}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="row mb-3">
                            <div className="col-6">
                                {/* num ques */}
                                <div className="quizOptionBlock mb-4">
                                    <legend>{t('qlimit')}</legend>
                                    <div className="mb-2 d-flex align-items-center">
                                        <input
                                            className="form-control"
                                            type="number"
                                            id="quesLimit"
                                            value={optionNumQues}
                                            onChange={(event) => {
                                                setOptionNumQues(
                                                    event.target.value
                                                )
                                            }}
                                        />
                                        <p className="form-check-label m-0">
                                            {t('of')}{' '}
                                            {optionIsStar
                                                ? numNotStar +
                                                  numStillStar +
                                                  numMasterStar
                                                : numNot +
                                                  numStill +
                                                  numMaster}{' '}
                                            {t('question')}
                                        </p>
                                    </div>
                                </div>
                                {/* types */}
                                <div className="quizOptionBlock">
                                    <legend>{t('qtypes')}</legend>
                                    <div className="mb-2">
                                        <input
                                            id="written"
                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                            type="checkbox"
                                            value={1}
                                            checked={
                                                optionQuestionTypes?.includes(
                                                    1
                                                ) || ''
                                            }
                                            onChange={handleChangeQuestionType}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="written"
                                        >
                                            {t('written')}
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                            type="checkbox"
                                            value={2}
                                            checked={
                                                optionQuestionTypes?.includes(
                                                    2
                                                ) || ''
                                            }
                                            id="mupltipleChoice"
                                            onChange={handleChangeQuestionType}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="mupltipleChoice"
                                        >
                                            {t('mc')}
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                            type="checkbox"
                                            value={3}
                                            checked={
                                                optionQuestionTypes?.includes(
                                                    3
                                                ) || ''
                                            }
                                            id="trueFalse"
                                            onChange={handleChangeQuestionType}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="trueFalse"
                                        >
                                            {t('tf')}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                {/* star */}
                                <div className="quizOptionBlock">
                                    <legend>{t('star')}</legend>
                                    <div className="mb-2">
                                        <input
                                            id="isStar"
                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                            type="checkbox"
                                            checked={optionIsStar}
                                            onChange={() => {
                                                setOptionIsStar(!optionIsStar)
                                            }}
                                            disabled={
                                                numNotStar +
                                                    numStillStar +
                                                    numMasterStar ==
                                                0
                                            }
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="isStar"
                                        >
                                            {t('studyStarred')}
                                        </label>
                                    </div>
                                </div>
                                {/* picture */}
                                <div className="quizOptionBlock">
                                    <legend>{t('picture')}</legend>
                                    <div className="mb-2">
                                        <input
                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                            type="checkbox"
                                            checked={optionShowPicture}
                                            id="showPicture"
                                            onChange={() => {
                                                setOptionShowPicture(
                                                    !optionShowPicture
                                                )
                                            }}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="showPicture"
                                        >
                                            {t('show')} {t('picture')}
                                        </label>
                                    </div>
                                </div>
                                {/* audio */}
                                <div className="quizOptionBlock">
                                    <legend>{t('audio')}</legend>
                                    <div className="mb-2">
                                        <input
                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                            type="checkbox"
                                            checked={optionShowAudio}
                                            id="showAudio"
                                            onChange={() => {
                                                setOptionShowAudio(
                                                    !optionShowAudio
                                                )
                                            }}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="showAudio"
                                        >
                                            {t('show')} {t('audio')}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* selection */}
                        <ul className="nav nav-tabs mb-3" role="tablist">
                            <li className="nav-item">
                                <a
                                    className={`nav-link quizOptionBlock_label ${
                                        optionQuestionTypes?.includes(1)
                                            ? ''
                                            : 'disabled'
                                    }`}
                                    aria-current="page"
                                    id="listWrittenList"
                                    data-bs-toggle="list"
                                    href="#listWritten"
                                    role="tab"
                                    aria-controls="listWritten"
                                >
                                    {t('written')}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link quizOptionBlock_label ${
                                        optionQuestionTypes?.includes(2)
                                            ? ''
                                            : 'disabled'
                                    }`}
                                    id="listMultipleList"
                                    data-bs-toggle="list"
                                    href="#listMultiple"
                                    role="tab"
                                    aria-controls="listMultiple"
                                >
                                    {t('mc')}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link quizOptionBlock_label ${
                                        optionQuestionTypes?.includes(3)
                                            ? ''
                                            : 'disabled'
                                    }`}
                                    id="listTrueFalseList"
                                    data-bs-toggle="list"
                                    href="#listTrueFalse"
                                    role="tab"
                                    aria-controls="listTrueFalse"
                                >
                                    {t('tf')}
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            {/* written */}
                            <div
                                className={`tab-pane fade ${
                                    optionQuestionTypes?.includes(1)
                                        ? ''
                                        : 'hide'
                                }`}
                                id="listWritten"
                                role="tabpanel"
                                aria-labelledby="listWrittenList"
                            >
                                <div className="row">
                                    <div className="col-6">
                                        <div className="quizOptionBlock mb-4">
                                            <legend>{t('prw')}</legend>
                                            {fields?.map((field, index) => (
                                                <div
                                                    className="mb-2"
                                                    key={index}
                                                >
                                                    {type === 1 ? (
                                                        <input
                                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                            name="writtenPromptWith"
                                                            type="radio"
                                                            id={`writtenPromptWith${field.id}`}
                                                            checked={
                                                                optionWrittenPromptWith ===
                                                                    field.id ||
                                                                ''
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    setOptionWrittenPromptWith(
                                                                        field.id
                                                                    )
                                                                } else {
                                                                    setOptionWrittenPromptWith(
                                                                        0
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    ) : (
                                                        <input
                                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                            type="checkbox"
                                                            id={`writtenPromptWith${field.id}`}
                                                            checked={
                                                                optionWrittenPromptWith?.includes(
                                                                    field.id
                                                                ) || ''
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    var tempWrittenPromptWith =
                                                                        [
                                                                            ...optionWrittenPromptWith,
                                                                        ]
                                                                    tempWrittenPromptWith.push(
                                                                        field.id
                                                                    )
                                                                    setOptionWrittenPromptWith(
                                                                        tempWrittenPromptWith
                                                                    )
                                                                } else {
                                                                    const tempWrittenPromptWith =
                                                                        [
                                                                            ...optionWrittenPromptWith,
                                                                        ].filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item !==
                                                                                field.id
                                                                        )
                                                                    setOptionWrittenPromptWith(
                                                                        tempWrittenPromptWith
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`writtenPromptWith${field.id}`}
                                                    >
                                                        {field.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="quizOptionBlock">
                                            <legend>{t('anws')}</legend>
                                            {fields?.map((field, index) => (
                                                <div
                                                    className="mb-2"
                                                    key={index}
                                                >
                                                    <input
                                                        className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                        type="radio"
                                                        name="writtenAnswerWith"
                                                        checked={
                                                            optionWrittenAnswerWith ===
                                                                field.id || ''
                                                        }
                                                        id={`writtenAnswerWith${field.id}`}
                                                        onChange={(event) => {
                                                            if (
                                                                event.target
                                                                    .checked
                                                            ) {
                                                                setOptionWrittenAnswerWith(
                                                                    field.id
                                                                )
                                                            } else {
                                                                setOptionWrittenAnswerWith(
                                                                    0
                                                                )
                                                            }
                                                        }}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`writtenAnswerWith${field.id}`}
                                                    >
                                                        {field.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* multiple */}
                            <div
                                className={`tab-pane fade  ${
                                    optionQuestionTypes?.includes(2)
                                        ? ''
                                        : 'hide'
                                }`}
                                id="listMultiple"
                                role="tabpanel"
                                aria-labelledby="listMultipleList"
                            >
                                <div className="row">
                                    <div className="col-6">
                                        <div className="quizOptionBlock mb-4">
                                            <legend>{t('prw')}</legend>
                                            {fields?.map((field, index) => (
                                                <div
                                                    className="mb-2"
                                                    key={index}
                                                >
                                                    {type === 1 ? (
                                                        <input
                                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                            name="multiplePromptWith"
                                                            type="radio"
                                                            id={`multiplePromptWith${field.id}`}
                                                            checked={
                                                                optionMultiplePromptWith ===
                                                                    field.id ||
                                                                ''
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    setOptionMultiplePromptWith(
                                                                        field.id
                                                                    )
                                                                } else {
                                                                    setOptionMultiplePromptWith(
                                                                        0
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    ) : (
                                                        <input
                                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                            type="checkbox"
                                                            id={`multiplePromptWith${field.id}`}
                                                            checked={
                                                                optionMultiplePromptWith?.includes(
                                                                    field.id
                                                                ) || ''
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    var tempMultiplePromptWith =
                                                                        [
                                                                            ...optionMultiplePromptWith,
                                                                        ]
                                                                    tempMultiplePromptWith.push(
                                                                        field.id
                                                                    )
                                                                    setOptionMultiplePromptWith(
                                                                        tempMultiplePromptWith
                                                                    )
                                                                } else {
                                                                    const tempMultiplePromptWith =
                                                                        [
                                                                            ...optionMultiplePromptWith,
                                                                        ].filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item !==
                                                                                field.id
                                                                        )
                                                                    setOptionMultiplePromptWith(
                                                                        tempMultiplePromptWith
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`multiplePromptWith${field.id}`}
                                                    >
                                                        {field.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="quizOptionBlock">
                                            <legend>{t('anws')}</legend>
                                            {fields?.map((field, index) => (
                                                <div
                                                    className="mb-2"
                                                    key={index}
                                                >
                                                    {type === 1 ? (
                                                        <input
                                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                            name="multipleAnswerWith"
                                                            type="radio"
                                                            id={`multipleAnswerWith${field.id}`}
                                                            checked={
                                                                optionMultipleAnswerWith ===
                                                                    field.id ||
                                                                ''
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    setOptionMultipleAnswerWith(
                                                                        field.id
                                                                    )
                                                                } else {
                                                                    setOptionMultipleAnswerWith(
                                                                        0
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    ) : (
                                                        <input
                                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                            type="checkbox"
                                                            id={`multipleAnswerWith${field.id}`}
                                                            checked={
                                                                optionMultipleAnswerWith?.includes(
                                                                    field.id
                                                                ) || ''
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    var tempMultipleAnswerWith =
                                                                        [
                                                                            ...optionMultipleAnswerWith,
                                                                        ]
                                                                    tempMultipleAnswerWith.push(
                                                                        field.id
                                                                    )
                                                                    setOptionMultipleAnswerWith(
                                                                        tempMultipleAnswerWith
                                                                    )
                                                                } else {
                                                                    const tempMultipleAnswerWith =
                                                                        [
                                                                            ...optionMultipleAnswerWith,
                                                                        ].filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item !==
                                                                                field.id
                                                                        )
                                                                    setOptionMultipleAnswerWith(
                                                                        tempMultipleAnswerWith
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`multipleAnswerWith${field.id}`}
                                                    >
                                                        {field.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* true false */}
                            <div
                                className={`tab-pane fade ${
                                    optionQuestionTypes?.includes(3)
                                        ? ''
                                        : 'hide'
                                }`}
                                id="listTrueFalse"
                                role="tabpanel"
                                aria-labelledby="listTrueFalseList"
                            >
                                <div className="row">
                                    <div className="col-6">
                                        <div className="quizOptionBlock mb-4">
                                            <legend>{t('prw')}</legend>
                                            {fields?.map((field, index) => (
                                                <div
                                                    className="mb-2"
                                                    key={index}
                                                >
                                                    {type === 1 ? (
                                                        <input
                                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                            name="trueFalsePromptWith"
                                                            type="radio"
                                                            id={`trueFalsePromptWith${field.id}`}
                                                            checked={
                                                                optionTrueFalsePromptWith ===
                                                                    field.id ||
                                                                ''
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    setOptionTrueFalsePromptWith(
                                                                        field.id
                                                                    )
                                                                } else {
                                                                    setOptionTrueFalsePromptWith(
                                                                        0
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    ) : (
                                                        <input
                                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                            type="checkbox"
                                                            id={`trueFalsePromptWith${field.id}`}
                                                            checked={
                                                                optionTrueFalsePromptWith?.includes(
                                                                    field.id
                                                                ) || ''
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    var tempTrueFalsePromptWith =
                                                                        [
                                                                            ...optionTrueFalsePromptWith,
                                                                        ]
                                                                    tempTrueFalsePromptWith.push(
                                                                        field.id
                                                                    )
                                                                    setOptionTrueFalsePromptWith(
                                                                        tempTrueFalsePromptWith
                                                                    )
                                                                } else {
                                                                    const tempTrueFalsePromptWith =
                                                                        [
                                                                            ...optionTrueFalsePromptWith,
                                                                        ].filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item !==
                                                                                field.id
                                                                        )
                                                                    setOptionTrueFalsePromptWith(
                                                                        tempTrueFalsePromptWith
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`trueFalsePromptWith${field.id}`}
                                                    >
                                                        {field.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="quizOptionBlock">
                                            <legend>{t('anws')}</legend>
                                            {fields?.map((field, index) => (
                                                <div
                                                    className="mb-2"
                                                    key={index}
                                                >
                                                    {type === 1 ? (
                                                        <input
                                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                            name="trueFalseAnswerWith"
                                                            type="radio"
                                                            id={`trueFalseAnswerWith${field.id}`}
                                                            checked={
                                                                optionTrueFalseAnswerWith ===
                                                                    field.id ||
                                                                ''
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    setOptionTrueFalseAnswerWith(
                                                                        field.id
                                                                    )
                                                                } else {
                                                                    setOptionTrueFalseAnswerWith(
                                                                        0
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    ) : (
                                                        <input
                                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                            type="checkbox"
                                                            id={`trueFalseAnswerWith${field.id}`}
                                                            checked={
                                                                optionTrueFalseAnswerWith?.includes(
                                                                    field.id
                                                                ) || ''
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.target
                                                                        .checked
                                                                ) {
                                                                    var tempTrueFalseAnswerWith =
                                                                        [
                                                                            ...optionTrueFalseAnswerWith,
                                                                        ]
                                                                    tempTrueFalseAnswerWith.push(
                                                                        field.id
                                                                    )
                                                                    setOptionTrueFalseAnswerWith(
                                                                        tempTrueFalseAnswerWith
                                                                    )
                                                                } else {
                                                                    const tempTrueFalseAnswerWith =
                                                                        [
                                                                            ...optionTrueFalseAnswerWith,
                                                                        ].filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item !==
                                                                                field.id
                                                                        )
                                                                    setOptionTrueFalseAnswerWith(
                                                                        tempTrueFalseAnswerWith
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`trueFalseAnswerWith${field.id}`}
                                                    >
                                                        {field.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary classModalBtn me-3"
                            onClick={handleCancelCreateQuiz}
                        >
                            {t('cancel')}
                        </button>
                        <button
                            className="btn btn-primary classModalBtn"
                            onClick={handleCreateQuiz}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="d-flex justify-content-center">
                                    <div
                                        className="spinner-border"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                'Create new quiz'
                            )}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default DoQuiz
