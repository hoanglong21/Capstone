package com.capstone.project.controller;

import com.capstone.project.dto.TestRequest;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Test;
import com.capstone.project.service.TestService;
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
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class TestController {

    @Autowired
    private ModelMapper modelMapper;

    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @GetMapping("/test")
    public ResponseEntity<?> getAllTest(){
        return ResponseEntity.ok(testService.getAllTest());
    }
    @GetMapping("/test/{id}")
    public ResponseEntity<?> getTestById(@PathVariable int id){
        try {
            return ResponseEntity.ok(testService.getTestById(id));
        } catch (ResourceNotFroundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/test")
    public ResponseEntity<?> createTest(@Valid @RequestBody TestRequest testRequest, BindingResult result) {
        if (result.hasErrors()) {
            // create a list of error messages from the binding result
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        } else {
                Test test = modelMapper.map(testRequest,Test.class);
            try{
                return ResponseEntity.ok(testService.createTest(test));
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }

    }
    @PutMapping ("/test/{id}")
    public ResponseEntity<?> updateTest(@PathVariable int id,@Valid @RequestBody TestRequest testRequest, BindingResult result){
        if (result.hasErrors()) {
            // create a list of error messages from the binding result
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        } else {
            Test test = modelMapper.map(testRequest,Test.class);
            try {
                return ResponseEntity.ok(testService.updateTest(id, test));
            } catch (ResourceNotFroundException e){
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }

    }

    @DeleteMapping("/test/{id}")
    public ResponseEntity<?> deleteTest(@PathVariable int id) {
        try {
            return ResponseEntity.ok(testService.deleteTest(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
