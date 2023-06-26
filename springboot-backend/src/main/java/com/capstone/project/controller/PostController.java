package com.capstone.project.controller;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Class;
import com.capstone.project.model.Post;
import com.capstone.project.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
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
public class PostController {

    private final PostService postService;
@Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }


    @GetMapping("/post")
    public ResponseEntity<?> getAllPost() {
        return ResponseEntity.ok(postService.getAllPost());
    }

    @GetMapping("/postbyclassid/{id}")
    public ResponseEntity<?> getAllPostByClassId(@PathVariable int id) {
        return ResponseEntity.ok(postService.getAllPostByClassId(id));
    }

    @PostMapping("/post")
    public ResponseEntity<?> createPost(@RequestBody Post post)  {
        return ResponseEntity.ok(postService.createPost(post));
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<?> getPostById(@PathVariable int id) {
    try {
        return ResponseEntity.ok(postService.getPostById(id));
    } catch (ResourceNotFroundException e){
        return ResponseEntity.badRequest().body(e.getMessage());
    }
    }

    @PutMapping("/post/{id}")
    public ResponseEntity<?> updatePost(@RequestBody Post posts, @PathVariable int id) {
    try {
        return ResponseEntity.ok(postService.updatePost(posts, id));
    } catch (ResourceNotFroundException e){
        return ResponseEntity.badRequest().body(e.getMessage());
    }
    }

    @DeleteMapping("/post/{id}")
    public ResponseEntity<?> deletePost(@PathVariable int id) {
        try {
            return ResponseEntity.ok(postService.deletePost(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
