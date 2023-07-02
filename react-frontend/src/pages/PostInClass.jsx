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
        </div>
        <div className="post__container">
          <p className="post__content">Content</p>
          <img className="post__img" src={"/"} alt={""} />
        </div>
      </div>
    </div>
  );
}

export default PostInClass;
