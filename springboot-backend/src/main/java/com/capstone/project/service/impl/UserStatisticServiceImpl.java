package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.repository.UserRepository;
import com.capstone.project.service.HistoryService;
import com.capstone.project.service.UserStatisticService;
import com.capstone.project.util.DateRangePicker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class UserStatisticServiceImpl implements UserStatisticService {

    @Autowired
    private HistoryService historyService;

    @Autowired
    private DateRangePicker dateRangePicker;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Integer> getAccessStatistic(int id) throws ResourceNotFroundException {
        // TODO not right yet
        // Check user exist
        userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("User not exist with id: " + id));

        List<Integer> result = new ArrayList<>();
        List<String> listDate = dateRangePicker.getDateRange();
        for(int i=0; i<listDate.size()-1; i++) {
            Map<String, Object> response = historyService.filterHistory(id, 0, 1, listDate.get(i), listDate.get(i+1),
                    "datetime", "DESC", 1, 5);
            result.add(Integer.parseInt(String.valueOf(response.get("totalItems"))));
        }
        return result;
    }

    @Override
    public List<Integer> getStudySetLearnedStatistic(int id) throws ResourceNotFroundException {
        // Check user exist
        userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("User not exist with id: " + id));

        List<Integer> result = new ArrayList<>();
        List<String> listDate = dateRangePicker.getDateRange();
        for(int i=0; i<listDate.size()-1; i++) {
            Map<String, Object> response = historyService.filterHistory(id, 0, 2, listDate.get(i), listDate.get(i+1),
                    "datetime", "DESC", 1, 5);
            result.add(Integer.parseInt(String.valueOf(response.get("totalItems"))));
        }
        return result;
    }

    @Override
    public List<Integer> getClassJoinedStatistic(int id) {
        return null;
    }

    @Override
    public List<List> getLearningStatistic(int id) {
        return null;
    }


}
