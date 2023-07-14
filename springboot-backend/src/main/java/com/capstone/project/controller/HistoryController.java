package com.capstone.project.controller;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.History;
import com.capstone.project.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class HistoryController {
    @Autowired
    private HistoryService historyService;

    @GetMapping("/histories")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(historyService.getAll());
    }

    @GetMapping("/histories/{id}")
    public ResponseEntity<?> getHistoryById(@RequestParam("id") int id) {
        try {
            return ResponseEntity.ok(historyService.getHistoryById(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/histories")
    public ResponseEntity<?> createHistory(@RequestBody History history) {
        return ResponseEntity.ok(historyService.createHistory(history));
    }
}
