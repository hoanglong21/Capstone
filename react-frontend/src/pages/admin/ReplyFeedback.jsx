import React, { useState, useEffect } from "react";
import FormStyles from '../../assets/styles/Form.module.css'
import FeedbackService from "../../services/FeedbackService";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
function ReplyFeedback() {
  const [feedback, setFeedback] = useState([])
  const [error, setError] = useState("");
  const [id, setId] = useState([]);
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setFeedback({
        id: await FeedbackService.getFeedbackById(id).data,
        title: '',
        content: '',
    })
    };
    if (feedback.id) {
      fetchData();
    }
  }, [feedback]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var form = document.querySelector(".needs-validation");
    const titleEl = document.getElementById("title");
    const contentEl = document.getElementById("content");
      try {
        await FeedbackService.replyfeedback(feedback.id, feedback.title, feedback.content);
        form.classList.remove("was-validated");
        titleEl.classList.remove("is-invalid");
        contentEl.classList.remove("is-invalid");
        setError("");
        setSuccess(true)
      } catch (error) {
        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
      }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm">
          <HeaderAdmin />
          <div className="container">
          <h3 className="text-center">Reply Feedback</h3>
          <div className="mx-5">
             {/* error message */}
             {error && (
                    <div
                        className="error alert alert-danger"
                        role="alert"
                        dangerouslySetInnerHTML={{ __html: error }}
                    ></div>
                )}
                {/* success */}
                {success && (
                    <div className="alert alert-primary" role="alert">
                       Send successfully!
                    </div>
                )}
          <p className="mb-2 text-info fs-5">Title</p>
          <input
            type="text"
            className={`form-control ${FormStyles.formControl}`}
            id="title"
            placeholder="Title"
            value={feedback.title}
            onChange={(event) => {
              setFeedback({
                title: event.target.value,
              });
            }}
            required
          />
          <p className="ms-2 mb-2 text-info fs-5">Content</p>
          <textarea
            id="content"
            className={`form-control ${FormStyles.formControl}`}
            placeholder="Message"
            style={{ height: "6rem" }}
            value={feedback.content}
            onChange={(event) => {
              setFeedback({
                content: event.target.value,
              });
            }}
          ></textarea>
          </div>
          <div className="text-center mt-4">
          <button
            type="button"
            className="btn btn-secondary me-4"
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
    </div>
  );
}

export default ReplyFeedback;