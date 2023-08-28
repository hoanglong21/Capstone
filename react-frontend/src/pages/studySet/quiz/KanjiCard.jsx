import { useState } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const KanjiCard = ({
    ques,
    quesIndex,
    numQues,
    writtenPromptWith,
    writtenAnswerWith,
    multiplePromptWith,
    multipleAnswerWith,
    trueFalsePromptWith,
    trueFalseAnswerWith,
    handleChangeAnswer,
    setProgress,
    progress,
    answers,
    results,
    showPicture,
    showAudio,
}) => {
    const [correctAnswer, setCorrectAnswer] = useState(null)
    const [example, setExample] = useState(null)
    const { userToken } = useSelector((state) => state.auth)
    const { userLanguage } = useSelector((state) => state.user)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (userToken) {
            i18n.changeLanguage(userLanguage)
        }
    }, [userLanguage])

    useEffect(() => {
        if (ques?.question_type) {
            setExample(ques.question.content[2].content)
            if (
                ques?.question_type === 1 &&
                document.getElementById(`answerQues${quesIndex}`)
            ) {
                document.getElementById(`answerQues${quesIndex}`).value = ''
                for (const item of ques.answers[0].content) {
                    if (writtenAnswerWith == item.field.id) {
                        setCorrectAnswer(item.content)
                    }
                }
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

    return (
        <div className="card">
            <div className="quizQues_number">
                {quesIndex + 1} of {numQues}
            </div>
            {/* written */}
            {ques.question_type === 1 && (
                <div className="card-body">
                    {/* questions */}
                    {ques.question.content.map((itemContent, index) => {
                        if (writtenPromptWith?.includes(itemContent.field.id)) {
                            return (
                                <div key={index} className="mb-2">
                                    <div className="quizQues_label quizQues_label--sm mb-1">
                                        {itemContent.field.name}
                                    </div>
                                    {itemContent.field.id === 12 ? (
                                        <div className="quizQues_question">
                                            <img
                                                src={itemContent.content || ''}
                                                className="quizQues_img"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="quizQues_question"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    itemContent.content ||
                                                    '...',
                                            }}
                                        ></div>
                                    )}
                                </div>
                            )
                        }
                    })}
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
                    <div className="quizQues_label my-4">{t('yanswer')}</div>
                    <input
                        id={`answerQues${quesIndex}`}
                        className={`form-control quizAns_input ${
                            results[quesIndex] === 0
                                ? 'incorrect'
                                : results[quesIndex] === 1
                                ? 'correct'
                                : ''
                        }`}
                        type="text"
                        placeholder="Type your answer here"
                        value={answers[quesIndex] || ''}
                        readOnly={results[quesIndex] !== null}
                        onChange={(event) => {
                            handleChangeAnswer(event.target.value, quesIndex)
                            if (
                                answers[quesIndex] === null &&
                                event.target.value
                            ) {
                                setProgress(progress + 1)
                            } else if (
                                answers[quesIndex] !== null &&
                                !event.target.value
                            ) {
                                setProgress(progress > 0 ? progress - 1 : 0)
                            }
                        }}
                    />
                    {results[quesIndex] === 0 && (
                        <div>
                            <div className="quizQues_label my-4">
                                {t('correctans')}
                            </div>
                            <div className="quizQues_answer correct">
                                <div
                                    className="learnCorrectAnswer"
                                    dangerouslySetInnerHTML={{
                                        __html: correctAnswer || '...',
                                    }}
                                ></div>
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
                    )}
                </div>
            )}
            {/* multiple */}
            {ques.question_type === 2 && (
                <div className="card-body">
                    {/* question */}
                    {ques.question.content.map((itemContent, index) => {
                        if (
                            multiplePromptWith?.includes(itemContent.field.id)
                        ) {
                            return (
                                <div key={index} className="mb-2">
                                    <div className="quizQues_label quizQues_label--sm mb-1">
                                        {itemContent.field.name}
                                    </div>
                                    {itemContent.field.id === 12 ? (
                                        <div className="quizQues_question">
                                            <img
                                                src={itemContent.content || ''}
                                                className="quizQues_img"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="quizQues_question"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    itemContent.content ||
                                                    '...',
                                            }}
                                        ></div>
                                    )}
                                </div>
                            )
                        }
                    })}
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
                            <div key={ansIndex} className="col-12 mb-3">
                                <div
                                    className={`quizQues_answer ${
                                        answers[quesIndex] === ans.card.id &&
                                        results[quesIndex] === 0
                                            ? 'incorrect'
                                            : answers[quesIndex] ===
                                                  ans.card.id &&
                                              results[quesIndex] === 1
                                            ? 'correct'
                                            : answers[quesIndex] === ans.card.id
                                            ? 'active'
                                            : ''
                                    }`}
                                    disabled={results[quesIndex] !== null}
                                    onClick={() => {
                                        if (
                                            answers[quesIndex] === ans.card.id
                                        ) {
                                            handleChangeAnswer(null, quesIndex)
                                            setProgress(
                                                progress > 0 ? progress - 1 : 0
                                            )
                                        } else if (
                                            answers[quesIndex] === null
                                        ) {
                                            handleChangeAnswer(
                                                ans.card.id,
                                                quesIndex
                                            )
                                            setProgress(progress + 1)
                                        } else {
                                            handleChangeAnswer(
                                                ans.card.id,
                                                quesIndex
                                            )
                                        }
                                    }}
                                >
                                    {ans.content.map((itemContent, index) => {
                                        if (
                                            multipleAnswerWith?.includes(
                                                itemContent.field.id
                                            )
                                        ) {
                                            return (
                                                <div
                                                    key={index}
                                                    className="mb-2"
                                                >
                                                    <div className="quizAns_label mb-1">
                                                        {itemContent.field.name}
                                                    </div>
                                                    {itemContent.field.id ===
                                                    12 ? (
                                                        <div className="quizQues_question">
                                                            <img
                                                                src={
                                                                    itemContent.content ||
                                                                    ''
                                                                }
                                                                className="quizQues_img"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="quizQues_question"
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    itemContent.content ||
                                                                    '...',
                                                            }}
                                                        ></div>
                                                    )}
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    {results[quesIndex] === 0 && (
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
                <div className="card-body">
                    {/* questions */}
                    <div className="row mb-4">
                        <div className="col-6">
                            <div className="quizQues_question--left h-100">
                                {ques.question.content.map(
                                    (itemContent, index) => {
                                        if (
                                            trueFalsePromptWith?.includes(
                                                itemContent.field.id
                                            )
                                        ) {
                                            return (
                                                <div
                                                    key={index}
                                                    className="mb-2"
                                                >
                                                    <div className="quizQues_label quizQues_label--sm mb-1">
                                                        {itemContent.field.name}
                                                    </div>
                                                    {itemContent.field.id ===
                                                    12 ? (
                                                        <div className="quizQues_question">
                                                            <img
                                                                src={
                                                                    itemContent.content ||
                                                                    ''
                                                                }
                                                                className="quizQues_img"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="quizQues_question"
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    itemContent.content ||
                                                                    '...',
                                                            }}
                                                        ></div>
                                                    )}
                                                </div>
                                            )
                                        }
                                    }
                                )}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="quizQues_question--right h-100">
                                {ques.answers[0].content.map(
                                    (itemContent, index) => {
                                        if (
                                            trueFalseAnswerWith?.includes(
                                                itemContent.field.id
                                            )
                                        ) {
                                            return (
                                                <div
                                                    key={index}
                                                    className="mb-2"
                                                >
                                                    <div className="quizQues_label quizQues_label--sm mb-1">
                                                        {itemContent.field.name}
                                                    </div>
                                                    {itemContent.field.id ===
                                                    12 ? (
                                                        <div className="quizQues_question">
                                                            <img
                                                                src={
                                                                    itemContent.content ||
                                                                    ''
                                                                }
                                                                className="quizQues_img"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="quizQues_question"
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    itemContent.content ||
                                                                    '...',
                                                            }}
                                                        ></div>
                                                    )}
                                                </div>
                                            )
                                        }
                                    }
                                )}
                            </div>
                        </div>
                    </div>
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
                        <div className="col-6">
                            <div
                                className={`quizQues_answer ${
                                    answers[quesIndex] === 1 &&
                                    results[quesIndex] === 0
                                        ? 'incorrect'
                                        : answers[quesIndex] === 1 &&
                                          results[quesIndex] === 1
                                        ? 'correct'
                                        : answers[quesIndex] === 1
                                        ? 'active'
                                        : ''
                                }`}
                                disabled={results[quesIndex] !== null}
                                onClick={() => {
                                    if (answers[quesIndex] === 1) {
                                        handleChangeAnswer(null, quesIndex)
                                        setProgress(
                                            progress > 0 ? progress - 1 : 0
                                        )
                                    } else if (answers[quesIndex] === 0) {
                                        handleChangeAnswer(1, quesIndex)
                                    } else {
                                        handleChangeAnswer(1, quesIndex)
                                        setProgress(progress + 1)
                                    }
                                }}
                            >
                                {t('true')}
                            </div>
                        </div>
                        <div className="col-6">
                            <div
                                className={`quizQues_answer ${
                                    answers[quesIndex] === 0 &&
                                    results[quesIndex] === 0
                                        ? 'incorrect'
                                        : answers[quesIndex] === 0 &&
                                          results[quesIndex] === 1
                                        ? 'correct'
                                        : answers[quesIndex] === 0
                                        ? 'active'
                                        : ''
                                }`}
                                disabled={results[quesIndex] !== null}
                                onClick={() => {
                                    if (answers[quesIndex] === 0) {
                                        handleChangeAnswer(null, quesIndex)
                                        setProgress(
                                            progress > 0 ? progress - 1 : 0
                                        )
                                    } else if (answers[quesIndex] === 1) {
                                        handleChangeAnswer(0, quesIndex)
                                    } else {
                                        handleChangeAnswer(0, quesIndex)
                                        setProgress(progress + 1)
                                    }
                                }}
                            >
                                {t('false')}
                            </div>
                        </div>
                    </div>
                    {results[quesIndex] === 0 && (
                        <div>
                            <div className="quizQues_label my-4">
                                {t('correctans')}
                            </div>
                            <div className="quizQues_answer correct" disabled>
                                {ques.question.content.map(
                                    (itemContent, index) => {
                                        if (
                                            trueFalseAnswerWith?.includes(
                                                itemContent.field.id
                                            )
                                        ) {
                                            return (
                                                <div
                                                    key={index}
                                                    className="mb-2"
                                                >
                                                    <div className="quizAns_label mb-1">
                                                        {itemContent.field.name}
                                                    </div>
                                                    {itemContent.field.id ===
                                                    12 ? (
                                                        <div className="quizQues_question">
                                                            <img
                                                                src={
                                                                    itemContent.content ||
                                                                    ''
                                                                }
                                                                className="quizQues_img"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="quizQues_question"
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    itemContent.content ||
                                                                    '...',
                                                            }}
                                                        ></div>
                                                    )}
                                                </div>
                                            )
                                        }
                                    }
                                )}
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
                    )}
                </div>
            )}
        </div>
    )
}
export default KanjiCard
