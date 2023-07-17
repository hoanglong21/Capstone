package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;

import java.util.List;

public interface UserStatisticService {

    List<Integer> getAccessStatistic(int id) throws ResourceNotFroundException;

    List<Integer> getStudySetLearnedStatistic(int id) throws ResourceNotFroundException;

    List<Integer> getClassJoinedStatistic(int id);

    List<List> getLearningStatistic(int id);
}
