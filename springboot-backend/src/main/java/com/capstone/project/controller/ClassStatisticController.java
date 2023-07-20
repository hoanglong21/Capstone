package com.capstone.project.controller;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.service.ClassStatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/statistic")
public class ClassStatisticController {

    @Autowired
    private ClassStatisticService classStatisticService;

    @GetMapping("/classtest/{id}")
    public ResponseEntity<?> getTestNumber(@PathVariable int id){
        try {
            return ResponseEntity.ok(classStatisticService.getTestNumber(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/classassignment/{id}")
    public ResponseEntity<?> getAssignmentNumber(@PathVariable int id){
        try {
            return ResponseEntity.ok(classStatisticService.getAssignmentNumber(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/classlearnerjoined/{id}")
    public ResponseEntity<?> getLeanerJoined(@PathVariable int id){
        try {
            return ResponseEntity.ok(classStatisticService.getLeanerJoined(id));
        } catch (ResourceNotFroundException | ParseException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/postgrowth")
    public ResponseEntity<?> getPostGrowth() throws ResourceNotFroundException {
        return ResponseEntity.ok(classStatisticService.getPostGrowth());
    }

    @GetMapping("/pointdistribution/{id}")
    public ResponseEntity<?> getPointDistribution(@PathVariable int id){
        try {
            return ResponseEntity.ok(classStatisticService.getPointDistribution(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
