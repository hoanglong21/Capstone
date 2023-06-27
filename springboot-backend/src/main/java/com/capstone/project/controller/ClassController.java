package com.capstone.project.controller;

import com.capstone.project.dto.ClassRequest;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Class;
import com.capstone.project.service.ClassService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class ClassController {

    @Autowired
    private ModelMapper modelMapper;
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
    public ResponseEntity<?> createClassroom(@Valid @RequestBody ClassRequest classRequest, BindingResult result) throws ParseException {
        if (result.hasErrors()) {
            // create a list of error messages from the binding result
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        } else {
            Class classroom = modelMapper.map(classRequest,Class.class);
            try{
                return ResponseEntity.ok(classService.createClassroom(classroom));
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
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
    public ResponseEntity<?> updateClassroom(@Valid @RequestBody  ClassRequest classRequest, @PathVariable int id,BindingResult result) {
        if (result.hasErrors()) {
            // create a list of error messages from the binding result
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        } else {
            Class classroom = modelMapper.map(classRequest,Class.class);
            try {
                return ResponseEntity.ok(classService.updateClassroom(classroom, id));
            } catch (ResourceNotFroundException e){
                return ResponseEntity.badRequest().body(e.getMessage());
            }
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
