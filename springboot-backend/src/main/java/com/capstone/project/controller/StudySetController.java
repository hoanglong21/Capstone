package com.capstone.project.controller;

import com.capstone.project.dto.StudySetResponse;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Card;
import com.capstone.project.model.Content;
import com.capstone.project.model.StudySet;
import com.capstone.project.service.StudySetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class StudySetController {

    private final StudySetService studySetService;

    @Autowired
    public StudySetController(StudySetService studySetService) {
        this.studySetService = studySetService;
    }

    @GetMapping("/studysets")
    public ResponseEntity<?> getAllStudySets() {
        return ResponseEntity.ok(studySetService.getAllStudySets());
    }

    @PostMapping("/studysets")
    public ResponseEntity<?> createStudySet(@RequestBody StudySet studySet) {
        return ResponseEntity.ok(studySetService.createStudySet(studySet));
    }

    @GetMapping("/studysets/{id}")
    public ResponseEntity<?> getStudySetById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(studySetService.getStudySetById(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/studysets/{id}")
    public ResponseEntity<?> updateStudySet(@PathVariable int id, @RequestBody StudySet studySetDetails) {
        try {
            return ResponseEntity.ok(studySetService.updateStudySet(id, studySetDetails));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/studysets/{id}")
    public ResponseEntity<?> deleteStudySet(@PathVariable int id) {
        try {
            return ResponseEntity.ok(studySetService.deleteStudySet(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/deletestudysets/{id}")
    public ResponseEntity<?> deleteHardStudySet(@PathVariable int id) {
        try {
            return ResponseEntity.ok(studySetService.deleteHardStudySet(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/checkstudyset/{id}")
    public ResponseEntity<?> checkStudySet(@PathVariable int id) {
        try {
            return ResponseEntity.ok(studySetService.checkBlankCard(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/studysetAuthor/{username}")
    public ResponseEntity<?> getAllStudySetByUser(@PathVariable String username) {
        try {
            return ResponseEntity.ok(studySetService.getAllStudySetByUser(username));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getstudysets")
    public ResponseEntity<?> getCustomList(@RequestParam boolean is_deleted, @RequestParam boolean is_public, @RequestParam boolean is_draft) {
        return ResponseEntity.ok(studySetService.getCustomList(is_deleted, is_public, is_draft));
    }
}
