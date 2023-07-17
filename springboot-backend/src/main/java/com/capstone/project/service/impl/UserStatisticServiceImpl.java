package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.repository.UserRepository;
import com.capstone.project.service.HistoryService;
import com.capstone.project.service.UserStatisticService;
import com.capstone.project.util.DateRangePicker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.*;

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
            Map<String, Object> response = historyService.filterHistory(id, 0, 1, 0, listDate.get(i), listDate.get(i+1),
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
            Map<String, Object> response = historyService.filterHistory(id, 0, 2, 0, listDate.get(i), listDate.get(i+1),
                    "datetime", "DESC", 1, 5);
            result.add(Integer.parseInt(String.valueOf(response.get("totalItems"))));
        }
        return result;
    }

    @Override
    public List<Integer> getClassJoinedStatistic(int id) {
        // TODO waiting for class_learner
        return null;
    }

    @Override
    public List<Integer> getLearningStatistic(int id) throws ResourceNotFroundException {
        // Check user exist
        userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("User not exist with id: " + id));

        List<Integer> result = new ArrayList<>();
        List<String> listDate = dateRangePicker.getShortDateRange();
        Map<String, Object> vocabulary = historyService.filterHistory(id, 0, 2, 1, listDate.get(0), listDate.get(1),
                "datetime", "DESC", 1, 5);
        Integer vocabularyResult = Integer.parseInt(String.valueOf(vocabulary.get("totalItems")));


        Map<String, Object> kanji = historyService.filterHistory(id, 0, 2, 2, listDate.get(0), listDate.get(1),
                "datetime", "DESC", 1, 5);
        Integer kanjiResult = Integer.parseInt(String.valueOf(kanji.get("totalItems")));

        Map<String, Object> grammar = historyService.filterHistory(id, 0, 2, 3, listDate.get(0), listDate.get(1),
                "datetime", "DESC", 1, 5);
        Integer grammarResult = Integer.parseInt(String.valueOf(grammar.get("totalItems")));

        result.add(vocabularyResult);
        result.add(kanjiResult);
        result.add(grammarResult);

        return result;
    }


}
