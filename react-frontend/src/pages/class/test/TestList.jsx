import { Link } from 'react-router-dom'

import { AddIcon } from '../../../components/icons'
import DeleteTest from './DeleteTest'
import './test.css'

const TestList = () => {
    return (
        <div className="container">
            <div
                className="header"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '2.5rem',
                }}
            >
                <Link to="../create-test" className="createAssign_btn">
                    <AddIcon
                        className="createAssignIcon_btn"
                        size="1.125rem"
                        strokeWidth="2.25"
                    />
                    Create
                </Link>
            </div>
            <div className="accordion mt-3" id="accordionTests">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                        >
                            Accordion Item #2
                        </button>
                    </h2>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionAssignments"
                    >
                        <div className="accordion-body">
                            <strong>
                                This is the second item's accordion body.
                            </strong>{' '}
                            It is hidden by default, until the collapse plugin
                            adds the appropriate classes that we use to style
                            each element. These classes control the overall
                            appearance, as well as the showing and hiding via
                            CSS transitions. You can modify any of this with
                            custom CSS or overriding our default variables. It's
                            also worth noting that just about any HTML can go
                            within the <code>.accordion-body</code>, though the
                            transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            Accordion Item #3
                        </button>
                    </h2>
                    <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionAssignments"
                    >
                        <div className="accordion-body">
                            <strong>
                                This is the third item's accordion body.
                            </strong>{' '}
                            It is hidden by default, until the collapse plugin
                            adds the appropriate classes that we use to style
                            each element. These classes control the overall
                            appearance, as well as the showing and hiding via
                            CSS transitions. You can modify any of this with
                            custom CSS or overriding our default variables. It's
                            also worth noting that just about any HTML can go
                            within the <code>.accordion-body</code>, though the
                            transition does limit overflow.
                        </div>
                    </div>
                </div>
            </div>
            <DeleteTest />
        </div>
    )
}

export default TestList
