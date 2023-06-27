package com.capstone.project.controller;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Feedback;
import com.capstone.project.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping("/feedbacks")
    public ResponseEntity<?> getAllFeedbacks() {
        return ResponseEntity.ok(feedbackService.getAllFeedbacks());
    }

    @PostMapping("/feedbacks")
    public ResponseEntity<?> createFeedback(@RequestBody Feedback feedback) {
        return ResponseEntity.ok(feedbackService.createFeedback(feedback));
    }

    @GetMapping("/feedbacks/{id}")
    public ResponseEntity<?> getFeedbackById(@PathVariable("id") int id) {
        try {
            return ResponseEntity.ok(feedbackService.getFeedbackById(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/feedbacks/{id}")
    public ResponseEntity<?> updateFeedback(@PathVariable("id") int id, @RequestBody Feedback feedbackDetails) {
        try {
            return ResponseEntity.ok(feedbackService.updateFeedback(id, feedbackDetails));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/feedbacks/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable("id") int id) {
        try {
            return ResponseEntity.ok(feedbackService.deleteFeedback(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
