package com.capstone.project.controller;

import com.capstone.project.service.CommentTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class CommentTypeController {

    @Autowired
    private CommentTypeService commentTypeService;

    @GetMapping("commenttypes")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(commentTypeService.getAll());
    }

    @GetMapping("/commenttype/{id}")
    public ResponseEntity<?> getCommentTypeById(@PathVariable int id) {
        return ResponseEntity.ok(commentTypeService.getCommentTypeById(id));
    }

}
