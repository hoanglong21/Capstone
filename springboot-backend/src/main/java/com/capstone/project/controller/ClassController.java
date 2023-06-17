package com.capstone.project.controller;

import com.capstone.project.model.Class;
import com.capstone.project.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/v1/")
public class ClassController {

    private final ClassService classService;

@Autowired
    public ClassController(ClassService classService) {
        this.classService = classService;
    }

    @GetMapping("/class")
    public List<Class> getAllClass() {
        return classService.getAllClass();
    }

    @PostMapping("/class")
    public Class createClassroom(@RequestBody Class classroom) throws ParseException {
        return classService.createClassroom(classroom);
    }



    @GetMapping("/class/{id}")
    public Class getClassroomById(@PathVariable int id) {
        return classService.getClassroomById(id);
    }

    @PutMapping("/class/{id}")
    Class updateClassroom(@RequestBody Class classrooms, @PathVariable int id) {
        return classService.updateClassroom(classrooms,id);
    }

    @DeleteMapping("/class/{id}")
        public ResponseEntity<Map<String, Boolean>> deleteClass(@PathVariable int id) {
            boolean deleted = classService.deleteClass(id);
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", deleted);
            return ResponseEntity.ok(response);
        }

}
