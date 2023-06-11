package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Test;
import com.capstone.project.repository.TestRepository;
import com.capstone.project.repository.UserRepository;
import com.capstone.project.service.TestService;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class TestServiceImpl  implements TestService {

    private final TestRepository testRepository;
    private final UserRepository userRepository;

    public TestServiceImpl(TestRepository testRepository, UserRepository userRepository) {
        this.testRepository = testRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Test> getAllTest() {
        return testRepository.findAll();
    }

    @Override
    public Test createTest(Test test) {
        return testRepository.save(test);
    }

    @Override
    public Test getTestById(int id) {
        Test test = null;
        try{
            test = testRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Test is not exist with id: " + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        return test;
    }

    @Override
    public Test updateTest(int id, Test test) throws ParseException {
        Test testclass = null;
        try{
            testclass = testRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Test is not exist with id: " + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        testclass.setTitle(test.getTitle());
        testclass.setUser(userRepository.findUserById(test.getUser().getId()));
        testclass.setDescription(test.getDescription());
        testclass.setDuration(test.getDuration());
        Date currentDate = new Date();
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        String formattedDate = dateFormat.format(currentDate);
        Date parsedDate = dateFormat.parse(formattedDate);
        testclass.setModified_date(parsedDate);
        return testRepository.save(testclass);
    }

    @Override
    public Boolean deleteTest(int id) {
        Test testclass = null;
        try{
            testclass = testRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Test is not exist with id: " + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        testRepository.delete(testclass);
        return true;
    }
}
