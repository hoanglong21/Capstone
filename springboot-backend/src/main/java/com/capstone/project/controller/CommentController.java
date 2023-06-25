package com.capstone.project.controller;

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
    public ResponseEntity<List<Comment>> getAllComment(){
        return ResponseEntity.ok(commentService.getAllComment());
    }
    @GetMapping("/commentbypostid/{id}")
    public ResponseEntity<List<Comment>> getAllCommentByPostId(@PathVariable int id){
            return ResponseEntity.ok(commentService.getAllCommentByPostId(id));
    }

    @GetMapping("/commentbyrootid/{id}")
    public ResponseEntity<List<Comment>> getAllCommentByRootId(@PathVariable int id){
        return ResponseEntity.ok(commentService.getAllCommentByRootId(id));
    }

    @GetMapping("/commentbystudysetid/{id}")
    public ResponseEntity<List<Comment>> getAllCommentByStudysetId(@PathVariable int id){
        return ResponseEntity.ok(commentService.getAllCommentByStudySetId(id));
    }

    @GetMapping("/commentbytestid/{id}")
    public ResponseEntity<List<Comment>> getAllCommentByTestId(@PathVariable int id){
        return ResponseEntity.ok(commentService.getAllCommentByTestId(id));
    }

    @GetMapping("/comments/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable int id){
        return ResponseEntity.ok(commentService.getCommentById(id));
    }

    @PostMapping("/comments")
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.createComment(comment));
    }

    @PutMapping("/comments/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable int id, @RequestBody Comment comment) {
        Comment comment_updated = commentService.updateComment(comment,id);
        return ResponseEntity.ok(comment_updated);
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteComment(@PathVariable int id) {
        boolean deleted = commentService.deleteComment(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

}
