package com.capstone.project.controller;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Content;
import com.capstone.project.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class ContentController {
    private final ContentService contentService;

    @Autowired
    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/contentbycardid")
    public ResponseEntity<?> getAllByCardId(@RequestParam int id) {
        return ResponseEntity.ok(contentService.getAllByCardId(id));
    }

    @PostMapping("/contents")
    public ResponseEntity<?> createContent(@RequestBody Content content) {
        return ResponseEntity.ok(contentService.createContent(content));
    }

    @GetMapping("/contents/{id}")
    public ResponseEntity<?> getContentById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(contentService.getContentById(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/contents/{id}")
    public ResponseEntity<?> updateContent(@PathVariable int id, @RequestBody Content contentDetails) {
        try {
            return ResponseEntity.ok(contentService.updateContent(id, contentDetails));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/contents/{id}")
    public ResponseEntity<?> deleteContent(@PathVariable int id) {
        try {
            return ResponseEntity.ok(contentService.deleteContent(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
