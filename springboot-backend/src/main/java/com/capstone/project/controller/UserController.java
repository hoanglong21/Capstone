package com.capstone.project.controller;

import com.capstone.project.model.User;
import com.capstone.project.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    @GetMapping("/sendverify")
    public ResponseEntity<Boolean> sendVerificationEmail(@RequestParam("username") String username) {
        if(userService.sendVerificationEmail(username)) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyAccount(@RequestParam("token") String token) {
        if (userService.verifyAccount(token)) {
            return ResponseEntity.ok("successfully");
        } else {
            return ResponseEntity.badRequest().body("failed");
        }
    }

    @GetMapping("/sendreset")
    public ResponseEntity<Boolean> sendResetPasswordEmail(@RequestParam("username") String username) {
        if(userService.sendResetPasswordEmail(username)) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PostMapping("/reset")
    public ResponseEntity<Boolean> resetPassword(@RequestParam("username") String username, @RequestParam("pin") String pin, @RequestBody String requestBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(requestBody);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        String password = jsonNode.get("password").asText();

        if(userService.resetPassword(username, pin, password)) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }
}
