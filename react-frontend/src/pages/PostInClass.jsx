import React from "react";

function PostInClass() {
  return (
    <div>
      <div className="post">
        <div className="post__container">
          <div className="post__top">
            <img src={"../assets/images/avatar-default.jpg"} alt="" />
          </div>
          <div className="post__nameAndDate">
            <div className="post__name">Creator</div>
            <div className="post__date">Create Date</div>
          </div>
          <div className="post__button dropdown d-inline-flex">
          <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                <span className="align-middle fw-semibold">Delete this post</span>
              </button>
            </li>
          </ul>
          </div>
        </div>
        <div className="post__container">
          <p className="post__content">Content</p>
        </div>
        <img className="post__img" src={"/"} alt={""} />
      </div>
    </div>
  );
}

export default PostInClass;
