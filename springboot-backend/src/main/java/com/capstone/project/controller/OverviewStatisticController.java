package com.capstone.project.controller;

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
        return ResponseEntity.ok(overviewStatisticService.getUserGrowth());
    }

    @GetMapping("/overview/studysetgrowth")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getStudySetGrowth() {
        return ResponseEntity.ok(overviewStatisticService.getStudySetGrowth());
    }
}
