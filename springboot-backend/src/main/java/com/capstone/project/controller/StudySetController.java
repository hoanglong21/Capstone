package com.capstone.project.controller;

import com.capstone.project.model.StudySet;
import com.capstone.project.service.StudySetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class StudySetController {

    private final StudySetService studySetService;

    @Autowired
    public StudySetController(StudySetService studySetService) {
        this.studySetService = studySetService;
    }

    @GetMapping("/studysets")
    public List<StudySet> getAllStudySets() {
        return studySetService.getAllStudySets();
    }

    @PostMapping("/studysets")
    public StudySet createStudySet(@RequestBody StudySet studySet) {
        return studySetService.createStudySet(studySet);
    }

    /*
        // add example
    {
        "title": "set2",
        "description": "this is the set",
        "deleted": true,
        "public": false,
        "studySetType": {
            "id": 1
        },
        "user": {
            "id": 1
        }
    }*/

    @GetMapping("/studysets/{id}")
    public ResponseEntity<StudySet> getStudySetById(@PathVariable int id) {
        StudySet studySet = studySetService.getStudySetById(id);
        return ResponseEntity.ok(studySet);
    }

    @PutMapping("/studysets/{id}")
    public ResponseEntity<StudySet> updateStudySet(@PathVariable int id, @RequestBody StudySet studySetDetails) {
        StudySet updateStudySet = studySetService.updateStudySet(id, studySetDetails);
        return ResponseEntity.ok(updateStudySet);
    }

    @DeleteMapping("/studysets/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteStudySet(@PathVariable int id) {
        boolean deleted = studySetService.deleteStudySet(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
}
