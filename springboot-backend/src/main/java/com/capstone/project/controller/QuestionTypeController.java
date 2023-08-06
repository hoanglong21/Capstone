package com.capstone.project.controller;

import com.capstone.project.service.QuestionTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class QuestionTypeController {

    @Autowired
    private QuestionTypeService questionTypeService;

    @GetMapping("questiontypes")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(questionTypeService.getAll());
    }

    @GetMapping("/questiontype/{id}")
    public ResponseEntity<?> getQuestionTypeById(@PathVariable int id) {
        return ResponseEntity.ok(questionTypeService.getQuestionTypeById(id));
    }
}
