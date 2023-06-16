package com.capstone.project.service.impl;

import com.capstone.project.exception.DuplicateValueException;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.User;
import com.capstone.project.repository.UserRepository;
import com.capstone.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new DuplicateValueException("Username already registered");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new DuplicateValueException("Email already registered");
        }
        return userRepository.save(user);
    }

    @Override
    public List<String> findAllNameExcept(String username) {
        return userRepository.findAllNameExcept(username);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public User updateUser(String username, User userDetails) {
        User user = null;
        try {
            user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new ResourceNotFroundException("Studyset not exist with username:" + username));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        user.setEmail(userDetails.getEmail());
        user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        user.setBio(userDetails.getBio());
        user.setDOB(userDetails.getDOB());
        user.setAvatar(userDetails.getAvatar());
        user.setAddress(userDetails.getAddress());
        user.setFirst_name(userDetails.getFirst_name());
        user.setLast_name(userDetails.getLast_name());
        user.setGender(userDetails.getGender());
        user.setPhone(userDetails.getPhone());
        user.setGender(userDetails.getGender());
        user.setStatus(userDetails.getStatus());
        user.setRole(userDetails.getRole());

        User updateUser = userRepository.save(user);
        return updateUser;
    }


}
