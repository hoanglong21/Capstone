package com.capstone.project.controller;

import com.capstone.project.model.Answer;
import com.capstone.project.model.Question;
import com.capstone.project.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class QuestionController {

    private final QuestionService questionService;
@Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/questions")
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/questionsbytestid")
    public List<Question> getAllByTestId(@RequestParam int id) {
        return questionService.getAllByTestId(id);
    }

    @GetMapping("/questions/{id}")
    public Question getQuestionById(@PathVariable int id) {
        return questionService.getQuestionById(id);
    }

    @PostMapping("/questions")
    public Question createQuestion(@RequestBody Question question) {
        return questionService.createQuestion(question);
    }


    @PutMapping("/questions/{id}")
    public Question updateQuestion(@PathVariable int id, @RequestBody Question question) {
        return questionService.updateQuestion(id,question);
    }


    @DeleteMapping("/questions/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteQuestion(@PathVariable int id) {
        boolean deleted = questionService.deleteQuestion(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
}
