import { useEffect, useState } from 'react'

const KanjiCard = ({
    ques,
    quesIndex,
    writtenPromptWith,
    writtenAnswerWith,
    multiplePromptWith,
    multipleAnswerWith,
    trueFalsePromptWith,
    trueFalseAnswerWith,
    setProgress,
    progress,
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

    useEffect(() => {
        if (ques?.question_type) {
            setExample(ques.question.content[9].content)
        }
    }, [ques])

    const handleAnswerWritten = (event) => {
        if (ques.question_type === 1) {
            document.getElementById(`quizQuesInput${quesIndex}`).blur()
            event.preventDefault()
            // get correct answer
            var correctAnswer = ''
            for (const itemContent of ques.question.content) {
                if (itemContent.field.id === writtenAnswerWith) {
                    const tempContent = itemContent.content
                        .replaceAll(/(<([^>]+)>)/gi, ' ')
                        .trim()
                    correctAnswer = tempContent
                    setCorrectAnswer(itemContent.content)
                    break
                }
            }
            // check is correct
            if (currentAnswer == correctAnswer) {
                setIsCurrentCorrect(true)
            } else {
                setIsCurrentCorrect(false)
            }
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
                            if (
                                writtenPromptWith?.includes(
                                    itemContent.field.id
                                )
                            ) {
                                return (
                                    <div key={index} className="mb-2">
                                        <div className="quizQues_label quizQues_label--sm mb-1">
                                            {itemContent.field.name}
                                        </div>
                                        {itemContent.field.id === 12 ? (
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
                    <div className="quizQues_label my-4">Your answer</div>
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
                            Answer
                        </button>
                    </form>
                    {isCurrentCorrect === false && (
                        <div>
                            <div className="quizQues_label my-4">
                                Correct answer
                            </div>
                            <div className="quizQues_answer correct">
                                <div
                                    className="learnCorrectAnswer"
                                    dangerouslySetInnerHTML={{
                                        __html: correctAnswer,
                                    }}
                                ></div>
                                <div className="learnExampleSection">
                                    <div className="learnExample_label">
                                        Example
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
                    <div className="quizQues_label my-4">Choose the answer</div>
                    <div className="row">
                        {ques.answers.map((ans, ansIndex) => (
                            <div key={ansIndex} className="col-12 mb-3">
                                <div
                                    className={`quizQues_answer ${
                                        currentAnswer === ans.card.id &&
                                        isCurrentCorrect === false
                                            ? 'incorrect'
                                            : currentAnswer === ans.card.id &&
                                              isCurrentCorrect === true
                                            ? 'correct'
                                            : isCurrentCorrect === ans.card.id
                                            ? 'active'
                                            : ''
                                    }`}
                                    onClick={() => {
                                        if (currentAnswer === ans.card.id) {
                                            setCurrentAnswer(null)
                                            setProgress(
                                                progress > 0 ? progress - 1 : 0
                                            )
                                        } else {
                                            setCurrentAnswer(ans.card.id)
                                            setProgress(progress + 1)
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
                                                            {
                                                                itemContent
                                                                    .field.name
                                                            }
                                                        </div>
                                                        {itemContent.field
                                                            .id === 12 ? (
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
                                                        <div className="quizQues_label quizQues_label--sm mb-1">
                                                            {
                                                                itemContent
                                                                    .field.name
                                                            }
                                                        </div>
                                                        {itemContent.field
                                                            .id === 12 ? (
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
                    <div className="quizQues_label my-4">Choose the answer</div>
                    <div className="row">
                        <div className="col-6">
                            <div
                                className={`quizQues_answer ${
                                    currentAnswer === 1 &&
                                    isCurrentCorrect === false
                                        ? 'incorrect'
                                        : currentAnswer === 1 &&
                                          isCurrentCorrect === true
                                        ? 'correct'
                                        : currentAnswer === 1
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() => {
                                    if (currentAnswer === 1) {
                                        setCurrentAnswer(null)
                                        setProgress(
                                            progress > 0 ? progress - 1 : 0
                                        )
                                    } else {
                                        setCurrentAnswer(1)
                                        setProgress(progress + 1)
                                    }
                                }}
                            >
                                True
                            </div>
                        </div>
                        <div className="col-6">
                            <div
                                className={`quizQues_answer ${
                                    currentAnswer === 0 &&
                                    isCurrentCorrect === false
                                        ? 'incorrect'
                                        : currentAnswer === 0 &&
                                          isCurrentCorrect === true
                                        ? 'correct'
                                        : currentAnswer === 0
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() => {
                                    if (currentAnswer === 0) {
                                        setCurrentAnswer(null)
                                        setProgress(
                                            progress > 0 ? progress - 1 : 0
                                        )
                                    } else {
                                        setCurrentAnswer(0)
                                        setProgress(progress + 1)
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
    )
}
export default KanjiCard
