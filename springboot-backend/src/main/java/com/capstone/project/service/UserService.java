package com.capstone.project.service;

import com.capstone.project.model.User;

import java.util.List;

public interface UserService {
    User createUser(User User);

    List<String> findAllNameExcept(String username);

    User getUserByUsername(String username);

    User updateUser(String username, User userDetails);

    Boolean banUser(String username);

    Boolean deleteUser(String username);

    Boolean recoverUser(String username);

    User findByToken(String token);
}
