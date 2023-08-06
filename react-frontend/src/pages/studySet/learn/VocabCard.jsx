const VocabCard = ({
    ques,
    quesIndex,
    numQues,
    writtenPromptWith,
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
}) => {
    return (
        <div className="card learnQuestionCard">
            <div className="quizQues_number">
                {quesIndex + 1} of {numQues}
            </div>
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
                    <input
                        className={`form-control quizAns_input ${
                            isCurrentCorrect === 0
                                ? 'incorrect'
                                : isCurrentCorrect === 1
                                ? 'correct'
                                : ''
                        }`}
                        type="text"
                        placeholder="Type your answer here"
                        onChange={(event) =>
                            setCurrentAnswer(event.target.value)
                        }
                        onBlur={(event) => {
                            if (event.target.value) {
                                setProgress(progress + 1)
                            } else {
                                setProgress(progress > 0 ? progress - 1 : 0)
                            }
                        }}
                    />
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
                    <div className="quizQues_label my-4">Choose the answer</div>
                    <div className="row">
                        {ques.answers.map((ans, ansIndex) => (
                            <div key={ansIndex} className="col-12 mb-3">
                                <div
                                    className={`quizQues_answer ${
                                        currentAnswer === ans.card.id &&
                                        isCurrentCorrect === 0
                                            ? 'incorrect'
                                            : currentAnswer === ans.card.id &&
                                              isCurrentCorrect === 1
                                            ? 'correct'
                                            : currentAnswer === ans.card.id
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
                    <div className="quizQues_label my-4">Choose the answer</div>
                    <div className="row">
                        <div className="col-6">
                            <div
                                className={`quizQues_answer ${
                                    currentAnswer === 1 &&
                                    isCurrentCorrect === 0
                                        ? 'incorrect'
                                        : currentAnswer === 1 &&
                                          isCurrentCorrect === 1
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
                                    isCurrentCorrect === 0
                                        ? 'incorrect'
                                        : currentAnswer === 0 &&
                                          isCurrentCorrect === 1
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
export default VocabCard
