import {
    StudySetSolidIcon,
    ArrowDownIcon,
    CloseIcon,
    LearnSolidIcon,
    TestSolidIcon,
} from '../../../components/icons'
import FormStyles from '../../../assets/styles/Form.module.css'
import './quiz.css'

function DoQuiz() {
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
                    <button className="flashcardClose_btn ms-3 d-flex align-items-center">
                        <CloseIcon strokeWidth="2" />
                    </button>
                </div>
            </div>
            {/* IF QUIZ: TRUE/FALSE */}
            <div
                style={{
                    margin: '0 auto',
                    maxWidth: '57rem',
                    padding: '0 2rem',
                }}
            >
                <article
                    id="trueFalse-0"
                    tabindex="-1"
                    class="w1gd4v28 svwhkoh"
                >
                    <div class="p1tur8tp">
                        <div class="pr2w5fu">
                            <div class="s1i3ipc2 a1bncmms">
                                <div class="wlbcmo g8d16b6">
                                    <div class="wlbcmo hn7llme">
                                        <div class="wlbcmo l3h11jy">
                                            <section class="lwajxlv">
                                                Term
                                            </section>
                                        </div>
                                        <div class="wlbcmo c8ck6sr"></div>
                                        <div class="wlbcmo rpq3rlv">
                                            <div class="r1i8yi5w"></div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="t4j019x"
                                    data-testid="Question Text"
                                >
                                    <div class="t1gujtze c1sj1twu">
                                        <div
                                            aria-label="112) Theo C. Mác: vấn đề tìm hiểu xem tư duy của con người có thể đạt được chân lý khách quan hay không hoàn toàn không phải là vấn đề lý luận mà là vấn đề...
a) Thực tế
b) Hiện thực
c) Thực tiễn
d) Khoa học"
                                            class="FormattedText notranslate FormattedTextWithImage-wrapper lang-vi"
                                            style={{ fontSize: '22px' }}
                                        >
                                            <div style={{ display: 'block' }}>
                                                112) Theo C. Mác: vấn đề tìm
                                                hiểu xem tư duy của con người có
                                                thể đạt được chân lý khách quan
                                                hay không hoàn toàn không phải
                                                là vấn đề lý luận mà là vấn
                                                đề...
                                                <br />
                                                a) Thực tế
                                                <br />
                                                b) Hiện thực
                                                <br />
                                                c) Thực tiễn
                                                <br />
                                                d) Khoa học
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pr2w5fu">
                            <div class="s1i3ipc2 a1bncmms">
                                <div class="wlbcmo g8d16b6">
                                    <div class="wlbcmo hn7llme">
                                        <div class="wlbcmo l3h11jy">
                                            <section class="lwajxlv">
                                                Definition
                                            </section>
                                        </div>
                                        <div class="wlbcmo c8ck6sr"></div>
                                        <div class="wlbcmo rpq3rlv">
                                            <div class="r1i8yi5w"></div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="t4j019x"
                                    data-testid="Question Text"
                                >
                                    <div class="t1gujtze c1sj1twu">
                                        <div
                                            aria-label="c"
                                            class="FormattedText notranslate FormattedTextWithImage-wrapper lang-vi"
                                            style={{ fontSize: '22px' }}
                                        >
                                            <div style={{ display: 'block' }}>
                                                c
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="a548wz9">Choose the answer</div>
                    <div class="albjleu">
                        <section class="w1uwrq7e" tabindex="0">
                            <div></div>True
                        </section>
                        <section class="swjz05g w1uwrq7e" tabindex="0">
                            <div></div>False
                        </section>
                    </div>
                    <div class="t1b9wj7u">
                        <div class="c86ukn8">1 of 20</div>
                    </div>
                </article>
            </div>
            {/* IF QUIZ: MULTIPLE CHOICE */}
            <div class="qq5bf7c">
                <div id="mcq-0" tabindex="-1" class="q1sjw0yf">
                    <article aria-live="polite" class="src0sz3 svwhkoh">
                        <div class="a1bncmms">
                            <div class="wlbcmo g8d16b6">
                                <div class="wlbcmo hn7llme">
                                    <div class="wlbcmo l3h11jy">
                                        <section class="lwajxlv">Term</section>
                                    </div>
                                    <div class="wlbcmo c8ck6sr"></div>
                                    <div class="wlbcmo rpq3rlv">
                                        <div class="r1i8yi5w"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="t4j019x" data-testid="Question Text">
                                <div class="t1gujtze c1sj1twu">
                                    <div
                                        aria-label="QN=129 Nguyên nhân sâu xa của việc ra đời của giai cấp thuộc"
                                        class="FormattedText notranslate FormattedTextWithImage-wrapper lang-vi"
                                        style={{ fontSize: '20px' }}
                                    >
                                        <div style={{ display: 'block' }}>
                                            QN=129 Nguyên nhân sâu xa của việc
                                            ra đời của giai cấp thuộc
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="a12odeb9">
                            <section
                                aria-label="Select the correct definition"
                                class="l16m64a6"
                            >
                                <div
                                    aria-hidden="true"
                                    class="m1crz3gf"
                                    data-testid="multiple-choice-answer-label"
                                >
                                    Select the correct definition
                                </div>
                            </section>
                            <div class="axo6qs8" data-testid="MCQ Answers">
                                <section class="w1uwrq7e" tabindex="0">
                                    <div></div>
                                    <div
                                        aria-selected="false"
                                        class="t1d08860"
                                        data-testid="option-1"
                                    >
                                        <div class="c1sj1twu">
                                            <div
                                                aria-label="Lĩnh vực kinh tế"
                                                class="FormattedText notranslate FormattedTextWithImage-wrapper lang-vi"
                                            >
                                                Lĩnh vực kinh tế
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section class="w1uwrq7e" tabindex="0">
                                    <div></div>
                                    <div
                                        aria-selected="false"
                                        class="t1d08860"
                                        data-testid="option-2"
                                    >
                                        <div class="c1sj1twu">
                                            <div
                                                aria-label="Lĩnh vực văn hóa"
                                                class="FormattedText notranslate FormattedTextWithImage-wrapper lang-vi"
                                            >
                                                Lĩnh vực văn hóa
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section class="w1uwrq7e" tabindex="0">
                                    <div></div>
                                    <div
                                        aria-selected="false"
                                        class="t1d08860"
                                        data-testid="option-3"
                                    >
                                        <div class="c1sj1twu">
                                            <div
                                                aria-label="Lĩnh vực xã hội"
                                                class="FormattedText notranslate FormattedTextWithImage-wrapper lang-vi"
                                            >
                                                Lĩnh vực xã hội
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div class="t1b9wj7u">
                            <div class="c86ukn8">1 of 20</div>
                        </div>
                    </article>
                </div>
            </div>
            {/* IF QUIZ: WRITTEN */}
            <div class="q1sv7y1h">
                <div id="written-9" tabindex="-1" class="q1t9fgzq">
                    <article class="ssy64mv svwhkoh">
                        <div class="qjwdgny">
                            <div class="a1bncmms">
                                <div class="wlbcmo g8d16b6">
                                    <div class="wlbcmo hn7llme">
                                        <div class="wlbcmo l3h11jy">
                                            <section class="lwajxlv">
                                                Term
                                            </section>
                                        </div>
                                        <div class="wlbcmo c8ck6sr"></div>
                                        <div class="wlbcmo rpq3rlv">
                                            <div class="r1i8yi5w"></div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="t4j019x"
                                    data-testid="Question Text"
                                >
                                    <div class="t1gujtze c1sj1twu">
                                        <div
                                            aria-label="18) Chọn câu trả lời đúng theo quan điểm duy vật lịch sử:
