package com.capstone.project.controller;

import com.capstone.project.service.TranslateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class TranslateController {
    @Autowired
    private TranslateService translateService;

    @GetMapping("/translate")
    public ResponseEntity<?> translate(@RequestParam("text") String text, @RequestParam("to") String to) {
        try {
            return ResponseEntity.ok(translateService.translate(text, to));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
