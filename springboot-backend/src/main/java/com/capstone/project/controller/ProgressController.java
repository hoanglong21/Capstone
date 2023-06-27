package com.capstone.project.controller;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Progress;
import com.capstone.project.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLIntegrityConstraintViolationException;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class ProgressController {

    private final ProgressService progressService;

    @Autowired
    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/progresses")
    public ResponseEntity<?> getAllProgresses() {
        return ResponseEntity.ok(progressService.getAllProgresses());
    }

    @PostMapping("/progresses")
    public ResponseEntity<?> createProgress(@RequestBody Progress progress) {
        try {
            return ResponseEntity.ok(progressService.createProgress(progress));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/progresses/{id}")
    public ResponseEntity<?> getProgressById(@PathVariable("id") int id) {
        try {
            return ResponseEntity.ok(progressService.getProgressById(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/progresses/{id}")
    public ResponseEntity<?> updateProgress(@PathVariable("id") int id, @RequestBody Progress progressDetails) {
        try {
            return ResponseEntity.ok(progressService.updateProgress(id, progressDetails));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/progresses/{id}")
    public ResponseEntity<?> deleteProgress(@PathVariable("id") int id) {
        try {
            return ResponseEntity.ok(progressService.deleteProgress(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
