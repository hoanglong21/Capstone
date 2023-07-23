import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import StudySetService from '../../../services/StudySetService'
import FieldService from '../../../services/FieldService'

import {
    StudySetSolidIcon,
    ArrowDownIcon,
    CloseIcon,
    LearnSolidIcon,
    TestSolidIcon,
} from '../../../components/icons'
import FormStyles from '../../../assets/styles/Form.module.css'
import './quiz.css'

const DoQuiz = () => {
    const navigate = useNavigate()

    const { id } = useParams()

    const [studySet, setStudySet] = useState({})
    const [fields, setFields] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const tempStudySet = (await StudySetService.getStudySetById(id))
                .data
            setStudySet(tempStudySet)
            const tempFields = (
                await FieldService.getFieldsByStudySetTypeId(tempStudySet.id)
            ).data
            setFields(tempFields)
        }
        if (id) {
            fetchData()
        }
    }, [id])

    return (
        <div>
            {/* Header */}
            <div className="flashcardHeader d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <TestSolidIcon className="flashcardModeIcon" size="2rem" />
                    <div className="flashcardMode dropdown d-flex align-items-center">
                        <button
                            type="button dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="ps-2 me-2">Quiz</span>
                            <ArrowDownIcon size="1rem" strokeWidth="2.6" />
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <button
                                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                                    type="button"
                                >
                                    <StudySetSolidIcon
                                        className="me-3 flashcardModeIcon"
                                        size="1.3rem"
                                    />
                                    <span className="align-middle fw-semibold">
                                        Flashcards
                                    </span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item flashcardModeIcon py-2 px-3 d-flex align-items-center"
                                    type="button"
                                >
                                    <LearnSolidIcon
                                        className="me-3 flashcardModeIcon"
                                        size="1.3rem"
                                        strokeWidth="2"
                                    />
                                    <span className="align-middle fw-semibold">
                                        Learn
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
                                        Home
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flashcardInfo d-flex flex-column align-items-center">
                    <h3>1/20</h3>
                    <h3>MLN111</h3>
                </div>
                <div className="flashcardOptions d-flex">
                    <button
                        className="flashcardOptions_btn"
                        data-bs-toggle="modal"
                        data-bs-target="#quizOptionModal"
                    >
                        Options
                    </button>
                    <button
                        className="flashcardClose_btn ms-3 d-flex align-items-center"
                        onClick={() => {
                            navigate(`/set/${id}`)
                        }}
                    >
                        <CloseIcon strokeWidth="2" />
                    </button>
                </div>
            </div>

            {/* Button Submit */}
            <div className="text-center mt-3 mb-5">
                <button
                    type="submit"
                    className="bg-primary text-white border border-primary rounded-3 py-2 px-4 fw-bold fs-7 ms-3"
                >
                    Submit Quiz
                </button>
            </div>
            {/* Option modal */}
            <div
                className="modal fade quizOptionModal"
                id="quizOptionModal"
                tabIndex="-1"
                aria-labelledby="quizOptionModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3
                                className="modal-title"
                                id="quizOptionModalLabel"
                            >
                                Options
                            </h3>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-3">
                                <div className="col-6">
                                    <div className="quizOptionBlock">
                                        <legend>QUESTION TYPES</legend>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                value=""
                                                id="written"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="written"
                                            >
                                                Written
                                            </label>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                value=""
                                                id="mupltipleChoice"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="mupltipleChoice"
                                            >
                                                Multiple choice
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                value=""
                                                id="trueFalse"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="trueFalse"
                                            >
                                                True/False
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="quizOptionBlock mb-4">
                                        <legend>QUESTION LIMIT</legend>
                                        <div className="mb-2 d-flex align-items-center">
                                            <input
                                                className="form-control"
                                                type="number"
                                                id="quesLimit"
                                            />
                                            <p className="form-check-label m-0">
                                                of 2 questions
                                            </p>
                                        </div>
                                    </div>
                                    <div className="quizOptionBlock">
                                        <legend>NOTE</legend>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                value=""
                                                id="note"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="note"
                                            >
                                                Show note
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="quizOptionBlock mb-4">
                                        <legend>PROMPT WITH</legend>
                                        {fields?.map((field, index) => (
                                            <div className="mb-2" index={index}>
                                                <input
                                                    className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                    type="checkbox"
                                                    value=""
                                                    id="note"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="note"
                                                >
                                                    {field.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="quizOptionBlock">
                                        <legend>ANSWER WITH</legend>
                                        {fields?.map((field, index) => (
                                            <div className="mb-2" index={index}>
                                                <input
                                                    className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                    type="checkbox"
                                                    value=""
                                                    id="note"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="note"
                                                >
                                                    {field.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary classModalBtn me-3"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button className="btn btn-primary classModalBtn">
                                Create new quiz
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoQuiz
