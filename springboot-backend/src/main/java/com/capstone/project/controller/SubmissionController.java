package com.capstone.project.controller;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Class;
import com.capstone.project.model.Submission;
import com.capstone.project.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class SubmissionController {

    private final SubmissionService submissionService;
@Autowired
    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @GetMapping("/submissions")
    public ResponseEntity<?> getAllSubmission() {
        return ResponseEntity.ok(submissionService.getAllSubmission());
    }

    @GetMapping("/submissionsbyassignmentid/{id}")
    public ResponseEntity<?> getAllSubmissionByAssignmentId(@PathVariable int id) {
        return ResponseEntity.ok(submissionService.getAllSubmissionByAssignmentId(id));
    }

    @PostMapping("/submissions")
    public ResponseEntity<?> createSubmission(@RequestBody Submission submission) throws ParseException {
        return ResponseEntity.ok(submissionService.createSubmission(submission));
    }



    @GetMapping("/submissions/{id}")
    public ResponseEntity<?> getSubmissionById(@PathVariable int id) {
    try {
        return ResponseEntity.ok(submissionService.getSubmissionById(id));
    } catch (ResourceNotFroundException e){
        return ResponseEntity.badRequest().body(e.getMessage());
    }
    }

    @PutMapping("/submissions/{id}")
    public ResponseEntity<?> updateSubmission(@RequestBody Submission submission, @PathVariable int id) {
    try {
        return ResponseEntity.ok(submissionService.updateSubmission(id, submission));
    } catch (ResourceNotFroundException e){
        return ResponseEntity.badRequest().body(e.getMessage());
    }
    }

    @DeleteMapping("/submissions/{id}")
    public ResponseEntity<?> deleteSubmission(@PathVariable int id) {
        try {
            return ResponseEntity.ok(submissionService.deleteSubmission(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
