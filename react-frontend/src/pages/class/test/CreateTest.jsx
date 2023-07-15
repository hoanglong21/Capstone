import { useState } from 'react'
import {
    CloseIcon,
    CopyIcon,
    DeleteIcon,
    ImageIcon,
    PlaySolidIcon,
    SpeakIcon,
    VideoIcon,
} from '../../../components/icons'

const CreateTest = () => {
    const [error, setError] = useState('')
    const [questions, setQuestions] = useState([])

    const handleCreate = () => {}

    const handleAddQuestion = async () => {
        try {
            const ques = {
                question: '',
                questionType: {
                    id: 2,
                },
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

    const handleAddAnswer = async (ques_index) => {
        try {
            const ans = {
                content: '',
                _true: false,
            }
            var tempQuestions = [...questions]
            var tempAnswers = [...tempQuestions[ques_index].answers]
            tempAnswers.push(ans)
            tempQuestions[ques_index] = {
                ...tempQuestions[ques_index],
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

    const handleAnswerFocus = (ansIndex) => {
        const buttonsEl = document
            .getElementById(`createAnswer${ansIndex}`)
            .querySelectorAll('.btn')
        for (const btnEl of buttonsEl) {
            btnEl.classList.add('d-inline-block')
        }
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
                                    id="number_attempts"
                                    name="number_attempts"
                                    placeholder="due date"
                                />
                                <label
                                    htmlFor="number_attempts"
                                    className="createTest_formLabel"
                                >
                                    Number of attempts allowed for learners
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {questions.map((ques, quesIndex) => (
                <div className="card mt-4" key={quesIndex}>
                    <div className="card-body p-4">
                        <div className="createTest_formGroup mb-4 d-flex align-items-center">
                            <input
                                type="text"
                                className="form-control"
                                id={`question${quesIndex}`}
                                name="question"
                                placeholder="Question"
                            />
                            <button className="btn btn-customLight ms-3 p-2 rounded-circle">
                                <ImageIcon />
                            </button>
                            <button className="btn btn-customLight ms-1 p-2 rounded-circle">
                                <SpeakIcon />
                            </button>
                            <button className="btn btn-customLight ms-1 p-2 rounded-circle">
                                <VideoIcon />
                            </button>
                        </div>
                        {ques?.answers?.map((ans, ansIndex) => (
                            <div
                                className="createAnswerContainer createTest_formGroup-sm mb-2 form-check d-flex align-items-center"
                                key={ansIndex}
                            >
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                />
                                <div
                                    className="createAnswerContainer_btn d-flex align-items-center w-100"
                                    id={`createAnswer${ansIndex}`}
                                >
                                    <input
                                        type="text"
                                        className="form-control ms-3"
                                        placeholder="Option"
                                        onFocus={() =>
                                            handleAnswerFocus(ansIndex)
                                        }
                                    />
                                    <button className="btn btn-customLight ms-3 p-2 rounded-circle">
                                        <ImageIcon />
                                    </button>
                                    <button className="btn btn-customLight ms-1 p-2 rounded-circle">
                                        <SpeakIcon />
                                    </button>
                                    <button className="btn btn-customLight ms-1 p-2 rounded-circle">
                                        <VideoIcon />
                                    </button>
                                    <button className="btn btn-customLight ms-1 p-2 rounded-circle">
                                        <CloseIcon />
                                    </button>
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
                                id={`question${quesIndex}`}
                                name="question"
                                placeholder="Point"
                                style={{ width: '5rem' }}
                            />
                            <span>points</span>
                        </div>
                        <div>
                            <button className="btn btn-customLight me-2 p-2 rounded-circle">
                                <CopyIcon />
                            </button>
                            <button className="btn btn-customLight p-2 rounded-circle">
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
