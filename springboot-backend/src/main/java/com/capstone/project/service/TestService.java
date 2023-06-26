package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Test;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;

public interface TestService {
    List<Test> getAllTest();

    Test createTest(Test test);

    Test getTestById ( int id) throws ResourceNotFroundException;

    Test updateTest( int id, Test test) throws ParseException, ResourceNotFroundException;

    Boolean deleteTest( int id) throws ResourceNotFroundException;
}
