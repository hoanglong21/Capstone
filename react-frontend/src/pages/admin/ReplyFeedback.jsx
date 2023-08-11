import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FeedbackService from "../../services/FeedbackService";

function ReplyFeedback() {
  const { userInfo } = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [id, setId] = useState([]);
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setId({
        user: {
          id: userInfo.id,
        },
      });
      setTitle({
        title: "",
      });
      setContent({
        content: "",
      });
    };
    if (userInfo.username) {
      fetchData();
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var form = document.querySelector(".needs-validation");
    const titleEl = document.getElementById("title");
    const contentEl = document.getElementById("content");
    // clear validation
    form.classList.remove("was-validated");
    titleEl.classList.remove("is-invalid");
    contentEl.classList.remove("is-invalid");
    setError("");
    form.classList.add("was-validated");
    if (!title || !content) {
      if (!title) {
        titleEl.classList.add("is-invalid");
      }
      if (!content) {
        contentEl.classList.add("is-invalid");
      }
    } else {
      try {
        await FeedbackService.replyfeedback(id, title, content);
        form.classList.remove("was-validated");
        titleEl.classList.remove("is-invalid");
        contentEl.classList.remove("is-invalid");
        setError("");
      } catch (error) {
        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
      }
    }
  };

  return (
    <div className="modal" tabindex="-1" role="dialog" id="replyModal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Reply Feedback</h5>
            <button
              type="button"
              id="closeModal"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
            <p className="mb-2 text-info fs-5">Title</p>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Title"
              value={title || ""}
              onChange={(event) => {
                setTitle({
                  title: event.target.value,
                });
              }}
              required
            />
            <p className="ms-2 mb-2 text-info fs-5">Content</p>
            <textarea
              id="content"
              className="form-control"
              placeholder="Message"
              style={{ height: "6rem" }}
              value={content || ""}
              onChange={(event) => {
                setContent({
                  content: event.target.value,
                });
              }}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReplyFeedback;
