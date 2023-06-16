package com.capstone.project.controller;

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
    public ResponseEntity<List<Content>> getAllByCardId(@RequestParam int id) {
        return ResponseEntity.ok(contentService.getAllByCardId(id));
    }

    @PostMapping("/contents")
    public ResponseEntity<Content> createContent(@RequestBody Content content) {
        return ResponseEntity.ok(contentService.createContent(content));
    }

    @GetMapping("/contents/{id}")
    public ResponseEntity<Content> getContentById(@PathVariable int id) {
        return ResponseEntity.ok(contentService.getContentById(id));
    }

    @PutMapping("/contents/{id}")
    public ResponseEntity<Content> updateContent(@PathVariable int id, @RequestBody Content contentDetails) {
        Content updateContent = contentService.updateContent(id, contentDetails);
        return ResponseEntity.ok(updateContent);
    }

    @DeleteMapping("/contents/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteContent(@PathVariable int id) {
        boolean deleted = contentService.deleteContent(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
}
