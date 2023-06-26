package com.capstone.project.controller;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Comment;
import com.capstone.project.model.Content;
import com.capstone.project.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }


    @GetMapping("/comments")
    public ResponseEntity<?> getAllComment(){
        return ResponseEntity.ok(commentService.getAllComment());
    }
    @GetMapping("/commentbypostid/{id}")
    public ResponseEntity<?> getAllCommentByPostId(@PathVariable int id){
            return ResponseEntity.ok(commentService.getAllCommentByPostId(id));
    }

    @GetMapping("/commentbyrootid/{id}")
    public ResponseEntity<?> getAllCommentByRootId(@PathVariable int id){
        return ResponseEntity.ok(commentService.getAllCommentByRootId(id));
    }

    @GetMapping("/commentbystudysetid/{id}")
    public ResponseEntity<?> getAllCommentByStudysetId(@PathVariable int id){
        return ResponseEntity.ok(commentService.getAllCommentByStudySetId(id));
    }

    @GetMapping("/commentbytestid/{id}")
    public ResponseEntity<?> getAllCommentByTestId(@PathVariable int id){
        return ResponseEntity.ok(commentService.getAllCommentByTestId(id));
    }

    @GetMapping("/comments/{id}")
    public ResponseEntity<?> getCommentById(@PathVariable int id){
        try {
            return ResponseEntity.ok(commentService.getCommentById(id));
        } catch (ResourceNotFroundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/comments")
    public ResponseEntity<?> createComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.createComment(comment));
    }

    @PutMapping("/comments/{id}")
    public ResponseEntity<?> updateComment(@PathVariable int id, @RequestBody Comment comment) {
       try {
           return ResponseEntity.ok(commentService.updateComment(comment, id));
       } catch (ResourceNotFroundException e){
           return ResponseEntity.badRequest().body(e.getMessage());
       }
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable int id) {
        try {
            return ResponseEntity.ok(commentService.deleteComment(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
