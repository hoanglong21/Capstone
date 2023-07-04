import React from 'react'
import { Link } from 'react-router-dom'

function AllForHome() {
  return (
    <div className="mt-4 mb-5">
            <div className="sets-list">
                    <div className="set-item mb-3">
                        <Link to={`/`}>
                            <div className="set-body row mb-2">
                                <div className="term-count col-2">
                                    Sets Tilte
                                </div>
                                <div
                                    className="set-author col d-flex "
                                    href="#"
                                >
                                    <div className="author-avatar">
                                        <img
                                            src={
                                                '/'
                                            }
                                            alt="author avatar"
                                            className="w-100 h-100"
                                        />
                                    </div>
                                    <span className="author-username ms-2">
                                        Author
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col d-flex align-items-center">
                                    <p
                                        className="set-description m-0"
                                        style={{ whiteSpace: 'pre-wrap' }}
                                    >
                                        75 thuật ngữ
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
            </div>
        </div>
  )
}

export default AllForHome