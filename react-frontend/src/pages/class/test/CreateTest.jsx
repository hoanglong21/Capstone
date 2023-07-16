import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { uploadFile } from '../../../features/fileManagement'
import ClassService from '../../../services/ClassService'

import {
    CloseIcon,
    CopyIcon,
    DeleteIcon,
    ImageIcon,
    SpeakIcon,
    VideoIcon,
} from '../../../components/icons'

const CreateTest = () => {
    const { id } = useParams()
    const { userInfo } = useSelector((state) => state.user)

    const [error, setError] = useState('')
    const [test, setTest] = useState({})
    const [questions, setQuestions] = useState([])
    const [classroom, setClassroom] = useState({})

    function padWithLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0')
    }

    function getToday() {
        const today = new Date()
        return (
            today.getFullYear() +
            '-' +
            padWithLeadingZeros(today.getMonth() + 1, 2) +
            '-' +
            padWithLeadingZeros(today.getDate() + 1, 2) +
            'T' +
            padWithLeadingZeros(today.getHours(), 2) +
            ':' +
            padWithLeadingZeros(today.getMinutes(), 2)
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            const tempClass = (await ClassService.getClassroomById(id)).data
            setClassroom(tempClass)
            setTest({
                title: '',
                classroom: {
                    id: tempClass.id,
                },
                user: {
                    id: userInfo.id,
                },
                description: '',
                duration: '',
                num_attemps: '',
                due_date: '',
                start_date: getToday(),
                created_date: getToday(),
                _draft: true,
            })
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [userInfo])

    const handleCreate = () => {}

    const handleAddQuestion = async () => {
        try {
            const ques = {
                question: '',
                questionType: {
                    id: 2,
                },
                picture: null,
                audio: null,
                video: null,
                answers: [],
            }
            setQuestions([...questions, ques])
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
        }
    }

    const handleAddAnswer = async (quesIndex) => {
        try {
            const ans = {
                content: '',
                _true: false,
            }
            var tempQuestions = [...questions]
            var tempAnswers = [...tempQuestions[quesIndex].answers]
            tempAnswers.push(ans)
            tempQuestions[quesIndex] = {
                ...tempQuestions[quesIndex],
                answers: tempAnswers,
            }
            setQuestions(tempQuestions)
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
        }
    }

    const handleAnswerFocus = (quesIndex, ansIndex) => {
        const buttonsEl = document
            .getElementById(`createAnswer${quesIndex}-${ansIndex}`)
            .querySelectorAll(`#createAnswer${quesIndex}-${ansIndex} .btn-hide`)
        for (const btnEl of buttonsEl) {
            btnEl.classList.add('d-inline-block')
        }
    }

    const handleAnswerBlur = (event, quesIndex, ansIndex) => {
        const buttonsEl = document
            .getElementById(`createAnswer${quesIndex}-${ansIndex}`)
            .querySelectorAll(`#createAnswer${quesIndex}-${ansIndex} .btn-hide`)
        for (const btnEl of buttonsEl) {
            btnEl.classList.remove('d-inline-block')
        }
    }

    const handleChangeAnswer = (event, quesIndex, ansIndex) => {
        var tempQuestions = [...questions]
        var tempAnswers = [...tempQuestions[quesIndex].answers]
        tempAnswers[ansIndex] = {
            ...tempAnswers[ansIndex],
            content: event.target.value,
        }
        tempQuestions[quesIndex] = {
            ...tempQuestions[quesIndex],
            answers: tempAnswers,
        }
        setQuestions(tempQuestions)
    }

    const handleChangeAnswerCorrect = (event, quesIndex, ansIndex) => {
        var tempQuestions = [...questions]
        var tempAnswers = [...tempQuestions[quesIndex].answers]
        tempAnswers[ansIndex] = {
            ...tempAnswers[ansIndex],
            _true: event.target.checked,
        }
        tempQuestions[quesIndex] = {
            ...tempQuestions[quesIndex],
            answers: tempAnswers,
        }
        setQuestions(tempQuestions)
    }

    const handleChangeQuestion = (event, quesIndex) => {
        var tempQuestions = [...questions]
        tempQuestions[quesIndex] = {
            ...tempQuestions[quesIndex],
            [event.target.name]: event.target.value,
        }
        setQuestions(tempQuestions)
    }

    const handleUploadFileQuestion = async (event, quesIndex) => {
        var file = event.target.files[0]
        if (file) {
            var tempQuestions = [...questions]
            tempQuestions[quesIndex] = {
                ...tempQuestions[quesIndex],
                [event.target.name]: file,
            }
            setQuestions(tempQuestions)
        }
    }

    const handleChangeTest = (event) => {
        setTest({ ...test, [event.target.name]: event.target.value })
    }

    const handleUploadFileAnswer = async (event, quesIndex, ansIndex) => {
        const file = event.target.files[0]
        if (file) {
            var tempQuestions = [...questions]
            var tempAnswers = [...tempQuestions[quesIndex].answers]
            tempAnswers[ansIndex] = {
                ...tempAnswers[ansIndex],
                [event.target.name]: file,
            }
            tempQuestions[quesIndex] = {
                ...tempQuestions[quesIndex],
                answers: tempAnswers,
            }
            setQuestions(tempQuestions)
        }
    }

    const handleDeleteAnswer = (event, quesIndex, ansIndex) => {
        var tempQuestions = [...questions]
        var tempAnswers = [...tempQuestions[quesIndex].answers]
        tempAnswers.splice(ansIndex, 1)
        tempQuestions[quesIndex] = {
            ...tempQuestions[quesIndex],
            answers: tempAnswers,
        }
        setQuestions(tempQuestions)
    }

    const handleDeleteQues = (quesIndex) => {
        var tempQuestions = [...questions]
        tempQuestions.splice(quesIndex, 1)
        setQuestions(tempQuestions)
    }

    const handleDuplicateQues = (quesIndex) => {
        var tempQuestions = [...questions]
        tempQuestions.splice(quesIndex, 0, { ...tempQuestions[quesIndex] })
        setQuestions(tempQuestions)
    }

    const handleDeleteFileQues = (event, quesIndex) => {
        var tempQuestions = [...questions]
        tempQuestions[quesIndex] = {
            ...tempQuestions[quesIndex],
            [event.target.name]: null,
        }
        setQuestions(tempQuestions)
    }

    const handleDeleteFileAns = (event, quesIndex, ansIndex) => {
        var tempQuestions = [...questions]
        var tempAnswers = [...tempQuestions[quesIndex].answers]
        tempAnswers[ansIndex] = {
            ...tempAnswers[ansIndex],
            [event.target.name]: null,
        }
        tempQuestions[quesIndex] = {
            ...tempQuestions[quesIndex],
            answers: tempAnswers,
        }
        setQuestions(tempQuestions)
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <button className="createTest_cancelBtn">cancel</button>
                <div className="d-flex">
                    <button
                        className="createTest_submitBtn"
                        onClick={handleCreate}
                    >
                        Create
                    </button>
                    <button className="createTest_draftBtn">Save draft</button>
                </div>
            </div>
            {/* Test */}
            <div className="card mt-4">
                <div className="card-body p-4">
                    {error && (
                        <div className="alert alert-danger mb-4" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="createTest_formGroup form-floating mb-4">
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder="title"
                            value={test?.title || ''}
                            onChange={handleChangeTest}
                        />
                        <label htmlFor="title" className="createTest_formLabel">
                            Title
                        </label>
                    </div>
                    <div className="createTest_formGroup form-floating mb-4">
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="description"
                            value={test?.description || ''}
                            onChange={handleChangeTest}
                        />
                        <label
                            htmlFor="description"
                            className="createTest_formLabel"
                        >
                            Description
                        </label>
                    </div>
                    <div className="row mb-4">
                        <div className="col-6">
                            <div className="createTest_formGroup form-floating">
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="start_date"
                                    id="start_date"
                                    placeholder="start date"
                                    value={test?.start_date || ''}
                                    onChange={handleChangeTest}
                                />
                                <label
                                    htmlFor="start_date"
                                    className="createTest_formLabel"
                                >
                                    Start date
                                </label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="createTest_formGroup form-floating">
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="due_date"
                                    name="due_date"
                                    placeholder="due date"
                                    value={test?.due_date || ''}
                                    onChange={handleChangeTest}
                                />
                                <label
                                    htmlFor="due_date"
                                    className="createTest_formLabel"
                                >
                                    Due date
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-6">
                            <div className="createTest_formGroup form-floating">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="duration"
                                    id="duration"
                                    placeholder="duration"
                                    value={test?.duration || ''}
                                    onChange={handleChangeTest}
                                />
                                <label
                                    htmlFor="duration"
                                    className="createTest_formLabel"
                                >
                                    Duration (minutes)
                                </label>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="createTest_formGroup form-floating">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="num_attemps"
                                    name="num_attemps"
                                    placeholder="Number of attempts"
                                    value={test?.num_attemps || ''}
                                    onChange={handleChangeTest}
                                />
                                <label
                                    htmlFor="num_attemps"
                                    className="createTest_formLabel"
                                >
                                    Number of attempts allowed for learners
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Question */}
            {questions.map((ques, quesIndex) => (
                <div className="card mt-4" key={quesIndex}>
                    <div className="card-body p-4">
                        <div className="createTest_formGroup mb-4 d-flex align-items-center">
                            <input
                                type="text"
                                className="form-control"
                                name="question"
                                placeholder="Question"
                                value={ques?.question || ''}
                                onChange={(event) =>
                                    handleChangeQuestion(event, quesIndex)
                                }
                            />
                            {/* picture question */}
                            <input
                                type="file"
                                id={`uploadQuesImg${quesIndex}`}
                                name="picture"
                                accept="image/*"
                                className="postUpload"
                                onClick={(event) => {
                                    event.target.value = null
                                }}
                                onChange={(event) =>
                                    handleUploadFileQuestion(event, quesIndex)
                                }
                            />
                            <button className="btn p-0" type="btn">
                                <label
                                    htmlFor={`uploadQuesImg${quesIndex}`}
                                    className="btn-customLight ms-3 p-2 rounded-circle d-flex align-items-center justify-content-center"
                                >
                                    <ImageIcon />
                                </label>
                            </button>
                            {/* audio question */}
                            <input
                                type="file"
                                id={`uploadQuesAudio${quesIndex}`}
                                name="audio"
                                accept="audio/*"
                                className="postUpload"
                                onClick={(event) => {
                                    event.target.value = null
                                }}
                                onChange={(event) =>
                                    handleUploadFileQuestion(event, quesIndex)
                                }
                            />
                            <button className="btn p-0" type="btn">
                                <label
                                    htmlFor={`uploadQuesAudio${quesIndex}`}
                                    className="btn-customLight ms-1 p-2 rounded-circle d-flex align-items-center justify-content-center"
                                >
                                    <SpeakIcon />
                                </label>
                            </button>
                            {/* video question */}
                            <input
                                type="file"
                                id={`uploadQuesVideo${quesIndex}`}
                                name="video"
                                accept="video/*"
                                className="postUpload"
                                onClick={(event) => {
                                    event.target.value = null
                                }}
                                onChange={(event) =>
                                    handleUploadFileQuestion(event, quesIndex)
                                }
                            />
                            <button className="btn p-0" type="btn">
                                <label
                                    htmlFor={`uploadQuesVideo${quesIndex}`}
                                    className="btn-customLight ms-1 p-2 rounded-circle d-flex align-items-center justify-content-center"
                                >
                                    <VideoIcon />
                                </label>
                            </button>
                        </div>
                        <div className="row">
                            {ques?.picture && (
                                <div className="col-6 mb-2">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={URL.createObjectURL(
                                                ques?.picture
                                            )}
                                            className="createTest_img"
                                            alt="question picture"
                                        />
                                        <button
                                            type="button"
                                            name="picture"
                                            className="btn btn-danger ms-5 p-2 rounded-circle"
                                            onClick={(event) =>
                                                handleDeleteFileQues(
                                                    event,
                                                    quesIndex
                                                )
                                            }
                                        >
                                            <DeleteIcon size="1.25rem" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {ques?.audio && (
                                <div className="col-6 mb-2">
                                    <div className="d-flex align-items-center">
                                        <audio
                                            controls
                                            src={URL.createObjectURL(
                                                ques?.audio
                                            )}
                                            alt="question audio"
                                        />
                                        <button
                                            type="button"
                                            name="audio"
                                            className="btn btn-danger ms-5 p-2 rounded-circle"
                                            onClick={(event) =>
                                                handleDeleteFileQues(
                                                    event,
                                                    quesIndex
                                                )
                                            }
                                        >
                                            <DeleteIcon size="1.25rem" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {ques?.video && (
                                <div className="col-6 mb-2">
                                    <div className="d-flex align-items-center">
                                        <video
                                            className="createTest_video"
                                            controls
                                            src={URL.createObjectURL(
                                                ques?.video
                                            )}
                                        >
                                            Your browser does not support the
                                            video tag.
                                        </video>
                                        <button
                                            type="button"
                                            name="video"
                                            className="btn btn-danger ms-5 p-2 rounded-circle"
                                            onClick={(event) =>
                                                handleDeleteFileQues(
                                                    event,
                                                    quesIndex
                                                )
                                            }
                                        >
                                            <DeleteIcon size="1.25rem" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Answer */}
                        {ques?.answers?.map((ans, ansIndex) => (
                            <div>
                                <div
                                    className="createAnswerContainer createTest_formGroup-sm mb-2 form-check d-flex align-items-center"
                                    key={ansIndex}
                                >
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={ans?._draft || false}
                                        onChange={(event) =>
                                            handleChangeAnswerCorrect(
                                                event,
                                                quesIndex,
                                                ansIndex
                                            )
                                        }
                                    />
                                    <div
                                        className="createAnswerContainer_btn d-flex align-items-center w-100"
                                        id={`createAnswer${quesIndex}-${ansIndex}`}
                                    >
                                        <input
                                            type="text"
                                            className="form-control ms-3"
                                            placeholder="Option"
                                            value={ans?.content || ''}
                                            onChange={(event) =>
                                                handleChangeAnswer(
                                                    event,
                                                    quesIndex,
                                                    ansIndex
                                                )
                                            }
                                            onFocus={() =>
                                                handleAnswerFocus(
                                                    quesIndex,
                                                    ansIndex
                                                )
                                            }
                                            onBlur={(event) =>
                                                handleAnswerBlur(
                                                    event,
                                                    quesIndex,
                                                    ansIndex
                                                )
                                            }
                                        />
                                        {/* picture answer */}
                                        {!ans?.picture && (
                                            <div>
                                                <input
                                                    type="file"
                                                    id={`uploadAnsImg${quesIndex}-${ansIndex}`}
                                                    name="picture"
                                                    accept="image/*"
                                                    className="postUpload"
                                                    onChange={(event) =>
                                                        handleUploadFileAnswer(
                                                            event,
                                                            quesIndex,
                                                            ansIndex
                                                        )
                                                    }
                                                />
                                                <button
                                                    className="btn-hide p-0"
                                                    type="btn"
                                                    onMouseDown={(e) =>
                                                        e.preventDefault()
                                                    }
                                                >
                                                    <label
                                                        htmlFor={`uploadAnsImg${quesIndex}-${ansIndex}`}
                                                        className="btn-customLight ms-3 p-2 rounded-circle d-flex align-items-center justify-content-center"
                                                    >
                                                        <ImageIcon />
                                                    </label>
                                                </button>
                                            </div>
                                        )}

                                        {/* audio answer */}
                                        <input
                                            type="file"
                                            id={`uploadAnsAudio${quesIndex}-${ansIndex}`}
                                            name="audio"
                                            accept="audio/*"
                                            className="postUpload"
                                            onChange={(event) =>
                                                handleUploadFileAnswer(
                                                    event,
                                                    quesIndex,
                                                    ansIndex
                                                )
                                            }
                                        />
                                        <button
                                            className="btn-hide p-0"
                                            type="btn"
                                            onMouseDown={(e) =>
                                                e.preventDefault()
                                            }
                                        >
                                            <label
                                                htmlFor={`uploadAnsAudio${quesIndex}-${ansIndex}`}
                                                className="btn-customLight ms-1 p-2 rounded-circle d-flex align-items-center justify-content-center"
                                            >
                                                <SpeakIcon />
                                            </label>
                                        </button>
                                        {/* video question */}
                                        <input
                                            type="file"
                                            id={`uploadAnsVideo${quesIndex}-${ansIndex}`}
                                            name="video"
                                            accept="video/*"
                                            className="d-none"
                                            onChange={(event) =>
                                                handleUploadFileQuestion(
                                                    event,
                                                    quesIndex
                                                )
                                            }
                                        />
                                        <button
                                            className="btn-hide p-0"
                                            type="btn"
                                            onMouseDown={(e) =>
                                                e.preventDefault()
                                            }
                                        >
                                            <label
                                                htmlFor={`uploadAnsVideo${quesIndex}-${ansIndex}`}
                                                className="btn-customLight ms-1 p-2 rounded-circle d-flex align-items-center justify-content-center"
                                            >
                                                <VideoIcon />
                                            </label>
                                        </button>
                                        <button
                                            className="btn-customLight ms-1 p-2 rounded-circle"
                                            style={{ marginRight: '-0.5rem' }}
                                            onMouseDown={(e) =>
                                                e.preventDefault()
                                            }
                                            onClick={(event) =>
                                                handleDeleteAnswer(
                                                    event,
                                                    quesIndex,
                                                    ansIndex
                                                )
                                            }
                                        >
                                            <CloseIcon />
                                        </button>
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    {ans?.picture && (
                                        <div className="col-6 mb-2">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={URL.createObjectURL(
                                                        ans?.picture
                                                    )}
                                                    className="createTest_img"
                                                    alt="question picture"
                                                />
                                                <button
                                                    type="button"
                                                    name="picture"
                                                    className="btn btn-danger ms-5 p-2 rounded-circle"
                                                    onClick={(event) =>
                                                        handleDeleteFileQues(
                                                            event,
                                                            quesIndex,
                                                            ansIndex
                                                        )
                                                    }
                                                >
                                                    <DeleteIcon size="1.25rem" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {ans?.audio && (
                                        <div className="col-6 mb-2">
                                            <div className="d-flex align-items-center">
                                                <audio
                                                    controls
                                                    src={URL.createObjectURL(
                                                        ans?.audio
                                                    )}
                                                    alt="answer audio"
                                                />
                                                <button
                                                    type="button"
                                                    name="audio"
                                                    className="btn btn-danger ms-5 p-2 rounded-circle"
                                                    onClick={(event) =>
                                                        handleDeleteFileAns(
                                                            event,
                                                            quesIndex,
                                                            ansIndex
                                                        )
                                                    }
                                                >
                                                    <DeleteIcon size="1.25rem" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {ans?.video && (
                                        <div className="col-6 mb-2">
                                            <div className="d-flex align-items-center">
                                                <video
                                                    className="createTest_video"
                                                    controls
                                                    src={URL.createObjectURL(
                                                        ans?.video
                                                    )}
                                                >
                                                    Your browser does not
                                                    support the video tag.
                                                </video>
                                                <button
                                                    type="button"
                                                    name="video"
                                                    className="btn btn-danger ms-5 p-2 rounded-circle"
                                                    onClick={(event) =>
                                                        handleDeleteFileAns(
                                                            event,
                                                            quesIndex,
                                                            ansIndex
                                                        )
                                                    }
                                                >
                                                    <DeleteIcon size="1.25rem" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="createTest_addOptionBtn"
                            onClick={() => handleAddAnswer(quesIndex)}
                        >
                            Add option
                        </button>
                    </div>
                    <div className="card-footer bg-white d-flex align-items-center justify-content-between">
                        <div className="createTest_formGroup d-flex align-items-center">
                            <input
                                type="number"
                                className="form-control me-2"
                                name="point"
                                placeholder="Point"
                                style={{ width: '5rem' }}
                                value={ques?.point || ''}
                                onChange={(event) =>
                                    handleChangeQuestion(event, quesIndex)
                                }
                            />
                            <span>points</span>
                        </div>
                        <div>
                            <button
                                className="btn btn-customLight me-2 p-2 rounded-circle"
                                onClick={() => handleDuplicateQues(quesIndex)}
                            >
                                <CopyIcon />
                            </button>
                            <button
                                className="btn btn-customLight p-2 rounded-circle"
                                onClick={() => handleDeleteQues(quesIndex)}
                            >
                                <DeleteIcon />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <div className="card mt-4 mb-3 py-4">
                <div className="card-body d-flex justify-content-center">
                    <button
                        type="button"
                        className="createTest_addQuesBtn"
                        onClick={handleAddQuestion}
                    >
                        + ADD QUESTION
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateTest
