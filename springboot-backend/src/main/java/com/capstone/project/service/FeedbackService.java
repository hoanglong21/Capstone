package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Feedback;

import java.util.List;

public interface FeedbackService {

    List<Feedback> getAllFeedbacks();

    Feedback createFeedback(Feedback feedback);

    Feedback getFeedbackById(int id) throws ResourceNotFroundException;

    Feedback updateFeedback(int id, Feedback feedbackDetails) throws ResourceNotFroundException;

    Boolean deleteFeedback(int id) throws ResourceNotFroundException;
}
