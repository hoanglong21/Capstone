import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
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
import ViewCard from '../view/ViewCard'

import {
    StudySetSolidIcon,
    ArrowDownIcon,
    CloseIcon,
    LearnSolidIcon,
    TestSolidIcon,
} from '../../../components/icons'
import illustration from '../../../assets/images/learn_finish.png'
import FormStyles from '../../../assets/styles/Form.module.css'
import './learn.css'
import { useTranslation } from 'react-i18next'

const Confettiful = function (el) {
    this.el = el
    this.containerEl = null

    this.confettiFrequency = 3
    this.confettiColors = [
        '#EF2964',
        '#00C09D',
        '#2D87B0',
        '#48485E',
        '#EFFF1D',
    ]
    this.confettiAnimations = ['slow', 'medium', 'fast']

    this._setupElements()
    this._renderConfetti()
}

Confettiful.prototype._setupElements = function () {
    const containerEl = document.createElement('div')
    const elPosition = this.el.style.position

    if (elPosition !== 'relative' || elPosition !== 'absolute') {
        this.el.style.position = 'relative'
    }

    containerEl.classList.add('confetti-container')

    this.el.appendChild(containerEl)

    this.containerEl = containerEl
}

Confettiful.prototype._renderConfetti = function () {
    const confettiInterval = setInterval(() => {
        const confettiEl = document.createElement('div')
        const confettiSize = Math.floor(Math.random() * 3) + 7 + 'px'
        const confettiBackground =
            this.confettiColors[
                Math.floor(Math.random() * this.confettiColors.length)
            ]
        const confettiLeft =
            Math.floor(Math.random() * this.el.offsetWidth) + 'px'
        const confettiAnimation =
            this.confettiAnimations[
                Math.floor(Math.random() * this.confettiAnimations.length)
            ]

        confettiEl.classList.add(
            'confetti',
            'confetti--animation-' + confettiAnimation
        )
        confettiEl.style.left = confettiLeft
        confettiEl.style.width = confettiSize
        confettiEl.style.height = confettiSize
        confettiEl.style.backgroundColor = confettiBackground

        confettiEl.removeTimeout = setTimeout(function () {
            confettiEl.parentNode.removeChild(confettiEl)
        }, 10000)

        this.containerEl.appendChild(confettiEl)
    }, 25)

    setTimeout(function () {
        clearInterval(confettiInterval)
    }, 3000)
}

