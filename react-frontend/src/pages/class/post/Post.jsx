import DeletePost from '../../DeletePost'
import UpdatePost from '../../UpdatePost'

import img from '../../../assets/images/avatar-default.jpg'
import defaultAvatar from '../../../assets/images/default_avatar.png'
import { OptionVerIcon } from '../../../components/icons'
import './post.css'

const Post = ({ post }) => {
    return (
        <div>
            <div className="card mb-4">
                <div className="card-header bg-white d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="postAuthorImg">
                            <img
                                src={post.user.avatar}
                                className="w-100 h-100"
                                alt=""
                            />
                        </div>
                        <div className="ms-3">
                            <div className="postAuthor">
                                {post.user.username}
                            </div>
                            <div className="postCreatedDate">Create Date</div>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button
                            className="mainClass_sectionButton btn btn-light p-2 rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <OptionVerIcon />
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <button
                                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                                    type="button"
                                    // onClick={handleCopyCode}
                                >
                                    <span className="align-middle fw-medium">
                                        Edit
                                    </span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item py-2 px-3 d-flex align-items-center"
                                    type="button"
                                    // onClick={handleResetCode}
                                >
                                    {/* <ResetIcon className="me-3" size="1.3rem" /> */}
                                    <span className="align-middle fw-medium">
                                        Delete
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card-body">
                    <p className="post__content">{post.content}</p>
                </div>
                <div className="card-footer bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="postAuthorImg">
                            <img
                                src={defaultAvatar}
                                className="w-100 h-100"
                                alt=""
                            />
                        </div>
                        <input type="text" className="" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-send"
                            viewBox="0 0 16 16"
                        >
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <DeletePost />
            <UpdatePost />
        </div>
    )
}
export default Post
