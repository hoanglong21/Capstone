import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FeedbackService from "../../services/FeedbackService";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
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
    // form.classList.remove("was-validated");
    // titleEl.classList.remove("is-invalid");
    // contentEl.classList.remove("is-invalid");
    setError("");
    //form.classList.add("was-validated");
    if (!title || !content) {
      // if (!title) {
      //   titleEl.classList.add("is-invalid");
      // }
      // if (!content) {
      //   contentEl.classList.add("is-invalid");
      // }
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
    <div className="container-fluid">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm">
          <HeaderAdmin />
          <div className="container">
          <h3 className="text-center">Reply Feedback</h3>
          <div className="mx-5">
          <p className="mb-2 text-info fs-5">Title</p>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            // value={title || ""}
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
            // value={content || ""}
            onChange={(event) => {
              setContent({
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