package com.capstone.project.controller;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.UserAchievement;
import com.capstone.project.service.UserAchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class UserAchievementController {
    @Autowired
    private UserAchievementService userAchievementService;

    @GetMapping("/userachievements")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_LEARNER') || hasRole('ROLE_TUTOR')")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(userAchievementService.getAll());
    }

    @PostMapping("/userachievements")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_LEARNER') || hasRole('ROLE_TUTOR')")
    public ResponseEntity<?> createUserAchievement(@RequestBody UserAchievement userAchievement) {
        try {
            return ResponseEntity.ok(userAchievementService.createUserAchievement(userAchievement));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/userachievements/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_LEARNER') || hasRole('ROLE_TUTOR')")
    public ResponseEntity<?> getUserAchievementById(@PathVariable("id") int id) {
        try {
            return ResponseEntity.ok(userAchievementService.getUserAchievementById(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/userachievementsbyuser/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_LEARNER') || hasRole('ROLE_TUTOR')")
    public ResponseEntity<?> getUserAchievementByUserId(@PathVariable("id") int id) {
        return ResponseEntity.ok(userAchievementService.getUserAchievementByUserId(id));
    }
}
