package com.capstone.project.controller;

import com.capstone.project.model.Assignment;
import com.capstone.project.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class AssignmentController {

    private final AssignmentService assignmentService;

    @Autowired
    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @GetMapping("/assignments")
    public List<Assignment> getAllAssignment() {
        return assignmentService.getAllAssignment();
    }

    @PostMapping("/assignments")
    public Assignment createAssignment(@RequestBody Assignment assignment) throws ParseException {
        Date currentDate = new Date();
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        String formattedDate = dateFormat.format(currentDate);
        Date parsedDate = dateFormat.parse(formattedDate);
        assignment.setCreated_date(parsedDate);
        assignment.setStart_date(parsedDate);
        return assignmentService.createAssignment(assignment);
    }

    @PutMapping ("/assignments/{id}")
    public Assignment updateTest(@PathVariable int id, @RequestBody Assignment assignment) throws ParseException {

        return assignmentService.updateAssignment(id,assignment);
    }

    @DeleteMapping("/assignments/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteAssignment(@PathVariable int id) {
        boolean deleted = assignmentService.deleteAssignment(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

}
