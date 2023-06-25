package com.capstone.project.controller;

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

    @GetMapping("/postbyclassid/{id}")
    public ResponseEntity<List<Post>> getAllPostByClassId(@PathVariable int id) {
        return ResponseEntity.ok(postService.getAllPostByClassId(id));
    }

    @PostMapping("/post")
    public ResponseEntity<Post> createPost(@RequestBody Post post)  {
        return ResponseEntity.ok(postService.createPost(post));
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable int id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @PutMapping("/post/{id}")
    public ResponseEntity<Post> updatePost(@RequestBody Post posts, @PathVariable int id) {
        return ResponseEntity.ok(postService.updatePost(posts,id));
    }

    @DeleteMapping("/post/{id}")
    public ResponseEntity<Map<String, Boolean>> deletePost(@PathVariable int id) {
        boolean deleted = postService.deletePost(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
}
