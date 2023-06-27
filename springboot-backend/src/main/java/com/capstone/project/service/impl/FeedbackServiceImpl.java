package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Feedback;
import com.capstone.project.repository.FeedbackRepository;
import com.capstone.project.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    @Autowired
    public FeedbackServiceImpl(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @Override
    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    @Override
    public Feedback getFeedbackById(int id) throws ResourceNotFroundException {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Feedback not exist with id: " + id));
        return feedback;
    }

    @Override
    public Feedback updateFeedback(int id, Feedback feedbackDetails) throws ResourceNotFroundException {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Feedback not exist with id: " + id));
        feedback.setTitle(feedbackDetails.getTitle());
        feedback.setContent(feedbackDetails.getContent());

        Feedback updateFeedback = feedbackRepository.save(feedback);
        return updateFeedback;
    }

    @Override
    public Boolean deleteFeedback(int id) throws ResourceNotFroundException {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Feedback not exist with id: " + id));
        feedbackRepository.delete(feedback);
        return true;
    }
}
