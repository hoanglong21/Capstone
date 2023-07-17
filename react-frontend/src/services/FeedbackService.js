import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

const createFeedback = (feedback) => {
  return axios.post(API_BASE_URL + "/feedbacks", feedback);
};

const getFeedbackById = (id) => {
  return axios.get(API_BASE_URL + "/feedbacks/" + id);
};

const FeedbackService = {
  createFeedback,
  getFeedbackById,
};

export default FeedbackService;
