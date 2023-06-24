package com.capstone.project.controller;

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
    public ResponseEntity<List<Submission>> getAllSubmission() {
        return ResponseEntity.ok(submissionService.getAllSubmission());
    }

    @GetMapping("/submissionsbyassignmentid/{id}")
    public ResponseEntity<List<Submission>> getAllSubmissionByAssignmentId(@PathVariable int id) {
        return ResponseEntity.ok(submissionService.getAllSubmissionByAssignmentId(id));
    }

    @PostMapping("/submissions")
    public ResponseEntity<Submission> createSubmission(@RequestBody Submission submission) throws ParseException {
        return ResponseEntity.ok(submissionService.createSubmission(submission));
    }



    @GetMapping("/submissions/{id}")
    public ResponseEntity<Submission> getSubmissionById(@PathVariable int id) {
        return ResponseEntity.ok(submissionService.getSubmissionById(id));
    }

    @PutMapping("/submissions/{id}")
    public ResponseEntity<Submission> updateSubmission(@RequestBody Submission submission, @PathVariable int id) {
        return ResponseEntity.ok(submissionService.updateSubmission(id,submission));
    }

    @DeleteMapping("/submissions/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteSubmission(@PathVariable int id) {
        boolean deleted = submissionService.deleteSubmission(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
}
