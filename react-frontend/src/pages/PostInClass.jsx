import React from "react";
import img from "../assets/images/avatar-default.jpg";
import content from "../assets/images/blog_1.jpg";
import DeletePost from "./DeletePost";
import UpdatePost from "./UpdatePost";

function PostInClass() {
  return (
    <div>
      <div className="post">
        <div className="post__container">
          <div className="post__top">
            <img src={img} alt="" />
          </div>
          <div className="post__nameAndDate">
            <div className="post__name">Creator</div>
            <div className="post__date">Create Date</div>
          </div>
          <div className="post__button dropdown d-inline-flex">
            <button
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ marginLeft: "-20px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
            <ul className="dropdown-menu dropdown-menu-end p-2">
              <li>
                <button
                  className="dropdown-item py-2 px-2"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#updateModal"
                  aria-expanded="true"
                >
                  <span className="align-middle fw-semibold">
                    Update this post
                  </span>
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item py-2 px-2"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <span className="align-middle fw-semibold">
                    Delete this post
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="post__container">
          <p className="post__content">Content</p>
        </div>
        <img className="post__img" src={content} alt={""} />
      </div>
      <div className="comment">
        <div className="comment__top">
          <img src={img} alt="" />
          <input type="text" className="comment__content" />
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
      <DeletePost />
      <UpdatePost />
    </div>
  );
}
export default PostInClass;
