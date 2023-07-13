import { useState } from 'react'

const CreateTest = () => {
    const [error, setError] = useState('')
    const [questions, setQuestions] = useState([])

    const handleCreate = () => {}

    const handleAddQuestion = async () => {
        try {
            const ques = {}
            setQuestions([...questions, ques])
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
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
                        <div class="alert alert-danger mb-4" role="alert">
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
            {questions.map((ques, index) => (
                <div className="card mt-4">
                    <div className="card-body p-4">
                        <div className="createTest_formGroup mb-4">
                            <input
                                type="text"
                                className="form-control"
                                id={`question${index}`}
                                name="question"
                                placeholder="Question"
                            />
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
