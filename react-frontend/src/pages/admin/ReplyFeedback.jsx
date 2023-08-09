import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FeedbackTypeService from "../../../services/FeedbackTypeService";

function ReplyFeedback() {
  const { userInfo } = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [types, setTypes] = useState([]);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setFeedback({
        user: {
          id: userInfo.id,
        },
        title: "",
        destination: "system",
        content: "",
      });
    };
    if (userInfo.username) {
      fetchData();
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            <p className="mb-2 text-info fs-5">Title</p>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Title"
              required
            />
            <p className="ms-2 mb-2 text-info fs-5">Content</p>
            <textarea
              id="content"
              className="form-control"
              placeholder="Message"
              style={{ height: "6rem" }}
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
