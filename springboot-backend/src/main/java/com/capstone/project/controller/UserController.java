package com.capstone.project.controller;

import com.capstone.project.model.User;
import com.capstone.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/otherusers/{except}")
    public List<String> findAllNameExcept(@PathVariable("except") String username) {
        return userService.findAllNameExcept(username);
    }

    @GetMapping("/users/{username}/ban")
    public ResponseEntity<Map<String, Boolean>> banUser(@PathVariable("username") String username) {
        boolean success = userService.banUser(username);
        Map<String, Boolean> response = new HashMap<>();
        response.put("success", success);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/users/{username}/delete")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable("username") String username) {
        boolean success = userService.deleteUser(username);
        Map<String, Boolean> response = new HashMap<>();
        response.put("success", success);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/users/{username}/recover")
    public ResponseEntity<Map<String, Boolean>> recoverUser(@PathVariable("username") String username) {
        boolean success = userService.recoverUser(username);
        Map<String, Boolean> response = new HashMap<>();
        response.put("success", success);
        return ResponseEntity.ok(response);
    }
}
