package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.repository.ClassRepository;
import com.capstone.project.service.AssignmentService;
import com.capstone.project.service.ClassLearnerService;
import com.capstone.project.service.ClassStatisticService;
import com.capstone.project.service.TestService;
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
    public Integer getLeanerJoined(int id) throws ResourceNotFroundException, ParseException {
        // Check user exist
        classRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Class not exist with id: " + id));
        List<String> listDate = dateRangePicker.getDateRange();
            Map<String, Object> response = classLearnerService.filterClassLeaner(0, id, listDate.get(0), listDate.get(1),
                    "created_date", "DESC", 1, 5);
            return Integer.parseInt(String.valueOf(response.get("totalItems")));

    }
}
