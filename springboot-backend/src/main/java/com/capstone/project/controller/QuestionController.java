package com.capstone.project.controller;

import com.capstone.project.dto.QuestionRequest;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Question;
import com.capstone.project.service.QuestionService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class QuestionController {

    @Autowired
    private ModelMapper modelMapper;

    private final QuestionService questionService;
@Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/questions")
    public ResponseEntity<?>  getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @GetMapping("/questionsbytestid")
    public ResponseEntity<?> getAllByTestId(@RequestParam int id) {
        return ResponseEntity.ok(questionService.getAllByTestId(id));
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<?> getQuestionById(@PathVariable int id) {
    try {
        return ResponseEntity.ok(questionService.getQuestionById(id));
    } catch (ResourceNotFroundException e){
        return ResponseEntity.badRequest().body(e.getMessage());
    }
    }

    @PostMapping("/questions")
    public ResponseEntity<?> createQuestion(@Valid @RequestBody QuestionRequest questionRequest, BindingResult result) {
        if (result.hasErrors()) {
            // create a list of error messages from the binding result
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        } else {
            Question question = modelMapper.map(questionRequest,Question.class);
            try{
                return ResponseEntity.ok(questionService.createQuestion(question));
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }

    }

    @PutMapping("/questions/{id}")
    public ResponseEntity<?> updateQuestion(@PathVariable int id, @Valid @RequestBody QuestionRequest questionRequest, BindingResult result) {
        if (result.hasErrors()) {
            // create a list of error messages from the binding result
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        } else {
            Question question = modelMapper.map(questionRequest,Question.class);
            try {
                return ResponseEntity.ok(questionService.updateQuestion(id, question));
            } catch (ResourceNotFroundException e){
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
    }


    @DeleteMapping("/questions/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable int id) {
        try {
            return ResponseEntity.ok(questionService.deleteQuestion(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
