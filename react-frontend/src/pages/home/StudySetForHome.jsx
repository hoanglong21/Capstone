import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../home/Home'

function StudySetForHome() {
  return (
    <div className="container mt-4 mb-5">
        <Home/>
                <div>
                    <div className="sets-list">
                            <div className="set-item mb-3">
                                <Link to={`/`}>
                                    <div className="set-body row mb-2">
                                        <div className="term-count col-1">
                                            Terms
                                        </div>
                                        <div
                                            className="set-author col d-flex "
                                            href="#"
                                        >
                                            <div className="author-avatar">
                                                <img
                                                    src={'/'}
                                                    alt="author avatar"
                                                    className="w-100 h-100"
                                                />
                                            </div>
                                            <span className="author-username ms-2">
                                                Username
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex align-items-center">
                                            <p className="set-description m-0">
                                                Description
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                    </div>
                </div>
        </div>
  )
}

export default StudySetForHome