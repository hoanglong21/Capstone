package com.capstone.project.controller;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.service.OverviewStatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/statistic")
public class OverviewStatisticController {
    @Autowired
    private OverviewStatisticService overviewStatisticService;

    @GetMapping("/overview/usergrowth")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getUserGrowth() {
        try {
            return ResponseEntity.ok(overviewStatisticService.getUserGrowth());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/overview/studysetgrowth")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getStudySetGrowth() {
        try {
            return ResponseEntity.ok(overviewStatisticService.getStudySetGrowth());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/overview/accessnumber")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAccessNumber() {
        return ResponseEntity.ok(overviewStatisticService.getAccessNumber());
    }

    @GetMapping("/overview/registernumber")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getRegisterNumber() {
        try {
            return ResponseEntity.ok(overviewStatisticService.getRegisterNumber());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/overview/classnumber")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getClassNumber() {
        try {
            return ResponseEntity.ok(overviewStatisticService.getClassNumber());
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/overview/studysetnumber")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getStudySetNumber() {
        try {
            return ResponseEntity.ok(overviewStatisticService.getStudySetNumber());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
