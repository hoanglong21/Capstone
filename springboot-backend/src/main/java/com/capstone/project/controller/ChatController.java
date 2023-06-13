package com.capstone.project.controller;

import com.capstone.project.model.User;
import com.capstone.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/chat/")
public class ChatController {
    private final UserService userService;

    public ChatController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<String> findAllNameExcept(String username) {
        return userService.findAllNameExcept(username);
    }
}
