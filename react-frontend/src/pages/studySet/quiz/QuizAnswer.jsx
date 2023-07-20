import {
    StudySetSolidIcon,
    ArrowDownIcon,
    CloseIcon,
    LearnSolidIcon,
    TestSolidIcon,
} from '../../../components/icons'
import './quiz.css'

function QuizAnswer() {
    return (
        <div>
            {/* Header */}
            <div className="flashcardHeader d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <StudySetSolidIcon
                        className="flashcardModeIcon"
                        size="2rem"
                    />
                    <div className="flashcardMode dropdown d-flex align-items-center">
                        <button
                            type="button dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="ps-2 me-2">Flashcards</span>
                            <ArrowDownIcon size="1rem" strokeWidth="2.6" />
                        </button>
                        <ul className="dropdown-menu">
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
                                <button
                                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                                    type="button"
                                >
                                    <TestSolidIcon
                                        className="me-3 flashcardModeIcon"
                                        size="1.3rem"
                                    />
                                    <span className="align-middle fw-semibold">
                                        Test
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
                    <h3>1/20 ~ 5%</h3>
                    <h3>MLN111</h3>
                </div>
                <div className="flashcardOptions d-flex">
                    <button className="flashcardOptions_btn">Options</button>
                    <button className="flashcardClose_btn ms-3 d-flex align-items-center">
                        <CloseIcon strokeWidth="2" />
                    </button>
                </div>
            </div>
            <div aria-label="question" role="listitem" class="qq5bf7c">
                <div id="mcq-0" tabindex="-1" class="q1sjw0yf">
                    <h4 class="sjl6b1d">Your answers</h4>
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
                                        aria-label="77) Chọn câu trả lời đúng nhất theo quan điểm của chủ nghĩa duy vật lịch sử
Nhà nước là yếu tố cơ bản trong kiến trúc thượng tầng của xã hội, nó:"
                                        class="FormattedText notranslate FormattedTextWithImage-wrapper lang-vi"
                                        style={{ fontSize: '22px' }}
                                    >
                                        <div style={{ display: 'block' }}>
                                            77) Chọn câu trả lời đúng nhất theo
                                            quan điểm của chủ nghĩa duy vật lịch
                                            sử
                                            <br />
                                            Nhà nước là yếu tố cơ bản trong kiến
                                            trúc thượng tầng của xã hội, nó:
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="a12odeb9">
                            <div class="axo6qs8" data-testid="MCQ Answers">
                                <section class="i1p8x1gp w1uwrq7e" tabindex="0">
                                    <div>
                                        <div class="i1e9rt5"></div>
                                    </div>
                                    <div
                                        aria-selected="false"
                                        class="t1d08860"
                                        data-testid="option-1"
                                    >
                                        <div class="c1sj1twu">
                                            <div
                                                aria-label="Luôn luôn có tác động tích cực đối với cơ sở hạ tầng"
                                                class="FormattedText notranslate FormattedTextWithImage-wrapper lang-vi"
                                            >
                                                Luôn luôn có tác động tích cực
                                                đối với cơ sở hạ tầng
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section class="d9x7we0 w1uwrq7e" tabindex="0">
                                    <div></div>
                                    <div
                                        aria-selected="false"
                                        class="t1d08860"
                                        data-testid="option-2"
                                    >
                                        <div class="c1sj1twu">
                                            <div
                                                aria-label="Luôn luôn có tác động tiêu cực đối với cơ sở hạ tầng"
                                                class="FormattedText notranslate FormattedTextWithImage-wrapper lang-vi"
                                            >
                                                Luôn luôn có tác động tiêu cực
                                                đối với cơ sở hạ tầng
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section class="cv1rd7s w1uwrq7e" tabindex="0">
                                    <div>
                                        <div class="i1e9rt5"></div>
                                    </div>
                                    <div
                                        aria-selected="false"
                                        class="t1d08860"
                                        data-testid="option-3"
                                    >
                                        <div class="c1sj1twu">
                                            <div
                                                aria-label="Có thể tác động tích cực hoặc tiêu cực, tùy theo từng điều kiện nhất định"
                                                class="FormattedText notranslate FormattedTextWithImage-wrapper lang-vi"
                                            >
                                                Có thể tác động tích cực hoặc
                                                tiêu cực, tùy theo từng điều
                                                kiện nhất định
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section class="d9x7we0 w1uwrq7e" tabindex="0">
                                    <div></div>
                                    <div
                                        aria-selected="false"
                                        class="t1d08860"
                                        data-testid="option-4"
                                    >
                                        <div class="c1sj1twu">
                                            <div
                                                aria-label="Không có tác dụng gì tới cơ sở hạ tầng kinh tế mà chỉ có tác dụng tới các yếu tố khác trong bản thân hệ thống kiến trúc thượng tầng"
                                                class="FormattedText notranslate FormattedTextWithImage-wrapper lang-vi"
                                            >
                                                Không có tác dụng gì tới cơ sở
                                                hạ tầng kinh tế mà chỉ có tác
                                                dụng tới các yếu tố khác trong
                                                bản thân hệ thống kiến trúc
                                                thượng tầng
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
        </div>
    )
}

export default QuizAnswer
