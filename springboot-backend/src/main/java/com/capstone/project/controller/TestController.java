package com.capstone.project.controller;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Test;
import com.capstone.project.service.TestService;
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
public class TestController {

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
    public ResponseEntity<?> createTest( @RequestBody Test test) {
        return ResponseEntity.ok(testService.createTest(test));
    }
    @PutMapping ("/test/{id}")
    public ResponseEntity<?> updateTest(@PathVariable int id,@RequestBody Test test) throws ParseException {
         try {
             return ResponseEntity.ok(testService.updateTest(id, test));
         } catch (ResourceNotFroundException e){
             return ResponseEntity.badRequest().body(e.getMessage());
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
