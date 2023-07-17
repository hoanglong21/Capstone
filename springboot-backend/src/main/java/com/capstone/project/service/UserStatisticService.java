package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface UserStatisticService {

    List<List<Map<String, Integer>>> getAccessStatistic(int id) throws ResourceNotFroundException;

    List<Integer> getStudySetLearnedStatistic(int id) throws ResourceNotFroundException;

    List<Integer> getClassJoinedStatistic(int id) throws ResourceNotFroundException;

    List<Integer> getLearningStatistic(int id) throws ResourceNotFroundException;
}
