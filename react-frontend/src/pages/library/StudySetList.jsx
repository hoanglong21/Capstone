import avatar from '../../assets/images/avatar-default.jpg'
import { SearchIcon } from '../../components/icons'
import './StudySetList.css'

const StudySetList = () => {
    return (
        <div className="container mt-4 mb-5">
            <div className="sets-search mb-4 d-flex align-items-center">
                <input
                    className="search-control flex-grow-1"
                    placeholder="Search your sets"
                    type="text"
                    value=""
                ></input>
                <SearchIcon />
            </div>
            <div className="sets-list">
                <div className="set-item mb-3">
                    <div className="set-body d-flex mb-2">
                        <div className="term-count me-4">100 terms</div>
                        <a className="set-author d-flex">
                            <div className="author-avatar">
                                <img
                                    src={avatar}
                                    alt="author avatar"
                                    className="w-100"
                                />
                            </div>
                            <span className="author-username ms-2">tuyet</span>
                        </a>
                    </div>
                    <div className="set-title">MLN</div>
                </div>
                <div className="set-item">
                    <div className="set-body d-flex mb-2">
                        <div className="term-count me-4">100 terms</div>
                        <a className="set-author d-flex">
                            <div className="author-avatar">
                                <img
                                    src={avatar}
                                    alt="author avatar"
                                    className="w-100"
                                />
                            </div>
                            <span className="author-username ms-2">tuyet</span>
                        </a>
                    </div>
                    <div className="set-title">MLN</div>
                </div>
            </div>
        </div>
    )
}
export default StudySetList
