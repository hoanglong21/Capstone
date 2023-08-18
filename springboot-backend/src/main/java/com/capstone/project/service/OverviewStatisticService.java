package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;

import java.util.List;

public interface OverviewStatisticService {
    List<Integer> getUserGrowth() throws Exception;

    List<Integer> getStudySetGrowth() throws Exception;

    Integer getAccessNumber();

    Integer getRegisterNumber() throws Exception;

    Integer getClassNumber() throws ResourceNotFroundException;

    Integer getStudySetNumber() throws Exception;
}
