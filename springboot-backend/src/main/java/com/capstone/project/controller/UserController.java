package com.capstone.project.controller;

import com.capstone.project.dto.ChangePasswordRequest;
import com.capstone.project.dto.UserRequest;
import com.capstone.project.exception.DuplicateValueException;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.User;
import com.capstone.project.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class UserController {
    private final UserService userService;
    @Autowired
    private ModelMapper modelMapper;

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
    public ResponseEntity<?> updateUser(@PathVariable("username") String username, @Valid @RequestBody UserRequest userRequest, BindingResult result) {
        if (result.hasErrors()) {
            // create a list of error messages from the binding result
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        } else {
            User userDetails = modelMapper.map(userRequest, User.class);
            try {
                return ResponseEntity.ok(userService.updateUser(username, userDetails));
            } catch (ResourceNotFroundException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            } catch (DuplicateValueException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
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
    public ResponseEntity<?> resetPassword(@RequestParam("username") String username, @RequestParam("pin") String pin,
                                           @Valid @RequestBody ChangePasswordRequest changePasswordRequest, BindingResult result) {
        if (result.hasErrors()) {
            // create a list of error messages from the binding result
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        } else {
            try {
                return ResponseEntity.ok(userService.resetPassword(username, pin, changePasswordRequest.getPassword()));
            } catch (ResourceNotFroundException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
    }

    @PostMapping("/checkpassword")
    public ResponseEntity<?> checkMatchPassword(@RequestParam("username") String username,
                                                @Valid @RequestBody ChangePasswordRequest changePasswordRequest, BindingResult result) {
        if (result.hasErrors()) {
            // create a list of error messages from the binding result
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        } else {
            try {
                return ResponseEntity.ok(userService.checkMatchPassword(username, changePasswordRequest.getPassword()));
            } catch (ResourceNotFroundException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }

    }

    @PostMapping("/changepassword")
    public ResponseEntity<?> changePassword(@RequestParam("username") String username,
                                            @Valid @RequestBody ChangePasswordRequest changePasswordRequest, BindingResult result) {
        if (result.hasErrors()) {
            // create a list of error messages from the binding result
            List<String> errors = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        } else {
            try {
                return ResponseEntity.ok(userService.changePassword(username, changePasswordRequest.getPassword()));
            } catch (ResourceNotFroundException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
    }

}
