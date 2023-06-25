package com.capstone.project.controller;

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
    public ResponseEntity<List<Test>> getAllTest(){
        return ResponseEntity.ok(testService.getAllTest());
    }
    @GetMapping("/test/{id}")
    public ResponseEntity<Test> getTestById(@PathVariable int id){
        return ResponseEntity.ok(testService.getTestById(id));
    }

    @PostMapping("/test")
    public ResponseEntity<Test> createTest( @RequestBody Test test) throws ParseException {
        Date currentDate = new Date();
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        String formattedDate = dateFormat.format(currentDate);
        Date parsedDate = dateFormat.parse(formattedDate);
        test.setCreated_date(parsedDate);
        return ResponseEntity.ok(testService.createTest(test));
    }
    @PutMapping ("/test/{id}")
    public ResponseEntity<Test> updateTest(@PathVariable int id,@RequestBody Test test) throws ParseException {

        return ResponseEntity.ok(testService.updateTest(id,test));
    }

    @DeleteMapping("/test/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteTest(@PathVariable int id) {
        boolean deleted = testService.deleteTest(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

}
