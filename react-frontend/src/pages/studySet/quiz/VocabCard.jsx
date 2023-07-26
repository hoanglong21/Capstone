const VocabCard = ({
    ques,
    quesIndex,
    numQues,
    writtenPromptWith,
    multiplePromptWith,
    multipleAnswerWith,
    trueFalsePromptWith,
    trueFalseAnswerWith,
    handleChangeAnswer,
    setProgress,
    progress,
    answers,
}) => {
    return (
        <div className="card">
            <div className="quizQues_number">
                {quesIndex + 1} of {numQues}
            </div>
            {/* written */}
            {ques.question_type === 1 && (
                <div className="card-body">
                    {ques.question.content.map((itemContent, index) => {
                        if (writtenPromptWith?.includes(itemContent.field.id)) {
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
                    {ques.question.card.picture && (
                        <img
                            src={ques.question.card.picture}
                            className="quizQues_img"
                        />
                    )}
                    <div className="quizQues_label my-4">Your answer</div>
                    <input
                        className="form-control quizAns_input"
                        type="text"
                        placeholder="Type your answer here"
                        onChange={(event) =>
                            handleChangeAnswer(event.target.value, quesIndex)
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
                    <div className="quizQues_label mb-4">Choose the answer</div>
                    <div className="row">
                        {ques.answers.map((ans, ansIndex) => (
                            <div key={ansIndex} className="col-12 mb-3">
                                <div
                                    className={`quizQues_answer ${
                                        answers[quesIndex] === ans.card.id
                                            ? 'active'
                                            : ''
                                    }`}
                                    onClick={() => {
                                        if (
                                            answers[quesIndex] === ans.card.id
                                        ) {
                                            handleChangeAnswer(null, quesIndex)
                                            setProgress(
                                                progress > 0 ? progress - 1 : 0
                                            )
                                        } else {
                                            handleChangeAnswer(
                                                ans.card.id,
                                                quesIndex
                                            )
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
                <div className="card-body">
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
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="quizQues_label mb-4">Choose the answer</div>
                    <div className="row">
                        <div className="col-6">
                            <div
                                className={`quizQues_answer ${
                                    answers[quesIndex] === 1 ? 'active' : ''
                                }`}
                                onClick={() => {
                                    if (answers[quesIndex] === 1) {
                                        handleChangeAnswer(null, quesIndex)
                                        setProgress(
                                            progress > 0 ? progress - 1 : 0
                                        )
                                    } else {
                                        handleChangeAnswer(1, quesIndex)
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
                                    answers[quesIndex] === 0 ? 'active' : ''
                                }`}
                                onClick={() => {
                                    if (answers[quesIndex] === 0) {
                                        handleChangeAnswer(null, quesIndex)
                                        setProgress(
                                            progress > 0 ? progress - 1 : 0
                                        )
                                    } else {
                                        handleChangeAnswer(0, quesIndex)
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
