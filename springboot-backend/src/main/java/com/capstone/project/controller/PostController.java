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

    @GetMapping("/post")
    public List<Post> getAllClass() {
        return postService.getAllPost();
    }

    @PostMapping("/post")
    public Post createPost(@RequestBody Post post)  {
        return postService.createPost(post);
    }

    @GetMapping("/post/{id}")
    public Post getPostById(@PathVariable int id) {
        return postService.getPostById(id);
    }

    @PutMapping("/post/{id}")
    Post updatePost(@RequestBody Post posts, @PathVariable int id) {
        return postService.updatePost(posts,id);
    }

    @DeleteMapping("/post/{id}")
    public ResponseEntity<Map<String, Boolean>> deletePost(@PathVariable int id) {
        boolean deleted = postService.deletePost(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
}