const Learn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()

    const { id } = useParams()
    const statusType = searchParams.get('statusType')

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
    const [progressStatus, setProgressStatus] = useState([])
    const [isStar, setIsStar] = useState(false)
    const [isShuffle, setIsShuffle] = useState(false)
    const [writtenPromptWith, setWrittenPromptWith] = useState([])
    const [writtenAnswerWith, setWrittenAnswerWith] = useState(0)
    const [multiplePromptWith, setMultiplePromptWith] = useState([])
    const [multipleAnswerWith, setMultipleAnswerWith] = useState([])
    const [trueFalsePromptWith, setTrueFalsePromptWith] = useState([])
    const [trueFalseAnswerWith, setTrueFalseAnswerWith] = useState([])
    const [showPicture, setShowPicture] = useState(false)
    const [showAudio, setShowAudio] = useState(false)
    const [showNote, setShowNote] = useState(false)

    const [optionQuestionTypes, setOptionQuestionTypes] = useState([1, 2, 3])
    const [optionProgressStatus, setOptionProgressStatus] = useState([])
    const [optionIsStar, setOptionIsStar] = useState(false)
    const [optionIsShuffle, setOptionIsShuffle] = useState(false)
    const [optionShowPicture, setOptionShowPicture] = useState(false)
    const [optionShowAudio, setOptionShowAudio] = useState(false)
    const [optionShowNote, setOptionShowNote] = useState(false)
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
    const [error, setError] = useState(false)

    const [numQues, setNumQues] = useState(0)
    const [progress, setProgress] = useState(0)
    const [totalProgress, setTotalProgress] = useState(0)
    const [questions, setQuestions] = useState([])
    const [currentRound, setCurrentRound] = useState([])
    const [startRound, setStartRound] = useState(0)
    const [endRound, setEndRound] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentAnswer, setCurrentAnswer] = useState(null)
    const [isCurrentCorrect, setIsCurrentCorrect] = useState(null)
    const [isEnd, setIsEnd] = useState(false)
    const [isFinish, setIsFinish] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [incorrect, setIncorrect] = useState(false)

    const [loading, setLoading] = useState(false)
    const [showOptionModal, setShowOptionModal] = useState(false)
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
        if (
            isAddHistory === false &&
            userInfo?.id &&
            (isEnd === true || isFinish === true)
        ) {
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
                if (
                    error.message.includes('not exist') ||
                    error?.response.data.includes('not exist')
                ) {
                    navigate('/notFound')
                }
            }
        }
    }, [userInfo, isEnd, isFinish, isAddHistory])

    // fetch user info
    useEffect(() => {
        if (userToken && !userInfo?.id) {
            dispatch(getUser(userToken))
        }
    }, [userToken, userInfo])

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                // initial
                setIsEnd(false)
                setIsAllow(true)
                setError('')
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
                // num cards
                const tempNumCards =
                    tempCounts['Not studied'] +
                    tempCounts['Still learning'] +
                    tempCounts['Mastered']
                setNumQues(tempNumCards)
                // check allow
                if (tempNumCards < 2) {
                    setIsAllow(false)
                    setLoading(false)
                    return
                }
                // set type
                setType(tempStudySet.studySetType.id)
                // set progress
                var tempProgressStatus = []
                if (statusType) {
                    if (statusType === 'not') {
                        tempProgressStatus.push('not studied')
                    }
                    if (statusType === 'still') {
                        tempProgressStatus.push('still learning')
                    }
                    if (statusType === 'mastered') {
                        tempProgressStatus.push('mastered')
                    }
                } else {
                    if (tempCounts['Not studied'] != 0) {
                        tempProgressStatus.push('not studied')
                    }
                    if (tempCounts['Still learning'] != 0) {
                        tempProgressStatus.push('still learning')
                    }
                    if (tempCounts['Mastered'] != 0) {
                        tempProgressStatus.push('mastered')
                    }
                }
                setProgressStatus([...tempProgressStatus])
                setOptionProgressStatus([...tempProgressStatus])
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
                // get learn
                if (tempNumCards > 0) {
                    // questions
                    const tempQuestions = (
                        await StudySetService.getLearningStudySetId(
                            userInfo.id,
                            tempStudySet.id,
                            questionTypes,
                            tempProgressStatus,
                            isShuffle,
                            isStar
                        )
                    ).data
                    setQuestions(tempQuestions)
                    // current round
                    setStartRound(0)
                    const tempEndRound =
                        tempQuestions.length < 7 ? tempQuestions.length : 7
                    setEndRound(tempEndRound)
                    setCurrentRound(tempQuestions.slice(0, tempEndRound))
                    // total progress
                    setTotalProgress(tempEndRound + 1)
                    // current questions
                    setCurrentQuestion(tempQuestions[0])
                }
                setShowOptionModal(true)
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
            setLoading(false)
        }
        if (userInfo?.id && id) {
            fetchData()
        }
    }, [id, userInfo])

    // congratulation animation
    useEffect(() => {
        if (isFinish === true) {
            try {
                document
                    .querySelector('#learnAnimation .confetti-container')
                    ?.remove()
                window.confettiful = new Confettiful(
                    document.getElementById('learnAnimation')
                )
                HistoryService.createHistory({
                    historyType: { id: 5 },
                    user: { id: userInfo.id, username: userInfo.username },
                    studySet: { id: id },
                })
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
    }, [isFinish])

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

    const handleCreateLearn = async () => {
        document.querySelector('#learnAnimation .confetti-container')?.remove()
        if (document.getElementById('learnOptionModal')) {
            document.getElementById('learnOptionModal').scrollTop = 0
        }
        setProgress(0)
        setIsEnd(false)
        setIsFinish(false)
        setIsAddHistory(false)
        setError('')
        // validation
        if (optionProgressStatus?.length < 1) {
            setError('You must select at least one progress status.')
            setLoading(false)
            return
        }
        if (optionQuestionTypes?.length < 1) {
            setError('You must select at least one question type.')
            setLoading(false)
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
                        window.scrollTo(0, 0)
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
            if (numQues > 0) {
                const tempQuestions = (
                    await StudySetService.getLearningStudySetId(
                        userInfo.id,
                        studySet.id,
                        optionQuestionTypes,
                        optionProgressStatus,
                        optionIsShuffle,
                        optionIsStar
                    )
                ).data
                setQuestions(tempQuestions)
                setStartRound(0)
                const tempEndRound =
                    tempQuestions.length < 7 ? tempQuestions.length : 7
                setEndRound(tempEndRound)
                setCurrentRound(tempQuestions.slice(0, tempEndRound))
                setCurrentQuestion(tempQuestions[0])
                setCurrentIndex(0)
                setCurrentAnswer(null)
                setIsCurrentCorrect(null)
            }
            setProgressStatus(optionProgressStatus)
            setIsStar(optionIsStar)
            setIsShuffle(optionIsShuffle)
            setShowPicture(optionShowPicture)
            setShowAudio(optionShowAudio)
            setShowNote(optionShowNote)
            setQuestionTypes(optionQuestionTypes)
            setWrittenPromptWith(optionWrittenPromptWith)
            setWrittenAnswerWith(optionWrittenAnswerWith)
            setMultiplePromptWith(optionMultiplePromptWith)
            setMultipleAnswerWith(optionMultipleAnswerWith)
            setTrueFalsePromptWith(optionTrueFalsePromptWith)
            setTrueFalseAnswerWith(optionTrueFalseAnswerWith)
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

    const handleCancelCreateLearn = () => {
        setError('')
        setShowOptionModal(false)
        setOptionProgressStatus(progressStatus)
        setOptionIsStar(isStar)
        setOptionIsShuffle(isShuffle)
        setOptionShowPicture(showPicture)
        setOptionShowAudio(showAudio)
        setOptionShowNote(showNote)
        setOptionQuestionTypes(questionTypes)
        setOptionWrittenPromptWith(writtenPromptWith)
        setOptionWrittenAnswerWith(writtenAnswerWith)
        setOptionMultiplePromptWith(multiplePromptWith)
        setOptionMultipleAnswerWith(multipleAnswerWith)
        setOptionTrueFalsePromptWith(trueFalsePromptWith)
        setOptionTrueFalseAnswerWith(trueFalseAnswerWith)
    }

    const handleChangeProgressStatus = (event) => {
        var tempProgressStatus = [...optionProgressStatus]
        const value = event.target.value
        if (event.target.checked) {
            tempProgressStatus.push(value)
        } else {
            tempProgressStatus = tempProgressStatus.filter(
                (item) => item != value
            )
        }
        setOptionProgressStatus(tempProgressStatus)
    }

    const nextQuestion = () => {
        if (isEnd) {
            nextRound()
            return
        }
        if (currentIndex < currentRound.length - 1) {
            setCurrentQuestion(currentRound[currentIndex + 1])
            setCurrentIndex(currentIndex + 1)
            setCurrentAnswer(null)
            setIsCurrentCorrect(null)
            setProgress(progress + 1)
        }

        if (currentIndex + 1 === currentRound.length) {
            if (endRound === questions.length) {
                setIsFinish(true)
                return
            }
            setIsEnd(true)
        }
    }

    const nextRound = () => {
        setIsEnd(false)
        setStartRound(endRound)
        const tempEndRound =
            questions.length - endRound < 7 ? questions.length : endRound + 7
        setEndRound(tempEndRound)
        const tempCurrentRound = questions.slice(endRound, tempEndRound)
        setCurrentRound(tempCurrentRound)
        setCurrentQuestion(tempCurrentRound[0])
        setCurrentIndex(0)
        setCurrentAnswer(null)
        setIsCurrentCorrect(null)
        setProgress(0)
    }

    useEffect(() => {
        try {
            if (isCurrentCorrect === true) {
                setCorrect(correct + 1)
                if (currentIndex < currentRound.length) {
                    setTimeout(function nextQuesTimeOut() {
                        nextQuestion()
                    }, 2000)
                }
                ProgressService.updateScore(
                    userInfo.id,
                    currentQuestion.question.card.id,
                    1
                )
            }
            if (isCurrentCorrect === false) {
                setIncorrect(incorrect + 1)
                ProgressService.updateScore(
                    userInfo.id,
                    currentQuestion.question.card.id,
                    -1
                )
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }, [isCurrentCorrect])

    // catch event to next card
    useEffect(() => {
        const handleUserKeyPress = (event) => {
            if (
                (!event.target.classList.contains('removeEvent') &&
                    isCurrentCorrect === false) ||
                isEnd
            ) {
                nextQuestion()
                // Cancel the default action to avoid it being handled twice
                event.preventDefault()
            }
        }
        window.addEventListener('keydown', handleUserKeyPress, true)
        return () => {
            window.removeEventListener('keydown', handleUserKeyPress, true)
        }
    }, [currentIndex, currentRound, progress, isCurrentCorrect, isEnd])

    return (
        <div>
            {/* Header */}
            <div
                id="learnHeader"
                className="quizHeader d-flex justify-content-between align-items-center"
            >
                <div className="d-flex align-items-center">
                    <LearnSolidIcon className="quizModeIcon" size="2rem" />
                    <div className="quizMode dropdown d-flex align-items-center">
                        <button
                            className="btn"
                            type="button dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="ps-2 me-2">{t('learn')}</span>
                            <ArrowDownIcon size="1rem" strokeWidth="2.6" />
                        </button>
                        <ul className="dropdown-menu">
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
                                        navigate(`/quiz/${id}`)
                                    }}
                                >
                                    <TestSolidIcon
                                        className="me-3 quizModeIcon"
                                        size="1.3rem"
                                        strokeWidth="2"
                                    />
                                    <span className="align-middle fw-semibold">
                                        {t('quiz')}
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
                <h3 className="learnTitle">{studySet?.title}</h3>
                <div className="quizOptions d-flex">
                    {isAllow && (
                        <button
                            className="quizOptions_btn"
                            onClick={() => {
                                setShowOptionModal(true)
                            }}
                        >
                            {t('option')}
                        </button>
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
                    {!isEnd && !isFinish && (
                        <div
                            id="learnProgressContainer"
                            className="quizProgressContainer"
                        >
                            <div
                                className="quizProgress"
                                style={{
                                    width: `${
                                        (progress / totalProgress) * 100
                                    }%`,
                                }}
                            ></div>
                        </div>
                    )}
                    {/* Questions */}
                    {isFinish ? (
                        <div id="learnAnimation">
                            <div className="learnFinish mx-auto p-5">
                                <div>
                                    <h2>{t('msg18')}.</h2>
                                    <p>{t('msg19')}.</p>
                                    <img
                                        src={illustration}
                                        alt="congratulation img"
                                    />
                                </div>
                                <div className="d-flex justify-content-center mt-5">
                                    <button
                                        className="learnFinish_btn learnFinish_btn--light me-2"
                                        onClick={() => {
                                            navigate(`/set/${id}`)
                                        }}
                                    >
                                        {t('msg20')}
                                    </button>
                                    <button
                                        className="learnFinish_btn learnFinish_btn--primary"
                                        onClick={handleCreateLearn}
                                    >
                                        {t('sagain')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : isEnd ? (
                        <div>
                            <div className="learnEndProgressContainer">
                                <div className="learnEndProgress">
                                    <h2>{t('msg22')}.</h2>
                                    <div className="learnEndProgressNumber mt-5 mb-2">
                                        {endRound} / {questions.length}{' '}
                                        {t('term')}
                                    </div>
                                    <div className="progress-stacked">
                                        <div
                                            className="progress"
                                            role="progressbar"
                                            aria-label="Segment one"
                                            aria-valuenow={
                                                (correct / questions.length) *
                                                100
                                            }
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style={{
                                                width: `${
                                                    (correct /
                                                        questions.length) *
                                                    100
                                                }%`,
                                            }}
                                        >
                                            <div className="progress-bar bg-success"></div>
                                        </div>
                                        <div
                                            className="progress"
                                            role="progressbar"
                                            aria-label="Segment two"
                                            aria-valuenow={
                                                (incorrect / questions.length) *
                                                100
                                            }
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style={{
                                                width: `${
                                                    (incorrect /
                                                        questions.length) *
                                                    100
                                                }%`,
                                            }}
                                        >
                                            <div className="progress-bar bg-danger"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="learnEndTerms mt-4">
                                <div className="learnEndProgressNumber mb-4">
                                    {t('msg23')}
                                </div>
                                {currentRound.map((round) => (
                                    <ViewCard
                                        fullCard={round.question}
                                        key={round.question.card.id}
                                        userInfo={userInfo}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <section
                            id={`question${currentIndex}`}
                            className="quizQues_container my-5"
                        >
                            {type === 1 && (
                                <VocabCard
                                    ques={currentQuestion}
                                    quesIndex={currentIndex}
                                    writtenPromptWith={writtenPromptWith}
                                    writtenAnswerWith={writtenAnswerWith}
                                    multiplePromptWith={multiplePromptWith}
                                    multipleAnswerWith={multipleAnswerWith}
                                    trueFalsePromptWith={trueFalsePromptWith}
                                    trueFalseAnswerWith={trueFalseAnswerWith}
                                    showPicture={showPicture}
                                    showAudio={showAudio}
                                    showNote={showNote}
                                    setCurrentAnswer={setCurrentAnswer}
                                    currentAnswer={currentAnswer}
                                    isCurrentCorrect={isCurrentCorrect}
                                    setIsCurrentCorrect={setIsCurrentCorrect}
                                />
                            )}
                            {type === 2 && (
                                <KanjiCard
                                    ques={currentQuestion}
                                    quesIndex={currentIndex}
                                    writtenPromptWith={writtenPromptWith}
                                    writtenAnswerWith={writtenAnswerWith}
                                    multiplePromptWith={multiplePromptWith}
                                    multipleAnswerWith={multipleAnswerWith}
                                    trueFalsePromptWith={trueFalsePromptWith}
                                    trueFalseAnswerWith={trueFalseAnswerWith}
                                    showPicture={showPicture}
                                    showAudio={showAudio}
                                    showNote={showNote}
                                    setCurrentAnswer={setCurrentAnswer}
                                    currentAnswer={currentAnswer}
                                    isCurrentCorrect={isCurrentCorrect}
                                    setIsCurrentCorrect={setIsCurrentCorrect}
                                />
                            )}
                            {type === 3 && (
                                <GrammarCard
                                    ques={currentQuestion}
                                    quesIndex={currentIndex}
                                    writtenPromptWith={writtenPromptWith}
                                    writtenAnswerWith={writtenAnswerWith}
                                    multiplePromptWith={multiplePromptWith}
                                    multipleAnswerWith={multipleAnswerWith}
                                    trueFalsePromptWith={trueFalsePromptWith}
                                    trueFalseAnswerWith={trueFalseAnswerWith}
                                    showPicture={showPicture}
                                    showAudio={showAudio}
                                    showNote={showNote}
                                    setCurrentAnswer={setCurrentAnswer}
                                    currentAnswer={currentAnswer}
                                    isCurrentCorrect={isCurrentCorrect}
                                    setIsCurrentCorrect={setIsCurrentCorrect}
                                />
                            )}
                        </section>
                    )}
                    {/* continue box */}
                    {((isCurrentCorrect === false && !isFinish) || isEnd) && (
                        <div className="learnIncorrectBox">
                            <div className="quizQues_container h-100 d-flex align-items-center justify-content-between">
                                <span className="quizQues_label">
                                    {t('msg24')}
                                </span>
                                <button
                                    className="btn btn-primary"
                                    onClick={nextQuestion}
                                >
                                    {t('continue')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="mt-5 text-center">
                    <h4>{t('msg25')}</h4>
                </div>
            )}
            {/* Option modal */}
            <Modal
                className="quizOptionModal"
                id="learnOptionModal"
                size="lg"
                show={showOptionModal}
                onHide={() => {
                    setShowOptionModal(false)
                }}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="quizOptionModalLabel">
                            {t('option')}
                        </h3>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={handleCancelCreateLearn}
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
                                {/* types */}
                                <div className="quizOptionBlock">
                                    <legend>{t('qtypes')}</legend>
                                    <div className="mb-2">
                                        <input
                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                            type="checkbox"
                                            value={1}
                                            checked={
                                                optionQuestionTypes?.includes(
                                                    1
                                                ) || ''
                                            }
                                            id="written"
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
                                    <div className="mb-2">
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
                                {/* picture */}
                                <div className="quizOptionBlock">
                                    <legend>{t('picture')}</legend>
                                    <div className="mb-2">
                                        <input
                                            id="picture"
                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                            type="checkbox"
                                            checked={optionShowPicture}
                                            onChange={() => {
                                                setOptionShowPicture(
                                                    !optionShowPicture
                                                )
                                            }}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="picture"
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
                                            id="audio"
                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                            type="checkbox"
                                            checked={optionShowAudio}
                                            onChange={() => {
                                                setOptionShowAudio(
                                                    !optionShowAudio
                                                )
                                            }}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="audio"
                                        >
                                            {t('show')} {t('audio')}
                                        </label>
                                    </div>
                                </div>
                                {/* note */}
                                <div className="quizOptionBlock">
                                    <legend>{t('note')}</legend>
                                    <div className="mb-2">
                                        <input
                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                            type="checkbox"
                                            checked={optionShowNote}
                                            id="note"
                                            onChange={() => {
                                                setOptionShowNote(
                                                    !optionShowNote
                                                )
                                            }}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="note"
                                        >
                                            {t('show')} {t('note')}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                {/* status */}
                                <div className="quizOptionBlock">
                                    <legend>{t('pst')}</legend>
                                    <div className="mb-2">
                                        <input
                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                            type="checkbox"
                                            value="not studied"
                                            checked={
                                                optionProgressStatus?.includes(
                                                    'not studied'
                                                ) || ''
                                            }
                                            id="notStudied"
                                            onChange={
                                                handleChangeProgressStatus
                                            }
                                            disabled={
                                                optionIsStar
                                                    ? numNotStar == 0
                                                    : numNot == 0
                                            }
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="notStudied"
                                        >
                                            {t('nstudied')}
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                            type="checkbox"
                                            value="still learning"
                                            checked={
                                                optionProgressStatus?.includes(
                                                    'still learning'
                                                ) || ''
                                            }
                                            id="stillLearning"
                                            onChange={
                                                handleChangeProgressStatus
                                            }
                                            disabled={
                                                optionIsStar
                                                    ? numStillStar == 0
                                                    : numStill == 0
                                            }
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="stillLearning"
                                        >
                                            {t('still')}
                                        </label>
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                            type="checkbox"
                                            value="mastered"
                                            checked={
                                                optionProgressStatus?.includes(
                                                    'mastered'
                                                ) || ''
                                            }
                                            id="mastered"
                                            onChange={
                                                handleChangeProgressStatus
                                            }
                                            disabled={
                                                optionIsStar
                                                    ? numMasterStar == 0
                                                    : numMaster == 0
                                            }
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="mastered"
                                        >
                                            {t('master')}
                                        </label>
                                    </div>
                                </div>
                                {/* star */}
                                <div className="quizOptionBlock">
                                    <legend>{t('star')}</legend>
                                    <div className="mb-2">
                                        <input
                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                            type="checkbox"
                                            checked={optionIsStar}
                                            id="isStar"
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
                                {/* shuffle  */}
                                <div className="quizOptionBlock">
                                    <legend>{t('shuffle')}</legend>
                                    <div className="mb-2">
                                        <input
                                            id="shuffle"
                                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                            type="checkbox"
                                            checked={optionIsShuffle}
                                            onChange={() => {
                                                setOptionIsShuffle(
                                                    !optionIsShuffle
                                                )
                                            }}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="shuffle"
                                        >
                                            {t('scard')}
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
                            data-bs-dismiss="modal"
                            onClick={handleCancelCreateLearn}
                        >
                            {t('cancel')}
                        </button>
                        <button
                            className="btn btn-primary classModalBtn"
                            onClick={handleCreateLearn}
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
                                'Create new learn'
                            )}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Learn
