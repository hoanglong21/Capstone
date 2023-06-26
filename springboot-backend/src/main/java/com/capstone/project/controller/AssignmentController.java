package com.capstone.project.controller;

import com.capstone.project.exception.ResourceNotFroundException;
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
    public ResponseEntity<?> getAllAssignment() {
        return ResponseEntity.ok(assignmentService.getAllAssignment());
    }
    @GetMapping("/assignmentsbyclassid/{id}")
    public ResponseEntity<?> getAllAssignmentByClassId(@PathVariable int id) {
        return ResponseEntity.ok(assignmentService.getAllAssignmentByClassId(id));
    }

    @GetMapping("/assignments/{id}")
    public ResponseEntity<?> getAssignmentById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(assignmentService.getAssignmentById(id));
        } catch (ResourceNotFroundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/assignments")
    public ResponseEntity<?> createAssignment(@RequestBody Assignment assignment){
        return ResponseEntity.ok(assignmentService.createAssignment(assignment));
    }

    @PutMapping ("/assignments/{id}")
    public ResponseEntity<?> updateAssignment(@PathVariable int id, @RequestBody Assignment assignment){
         try {
             return ResponseEntity.ok(assignmentService.updateAssignment(id, assignment));
         } catch (ResourceNotFroundException e){
             return ResponseEntity.badRequest().body(e.getMessage());
}
    }

    @DeleteMapping("/assignments/{id}")
    public ResponseEntity<?> deleteAssignment(@PathVariable int id) {
        try {
            return ResponseEntity.ok(assignmentService.deleteAssignment(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
