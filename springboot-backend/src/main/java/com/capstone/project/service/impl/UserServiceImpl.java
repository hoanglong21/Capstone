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

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new DuplicateValueException("Username already registered");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new DuplicateValueException("Email already registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String uniqueToken;
        while(true) {
            uniqueToken = UUID.randomUUID().toString();
            if(!userRepository.existsByToken(uniqueToken)) {
                break;
            }
        }
        user.setToken(uniqueToken);
        user.setStatus("pending");

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
            user = userRepository.findUserByUsername(username);
            if (user == null) {
                throw new ResourceNotFroundException("Studyset not exist with username:" + username);
            }
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        user.setEmail(userDetails.getEmail());
        user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        user.setBio(userDetails.getBio());
        user.setDob(userDetails.getDob());
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

    @Override
    public Boolean banUser(String username) {
        User user = null;
        try {
            user = userRepository.findUserByUsername(username);
            if (user == null) {
                throw new ResourceNotFroundException("Studyset not exist with username:" + username);
            }
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
            return false;
        }
        user.setStatus("banned");
        user.setBanned_date(new Date());
        userRepository.save(user);
        return true;
    }

    @Override
    public Boolean deleteUser(String username) {
        User user = null;
        try {
            user = userRepository.findUserByUsername(username);
            if (user == null) {
                throw new ResourceNotFroundException("Studyset not exist with username:" + username);
            }
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
            return false;
        }
        user.setStatus("deleted");
        user.setDeleted_date(new Date());
        userRepository.save(user);
        return true;
    }

    @Override
    public Boolean recoverUser(String username) {
        User user;
        try {
            user = userRepository.findUserByUsername(username);
            if (user == null) {
                throw new ResourceNotFroundException("Studyset not exist with username:" + username);
            }
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
            return false;
        }
        Date today = new Date();
        Date banned_date = user.getBanned_date();
        if(banned_date != null) {
            long diffInMillis = today.getTime() - banned_date.getTime();
            long diffInDays = diffInMillis / (24 * 60 * 60 * 1000);
            if(diffInDays<=7) {
                user.setStatus("banned");
                userRepository.save(user);
                return false;
            } else {
                user.setStatus("active");
                userRepository.save(user);
                return true;
            }
        } else {
            user.setStatus("active");
            userRepository.save(user);
            return true;
        }
    }

    @Override
    public User findByToken(String token) {
        return userRepository.findUserByToken(token);
    }
}
