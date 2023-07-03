package com.capstone.project.service;

import com.capstone.project.exception.DuplicateValueException;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.User;

import java.util.List;

public interface UserService {
    User createUser(User User);

    List<String> findAllNameExcept(String username);

    User getUserByUsername(String username) throws ResourceNotFroundException;

    User updateUser(String username, User userDetails) throws ResourceNotFroundException, DuplicateValueException;

    Boolean banUser(String username) throws ResourceNotFroundException;

    Boolean deleteUser(String username) throws ResourceNotFroundException;

    Boolean recoverUser(String username) throws ResourceNotFroundException;

    Boolean verifyAccount(String token) throws ResourceNotFroundException;

    Boolean sendVerificationEmail(String username) throws ResourceNotFroundException;

    Boolean resetPassword(String username, String pin, String password) throws ResourceNotFroundException;

    String sendResetPasswordEmail(String username) throws ResourceNotFroundException;

    Boolean checkMatchPassword(String username, String checkPassword) throws ResourceNotFroundException;

    Boolean changePassword(String username, String password) throws ResourceNotFroundException;
}
