package com.capstone.project.controller;

import com.capstone.project.model.User;
import com.capstone.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<User> getUser(@PathVariable("username") String username) {
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }

    @PutMapping("/users/{username}")
    public ResponseEntity<User> updateUser(@PathVariable("username") String username, @RequestBody User userDetails) {
        return ResponseEntity.ok(userService.updateUser(username, userDetails));
    }
}
