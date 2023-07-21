package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.repository.AssignmentRepository;
import com.capstone.project.repository.ClassRepository;
import com.capstone.project.service.*;
import com.capstone.project.util.DateRangePicker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ClassStatisticServiceImpl implements ClassStatisticService {

    @Autowired
    AssignmentRepository assignmentRepository;

    @Autowired
    SubmissionService submissionService;

    @Autowired
    PostService postService;

    @Autowired
    ClassLearnerService classLearnerService;

    @Autowired
    ClassRepository classRepository;

    @Autowired
    private TestService testService;

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private DateRangePicker dateRangePicker;

    @Override
    public Integer getTestNumber(int id) throws ResourceNotFroundException {
        classRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Class not exist with id: " + id));
//        List<String> listDate = dateRangePicker.getShortDateRange();
        Map<String, Object> response = testService.getFilterTest(null, null, "DESC", 0, id, null, null,
                null, null, null, "created_date", 1, 5);
        return Integer.parseInt(String.valueOf(response.get("totalItems")));
    }

    @Override
    public Integer getAssignmentNumber(int id) throws ResourceNotFroundException {
        classRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Class not exist with id: " + id));
//        List<String> listDate = dateRangePicker.getShortDateRange();
        Map<String, Object> response = assignmentService.getFilterAssignment(null, null, null, null, null, null,
                null, "DESC", "created_date", id, 1, 5);
        return Integer.parseInt(String.valueOf(response.get("totalItems")));
    }

    @Override
    public Integer getLeanerJoinedNumber(int id) throws ResourceNotFroundException, ParseException {
        classRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Class not exist with id: " + id));
        List<String> listDate = dateRangePicker.getDateRange();
            Map<String, Object> response = classLearnerService.filterClassLeaner(0, id, null, null,
                    "created_date", "DESC", 1, 5);
            return Integer.parseInt(String.valueOf(response.get("totalItems")));
        }


    @Override
    public List<Integer> getLeanerJoinedGrowth(int id) throws ResourceNotFroundException, ParseException {
        classRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Class not exist with id: " + id));
        List<String> listDate = dateRangePicker.getShortDateRange();
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < listDate.size() - 1; i++) {
            Map<String, Object> response = classLearnerService.filterClassLeaner(0, id, listDate.get(i), listDate.get(i + 1),
                    "created_date", "DESC", 1, 5);
            result.add( Integer.parseInt(String.valueOf(response.get("totalItems"))));

        }

        return result;

    }

    @Override
    public List<Integer> getPostGrowth() throws ResourceNotFroundException {
        List<Integer> result = new ArrayList<>();
        List<String> listDate = dateRangePicker.getDateActive();
        for(int i=0; i<listDate.size()-1; i++) {
            Map<String, Object> response = postService.getFilterPost(null,null, listDate.get(i), listDate.get(i + 1),
                    "created_date","DESC",0,1,5);
            result.add(Integer.parseInt(String.valueOf(response.get("totalItems"))));
        }
        return result;
    }

    @Override
    public List<Integer> getPointDistribution(int id) throws ResourceNotFroundException {
        assignmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Assignment not exist with id: " + id));
//        List<String> listDate = dateRangePicker.getDateRange();
        List<Integer> result = new ArrayList<>();
            Map<String, Object> response = submissionService.getFilterSubmission(null,0,id,0,null,null,"DESC",1,5);
            result.add( Integer.parseInt(String.valueOf(response.get("markLessThan5Count"))));
            result.add( Integer.parseInt(String.valueOf(response.get("markBetween5And8Count"))));
            result.add( Integer.parseInt(String.valueOf(response.get("markGreaterThan8Count"))));

        return result;
    }


}

