import React, { useState, useEffect } from "react";
import FormStyles from "../../assets/styles/Form.module.css";
import FeedbackService from "../../services/FeedbackService";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Link, useParams } from "react-router-dom";

function ReplyFeedback() {
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState("");
  const [feedbackR, setFeedbackR] = useState([]);
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const temp = (await FeedbackService.getFeedbackById(id)).data;
      setFeedback(temp);
    };
    const fetchDataR = async () => {
      setFeedbackR({
        id: feedback.id,
        title: "",
        content: "",
      });
    };
    if (id) {
      fetchData();
      fetchDataR();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await FeedbackService.replyfeedback(
        feedback.id,
        feedbackR.title,
        feedbackR.content
      );
      setError("");
      setSuccess(true);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError(error.message);
      }
    }
    setLoading(false);
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
                <div className="alert alert-success" role="alert">
                  Send reply successfully!
                </div>
              )}
              <input
                type="text"
                className={`form-control ${FormStyles.formControl}`}
                id="id"
                value={feedback.id}
                hidden
              />
              <p className="mb-2 text-info fs-5">Title</p>
              <input
                type="text"
                className={`form-control ${FormStyles.formControl}`}
                id="title"
                placeholder="Title"
                value={feedbackR.title}
                onChange={(event) => {
                  setFeedbackR({
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
                value={feedbackR.content}
                onChange={(event) => {
                  setFeedbackR({
                    content: event.target.value,
                  });
                }}
              ></textarea>
            </div>
            <div className="text-center mt-4">
              <Link
                type="button"
                className="btn btn-secondary me-4"
                to={`/viewdetailfb/${feedback.id}`}
              >
                Back
              </Link>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <div
                    className="spinner-border text-secondary mx-auto mb-1"
                    role="status"
                    id="loading"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReplyFeedback;