Nhân tố quyết định trong lực lượng sản xuât là nhân tố:
a) Tư liệu sản xuất
b) Người lao động
c) Công cụ lao động
d) Tri thức"
                                            class="FormattedText notranslate FormattedTextWithImage-wrapper lang-vi"
                                            style={{ fontSize: '20px' }}
                                        >
                                            <div style={{ display: 'block' }}>
                                                18) Chọn câu trả lời đúng theo
                                                quan điểm duy vật lịch sử:
                                                <br />
                                                Nhân tố quyết định trong lực
                                                lượng sản xuât là nhân tố:
                                                <br />
                                                a) Tư liệu sản xuất
                                                <br />
                                                b) Người lao động
                                                <br />
                                                c) Công cụ lao động
                                                <br />
                                                d) Tri thức
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="a13cru74">
                            <div class="l1e3267a">
                                <section class="lv6856r">Your answer</section>
                            </div>
                            <form name="form" class="fnkfiqj">
                                <div>
                                    <div class="collapsed ckizkc3"></div>
                                    <label class="AssemblyInput">
                                        <input
                                            autocomplete="off"
                                            spellcheck="false"
                                            aria-label="Type the answer"
                                            class="AssemblyInput-input AssemblyInput-placeholder"
                                            placeholder="Type the answer"
                                            type="text"
                                        />
                                    </label>
                                </div>
                                <div class="a1qes7yk">
                                    <button
                                        type="submit"
                                        aria-label="Next"
                                        class="AssemblyButtonBase AssemblyPrimaryButton--default AssemblyButtonBase--medium AssemblyButtonBase--padding"
                                    >
                                        <span>Next</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="t1b9wj7u">
                            <div class="c86ukn8">10 of 20</div>
                        </div>
                    </article>
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
                class="modal fade quizOptionModal"
                id="quizOptionModal"
                tabindex="-1"
                aria-labelledby="quizOptionModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="quizOptionModalLabel">
                                Options
                            </h3>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            <button className="quizOption_newBtn btn btn-primary">
                                Create new quiz
                            </button>
                            <div className="row mt-4">
                                <div className="col-6">
                                    <div className="quizOptionBlock mb-4">
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
                                                for="written"
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
                                                for="mupltipleChoice"
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
                                                for="trueFalse"
                                            >
                                                True/False
                                            </label>
                                        </div>
                                    </div>
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
                                                for="note"
                                            >
                                                Show note
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="quizOptionBlock mb-4">
                                        <legend>PROMPT WITH</legend>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                value=""
                                                id="note"
                                            />
                                            <label
                                                className="form-check-label"
                                                for="note"
                                            >
                                                Show note
                                            </label>
                                        </div>
                                    </div>
                                    <div className="quizOptionBlock">
                                        <legend>ANSWER WITH</legend>
                                        <div className="mb-2">
                                            <input
                                                className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                                                type="checkbox"
                                                value=""
                                                id="note"
                                            />
                                            <label
                                                className="form-check-label"
                                                for="note"
                                            >
                                                Show note
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoQuiz
