package com.capstone.project.service.impl;

import com.capstone.project.model.User;
import com.capstone.project.repository.UserRepository;
import com.capstone.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getBanned()==null) {
            user.setBanned(false);
        }
        return userRepository.save(user);
    }
}
