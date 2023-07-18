package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Test;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface TestService {
    List<Test> getAllTest();

    Test createTest(Test test);

    Test getTestById ( int id) throws ResourceNotFroundException;
    List<Test> getTestByUser (String name) throws ResourceNotFroundException;

    Test updateTest( int id, Test test) throws ResourceNotFroundException;

    Boolean deleteTest( int id) throws ResourceNotFroundException;

    Map<String, Object> getFilterTest(String search, String author, String direction, int duration, int classid,
                                      String fromStarted, String toStarted, String fromCreated, String toCreated, Boolean isDraft, String sortBy, int page, int size) throws ResourceNotFroundException;
}
