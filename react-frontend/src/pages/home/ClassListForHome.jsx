import React from 'react'
import { ClassIcon } from '../../components/icons'
import { Link } from 'react-router-dom'
import Home from '../home/Home'

function ClassListForHome() {
  return (
    <div className="container mt-4 mb-5">
        <Home />
                <div>
                    <div className="sets-list">
                            <div className="set-item mb-3">
                                <Link to={`/`}>
                                    <div className="set-body row mb-2">
                                        <div className="term-count col-1">
                                            Member
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
                                                Creator
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="set-title col-2 d-flex align-items-center">
                                            <ClassIcon className="me-2" />
                                            ClassName
                                        </div>
                                        <div className="col d-flex align-items-center">
                                            <p className="set-description m-0">
                                            Class Description
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

export default ClassListForHome