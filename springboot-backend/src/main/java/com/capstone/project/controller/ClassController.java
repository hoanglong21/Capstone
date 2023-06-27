package com.capstone.project.controller;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Class;
import com.capstone.project.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class ClassController {

    private final ClassService classService;

@Autowired
    public ClassController(ClassService classService) {
        this.classService = classService;
    }

    @GetMapping("/class")
    public ResponseEntity<?> getAllClass() {
        return ResponseEntity.ok(classService.getAllClass());
    }

    @PostMapping("/class")
    public ResponseEntity<?> createClassroom(@RequestBody Class classroom) throws ParseException {
        return ResponseEntity.ok(classService.createClassroom(classroom));
    }



    @GetMapping("/class/{id}")
    public ResponseEntity<?> getClassroomById(@PathVariable int id) {
    try {
        return ResponseEntity.ok(classService.getClassroomById(id));
    } catch(ResourceNotFroundException e){
        return ResponseEntity.badRequest().body(e.getMessage());
    }
    }

    @PutMapping("/class/{id}")
    public ResponseEntity<?> updateClassroom(@RequestBody Class classrooms, @PathVariable int id) {
    try {
        return ResponseEntity.ok(classService.updateClassroom(classrooms, id));
    } catch (ResourceNotFroundException e){
        return ResponseEntity.badRequest().body(e.getMessage());
    }
    }

    @DeleteMapping("/class/{id}")
        public ResponseEntity<?> deleteClass(@PathVariable int id) {
        try {
            return ResponseEntity.ok(classService.deleteClass(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        }

    @DeleteMapping("/deleteclass/{id}")
    public ResponseEntity<?> deleteHardClass(@PathVariable int id) {
        try {
            return ResponseEntity.ok(classService.deleteHardClass(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
