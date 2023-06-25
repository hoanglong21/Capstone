package com.capstone.project.controller;

import com.capstone.project.dto.AuthenticationRequest;
import com.capstone.project.exception.DuplicateValueException;
import com.capstone.project.model.User;
import com.capstone.project.service.JwtService;
import com.capstone.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/auth/")
public class AuthController {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (DuplicateValueException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> AuthenticateAndGetToken(@RequestBody AuthenticationRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            if (authentication.isAuthenticated()) {
                String jwtToken = jwtService.generateToken(authRequest.getUsername());
                return ResponseEntity.ok(jwtToken);
            } else {
                return ResponseEntity.badRequest().body("The login details you provided are incorrect. Please try again.");
            }
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body("The login details you provided are incorrect. Please try again.");
        }
    }

    @GetMapping("/logout")
    public void logout() {
        return;
    }

}
