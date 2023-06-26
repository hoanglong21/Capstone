package com.capstone.project.controller;

import com.capstone.project.exception.ResourceNotFroundException;
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
    public ResponseEntity<?> getUser(@PathVariable("username") String username) {
        try {
            return ResponseEntity.ok(userService.getUserByUsername(username));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/users/{username}")
    public ResponseEntity<?> updateUser(@PathVariable("username") String username, @RequestBody User userDetails) {
        try {
            return ResponseEntity.ok(userService.updateUser(username, userDetails));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/otherusers/{except}")
    public ResponseEntity<?> findAllNameExcept(@PathVariable("except") String username) {
        return ResponseEntity.ok(userService.findAllNameExcept(username));
    }

    @GetMapping("/users/{username}/ban")
    public ResponseEntity<?> banUser(@PathVariable("username") String username) {
        try {
            return ResponseEntity.ok(userService.banUser(username));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/users/{username}/delete")
    public ResponseEntity<?> deleteUser(@PathVariable("username") String username) {
        try {
            return ResponseEntity.ok(userService.deleteUser(username));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/users/{username}/recover")
    public ResponseEntity<?> recoverUser(@PathVariable("username") String username) {
        try {
            return ResponseEntity.ok(userService.recoverUser(username));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/sendverify")
    public ResponseEntity<?> sendVerificationEmail(@RequestParam("username") String username) {
        try {
            return ResponseEntity.ok(userService.sendVerificationEmail(username));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyAccount(@RequestParam("token") String token) {
        try {
            return ResponseEntity.ok(userService.verifyAccount(token));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/sendreset")
    public ResponseEntity<?> sendResetPasswordEmail(@RequestParam("username") String username) {
        try {
            return ResponseEntity.ok(userService.sendResetPasswordEmail(username));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestParam("username") String username, @RequestParam("pin") String pin, @RequestBody String requestBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(requestBody);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        String password = jsonNode.get("password").asText();

        try {
            return ResponseEntity.ok(userService.resetPassword(username, pin, password));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/checkpassword")
    public ResponseEntity<?> checkMatchPassword(@RequestParam("username") String username, @RequestBody String requestBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(requestBody);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        String password = jsonNode.get("password").asText();

        try {
            return ResponseEntity.ok(userService.checkMatchPassword(username, password));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/changepassword")
    public ResponseEntity<?> changePassword(@RequestParam("username") String username, @RequestBody String requestBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(requestBody);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        String password = jsonNode.get("password").asText();

        try {
            return ResponseEntity.ok(userService.changePassword(username, password));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
