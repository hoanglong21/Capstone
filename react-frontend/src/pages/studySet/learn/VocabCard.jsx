import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const VocabCard = ({
    ques,
    quesIndex,
    writtenPromptWith,
    writtenAnswerWith,
    multiplePromptWith,
    multipleAnswerWith,
    trueFalsePromptWith,
    trueFalseAnswerWith,
    showPicture,
    showAudio,
    showNote,
    setCurrentAnswer,
    currentAnswer,
    isCurrentCorrect,
    setIsCurrentCorrect,
}) => {
    const [correctAnswer, setCorrectAnswer] = useState(null)
    const [example, setExample] = useState(null)
    const { userLanguage } = useSelector((state) => state.user)
    const { userToken } = useSelector((state) => state.auth)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    useEffect(() => {
        if (ques?.question_type) {
            setExample(ques.question.content[2].content)
            if (ques?.question_type === 1 && document.getElementById(`quizQuesInput${quesIndex}`)) {
                document.getElementById(`quizQuesInput${quesIndex}`).value = ''
            }
            if (ques?.question_type === 2) {
                setCorrectAnswer(ques.question.card.id)
            }
            if (ques?.question_type === 3) {
                setCorrectAnswer(
                    ques.question.card.id === ques.answers[0].card.id
                )
            }
        }
    }, [ques])

    const handleAnswerWritten = (event) => {
        document.getElementById(`quizQuesInput${quesIndex}`).blur()
        event.preventDefault()
        // get correct answer
        var correctAnswer = ''
        for (const itemContent of ques.question.content) {
            if (itemContent.field.id === writtenAnswerWith) {
                const tempContent = itemContent.content
                    .replaceAll(/(<([^>]+)>)/gi, ' ')
                    .trim()
                correctAnswer = tempContent.toLowerCase()
                setCorrectAnswer(itemContent.content)
                break
            }
        }
        // check is correct
        if (currentAnswer.toLowerCase() == correctAnswer) {
            setIsCurrentCorrect(true)
        } else {
            setIsCurrentCorrect(false)
        }
    }

    const handleAnswerMultiple = (ans) => {
        // get correct answer
        const tempCurrent = ans.card.id
        setCurrentAnswer(tempCurrent)
        // check is correct
        if (tempCurrent === correctAnswer) {
            setIsCurrentCorrect(true)
        } else {
            setIsCurrentCorrect(false)
        }
    }

    const handleAnswerTrueFalse = (ans) => {
        // get correct answer
        setCurrentAnswer(ans)
        // check is correct
        if (ans === correctAnswer) {
            setIsCurrentCorrect(true)
        } else {
            setIsCurrentCorrect(false)
        }
    }

    return (
        <div className="card learnQuestionCard">
            {/* written */}
            {ques.question_type === 1 && (
                <div className="card-body d-flex flex-column">
                    <div className="flex-grow-1">
                        {/* question */}
                        {ques.question.content.map((itemContent, index) => {
                            if (writtenPromptWith === itemContent.field.id) {
                                return (
                                    <div key={index} className="mb-2">
                                        <div className="quizQues_label quizQues_label--sm mb-1">
                                            {itemContent.field.name}
                                        </div>
                                        <div
                                            className="quizQues_question"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    itemContent.content ||
                                                    '...',
                                            }}
                                        ></div>
                                    </div>
                                )
                            }
                        })}
                        {/* note */}
                        {showNote && (
                            <div
                                className="accordion flashcard_accordion"
                                id={`accordionNote${quesIndex}`}
                            >
                                <div className="accordion-item border-0">
                                    <h2 className="accordion-header">
                                        <button
                                            id={`toggleAccordionNoteBtn${quesIndex}`}
                                            name="flashcardContent_noteBtn"
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#progressNote${quesIndex}`}
                                            aria-expanded="false"
                                            aria-controls="progressNote"
                                        >
                                            <span>{t('note')}</span>
                                        </button>
                                    </h2>
                                    <div
                                        id={`progressNote${quesIndex}`}
                                        className="accordion-collapse collapse"
                                        data-bs-parent={`#accordionNote${quesIndex}`}
                                    >
                                        <div className="row">
                                            <div className="col-11">
                                                <div
                                                    className="accordion-body"
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            ques?.question
                                                                ?.progress
                                                                ?.note || '...',
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* picture + audio */}
                        {(showPicture || showAudio) && (
                            <div className="row">
                                {showPicture &&
                                    (ques?.question?.progress?.picture ||
                                        ques?.question?.card?.picture) && (
                                        <div className="col-6">
                                            <img
                                                src={
                                                    ques?.question?.progress
                                                        ?.picture ||
                                                    ques?.question?.card
                                                        ?.picture
                                                }
                                                className="quizQues_img"
                                            />
                                        </div>
                                    )}
                                {showAudio &&
                                    (ques?.question?.progress?.audio ||
                                        ques?.question?.card?.audio) && (
                                        <div className="col-6">
                                            <audio
                                                controls
                                                src={
                                                    ques?.question?.progress
                                                        ?.audio ||
                                                    ques?.question?.card?.audio
                                                }
                                            />
                                        </div>
                                    )}
                            </div>
                        )}
                    </div>
                    {/* answer */}
                    <div className="quizQues_label my-4">{t('yanswer')}</div>
                    <form className="d-flex">
                        <input
                            id={`quizQuesInput${quesIndex}`}
                            className={`form-control quizAns_input removeEvent ${
                                isCurrentCorrect === false
                                    ? 'incorrect'
                                    : isCurrentCorrect === true
                                    ? 'correct'
                                    : ''
                            }`}
                            readOnly={isCurrentCorrect !== null}
                            type="text"
                            placeholder="Type your answer here"
                            onChange={(event) =>
                                setCurrentAnswer(event.target.value)
                            }
                        />
                        <button
                            type="submit"
                            className="btn btn-primary ms-2"
                            onClick={handleAnswerWritten}
                            disabled={isCurrentCorrect !== null}
                        >
                            {t('answer')}
                        </button>
                    </form>
                    {isCurrentCorrect === false && (
                        <div>
                            <div className="quizQues_label my-4">
                                {t('correctans')}
                            </div>
                            <div className="quizQues_answer correct" disabled>
                                <div className="row">
                                    <div className="col-12 col-md-6 mt-2 mt-md-0">
                                        <div
                                            className="learnCorrectAnswer"
                                            dangerouslySetInnerHTML={{
                                                __html: correctAnswer,
                                            }}
                                        ></div>
                                    </div>
                                    <div className="col-12 col-md-6 mt-2 mt-md-0">
                                        <div className="learnExampleSection">
                                            <div className="learnExample_label">
                                                {t('example')}
                                            </div>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: example || '...',
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {/* multiple */}
            {ques.question_type === 2 && (
                <div className="card-body">
                    {/* question */}
                    {ques.question.content.map((itemContent, index) => {
                        if (multiplePromptWith === itemContent.field.id) {
                            return (
                                <div key={index} className="mb-2">
                                    <div className="quizQues_label quizQues_label--sm mb-1">
                                        {itemContent.field.name}
                                    </div>
                                    <div
                                        className="quizQues_question"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                itemContent.content || '...',
                                        }}
                                    ></div>
                                </div>
                            )
                        }
                    })}
                    {/* note */}
                    {showNote && (
                        <div
                            className="accordion flashcard_accordion"
                            id={`accordionNote${quesIndex}`}
                        >
                            <div className="accordion-item border-0">
                                <h2 className="accordion-header">
                                    <button
                                        id={`toggleAccordionNoteBtn${quesIndex}`}
                                        name="flashcardContent_noteBtn"
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#progressNote${quesIndex}`}
                                        aria-expanded="false"
                                        aria-controls="progressNote"
                                    >
                                        <span>{t('note')}</span>
                                    </button>
                                </h2>
                                <div
                                    id={`progressNote${quesIndex}`}
                                    className="accordion-collapse collapse"
                                    data-bs-parent={`#accordionNote${quesIndex}`}
                                >
                                    <div className="row">
                                        <div className="col-11">
                                            <div
                                                className="accordion-body"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        ques?.question?.progress
                                                            ?.note || '...',
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* picture + card */}
                    {(showPicture || showAudio) && (
                        <div className="row">
                            {showPicture &&
                                (ques?.question?.progress?.picture ||
                                    ques?.question?.card?.picture) && (
                                    <div className="col-6">
                                        <img
                                            src={
                                                ques?.question?.progress
                                                    ?.picture ||
                                                ques?.question?.card?.picture
                                            }
                                            className="quizQues_img"
                                        />
                                    </div>
                                )}
                            {showAudio &&
                                (ques?.question?.progress?.audio ||
                                    ques?.question?.card?.audio) && (
                                    <div className="col-6">
                                        <audio
                                            controls
                                            src={
                                                ques?.question?.progress
                                                    ?.audio ||
                                                ques?.question?.card?.audio
                                            }
                                        />
                                    </div>
                                )}
                        </div>
                    )}
                    {/* answer */}
                    <div className="quizQues_label my-4">{t('choose')}</div>
                    <div className="row">
                        {ques.answers.map((ans, ansIndex) => (
                            <div
                                key={ansIndex}
                                className="col-12 col-md-6 mb-3"
                            >
                                <div
                                    className={`quizQues_answer h-100 ${
                                        currentAnswer === ans.card.id &&
                                        isCurrentCorrect === false
                                            ? 'incorrect'
                                            : (currentAnswer === ans.card.id &&
                                                  isCurrentCorrect === true) ||
                                              (correctAnswer === ans.card.id &&
                                                  isCurrentCorrect === false)
                                            ? 'correct'
                                            : ''
                                    }`}
                                    disabled={isCurrentCorrect !== null}
                                    onClick={() => handleAnswerMultiple(ans)}
                                >
                                    {ans.content.map((itemContent, index) => {
                                        if (
                                            multipleAnswerWith ===
                                            itemContent.field.id
                                        ) {
                                            return (
                                                <div
                                                    key={index}
                                                    className="mb-2"
                                                >
                                                    <div className="quizAns_label mb-1">
                                                        {itemContent.field.name}
                                                    </div>
                                                    <div
                                                        className="quizQues_question"
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                itemContent.content ||
                                                                '...',
                                                        }}
                                                    ></div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    {isCurrentCorrect === false && (
                        <div className="learnExampleSection">
                            <div className="learnExample_label">
                                {t('example')}
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: example || '...',
                                }}
                            ></div>
                        </div>
                    )}
                </div>
            )}
            {/* true false */}
            {ques.question_type === 3 && (
                <div className="card-body d-flex flex-column">
                    <div className="flex-grow-1">
                        {/* question */}
                        <div className="row mb-4">
                            <div className="col-6">
                                <div className="quizQues_question--left h-100">
                                    {ques.question.content.map(
                                        (itemContent, index) => {
                                            if (
                                                trueFalsePromptWith ===
                                                itemContent.field.id
                                            ) {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="mb-2"
                                                    >
                                                        <div className="quizQues_label quizQues_label--sm mb-1">
                                                            {
                                                                itemContent
                                                                    .field.name
                                                            }
                                                        </div>
                                                        <div
                                                            className="quizQues_question"
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    itemContent.content ||
                                                                    '...',
                                                            }}
                                                        ></div>
                                                    </div>
                                                )
                                            }
                                        }
                                    )}
                                    {/* note */}
                                    {showNote && (
                                        <div
                                            className="accordion flashcard_accordion"
                                            id={`accordionNote${quesIndex}`}
                                        >
                                            <div className="accordion-item border-0">
                                                <h2 className="accordion-header">
                                                    <button
                                                        id={`toggleAccordionNoteBtn${quesIndex}`}
                                                        name="flashcardContent_noteBtn"
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={`#progressNote${quesIndex}`}
                                                        aria-expanded="false"
                                                        aria-controls="progressNote"
                                                    >
                                                        <span>{t('note')}</span>
                                                    </button>
                                                </h2>
                                                <div
                                                    id={`progressNote${quesIndex}`}
                                                    className="accordion-collapse collapse"
                                                    data-bs-parent={`#accordionNote${quesIndex}`}
                                                >
                                                    <div className="row">
                                                        <div className="col-11">
                                                            <div
                                                                className="accordion-body"
                                                                dangerouslySetInnerHTML={{
                                                                    __html:
                                                                        ques
                                                                            ?.question
                                                                            ?.progress
                                                                            ?.note ||
                                                                        '...',
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="quizQues_question--right h-100">
                                    {ques.answers[0].content.map(
                                        (itemContent, index) => {
                                            if (
                                                trueFalseAnswerWith ===
                                                itemContent.field.id
                                            ) {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="mb-2"
                                                    >
                                                        <div className="quizQues_label quizQues_label--sm mb-1">
                                                            {
                                                                itemContent
                                                                    .field.name
                                                            }
                                                        </div>
                                                        <div
                                                            className="quizQues_question"
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    itemContent.content ||
                                                                    '...',
                                                            }}
                                                        ></div>
                                                    </div>
                                                )
                                            }
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* picture + card */}
                        {(showPicture || showAudio) && (
                            <div className="row">
                                {showPicture &&
                                    (ques?.question?.progress?.picture ||
                                        ques?.question?.card?.picture) && (
                                        <div className="col-6">
                                            <img
                                                src={
                                                    ques?.question?.progress
                                                        ?.picture ||
                                                    ques?.question?.card
                                                        ?.picture
                                                }
                                                className="quizQues_img"
                                            />
                                        </div>
                                    )}
                                {showAudio &&
                                    (ques?.question?.progress?.audio ||
                                        ques?.question?.card?.audio) && (
                                        <div className="col-6">
                                            <audio
                                                controls
                                                src={
                                                    ques?.question?.progress
                                                        ?.audio ||
                                                    ques?.question?.card?.audio
                                                }
                                            />
                                        </div>
                                    )}
                            </div>
                        )}
                    </div>
                    {/* answer */}
                    <div className="quizQues_label my-4">{t('choose')}</div>
                    <div className="row">
                        <div className="col-6">
                            <div
                                className={`quizQues_answer ${
                                    currentAnswer === true &&
                                    isCurrentCorrect === false
                                        ? 'incorrect'
                                        : currentAnswer === true &&
                                          isCurrentCorrect === true
                                        ? 'correct'
                                        : ''
                                }`}
                                disabled={isCurrentCorrect !== null}
                                onClick={() => handleAnswerTrueFalse(true)}
                            >
                                {t('true')}
                            </div>
                        </div>
                        <div className="col-6">
                            <div
                                className={`quizQues_answer ${
                                    currentAnswer === false &&
                                    isCurrentCorrect === false
                                        ? 'incorrect'
                                        : currentAnswer === false &&
                                          isCurrentCorrect === true
                                        ? 'correct'
                                        : ''
                                }`}
                                disabled={isCurrentCorrect !== null}
                                onClick={() => handleAnswerTrueFalse(false)}
                            >
                                {t('false')}
                            </div>
                        </div>
                    </div>
                    {isCurrentCorrect === false && (
                        <div>
                            <div className="quizQues_label my-4">
                                {t('correctans')}
                            </div>
                            <div className="quizQues_answer correct" disabled>
                                <div className="row">
                                    <div className="col-12 col-md-6 mt-2 mt-md-0">
                                        {ques.question.content.map(
                                            (itemContent, index) => {
                                                if (
                                                    trueFalseAnswerWith ===
                                                    itemContent.field.id
                                                ) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="mb-2"
                                                        >
                                                            <div
                                                                className="learnCorrectAnswer"
                                                                dangerouslySetInnerHTML={{
                                                                    __html:
                                                                        itemContent.content ||
                                                                        '...',
                                                                }}
                                                            ></div>
                                                        </div>
                                                    )
                                                }
                                            }
                                        )}
                                    </div>
                                    <div className="col-12 col-md-6 mt-2 mt-md-0">
                                        <div className="learnExampleSection">
                                            <div className="learnExample_label">
                                                {t('example')}
                                            </div>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: example || '...',
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
export default VocabCard
