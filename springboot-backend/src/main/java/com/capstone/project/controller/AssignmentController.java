package com.capstone.project.controller;

import com.capstone.project.model.Assignment;
import com.capstone.project.model.Card;
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
@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class AssignmentController {

    private final AssignmentService assignmentService;

    @Autowired
    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }


    @GetMapping("/assignments")
    public ResponseEntity<List<Assignment>> getAllAssignment() {
        return ResponseEntity.ok(assignmentService.getAllAssignment());
    }
    @GetMapping("/assignmentsbyclassid/{id}")
    public ResponseEntity<List<Assignment>> getAllAssignmentByClassId(@PathVariable int id) {
        return ResponseEntity.ok(assignmentService.getAllAssignmentByClassId(id));
    }

    @GetMapping("/assignments/{id}")
    public ResponseEntity<Assignment> getAssignmentById(@PathVariable int id) {
        return ResponseEntity.ok(assignmentService.getAssignmentById(id));
    }

    @PostMapping("/assignments")
    public ResponseEntity<Assignment> createAssignment(@RequestBody Assignment assignment) throws ParseException {
        Date currentDate = new Date();
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        String formattedDate = dateFormat.format(currentDate);
        Date parsedDate = dateFormat.parse(formattedDate);
        assignment.setCreated_date(parsedDate);
        assignment.setStart_date(parsedDate);
        return ResponseEntity.ok(assignmentService.createAssignment(assignment));
    }

    @PutMapping ("/assignments/{id}")
    public ResponseEntity<Assignment> updateAssignment(@PathVariable int id, @RequestBody Assignment assignment) throws ParseException {

        return ResponseEntity.ok(assignmentService.updateAssignment(id,assignment));
    }

    @DeleteMapping("/assignments/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteAssignment(@PathVariable int id) {
        boolean deleted = assignmentService.deleteAssignment(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

}
