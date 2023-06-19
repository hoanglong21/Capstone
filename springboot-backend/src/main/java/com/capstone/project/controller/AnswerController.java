package com.capstone.project.controller;

import com.capstone.project.model.Answer;
import com.capstone.project.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class AnswerController {

    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping("/answers")
    public List<Answer> getAllAnswer() {
        return answerService.getAllAnswers();
    }

    @GetMapping("/answersbyquestionid")
    public List<Answer> getAllByQuestionId(@RequestParam int id) {
        return answerService.getAllByQuestionId(id);
    }

    @GetMapping("/answers/{id}")
    public Answer getAnswerById(@PathVariable int id) {
        return answerService.getAnswerById(id);
    }

    @PostMapping("/answers")
    public Answer createAnswer(@RequestBody Answer answer) {
        return answerService.createAnswer(answer);
    }


    @PutMapping("/answers/{id}")
    public Answer updateAnswer(@PathVariable int id, @RequestBody Answer answer) {
        return answerService.updateAnswer(id,answer);
    }


    @DeleteMapping("/answers/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteAnswer(@PathVariable int id) {
        boolean deleted = answerService.deleteAnswer(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
}
