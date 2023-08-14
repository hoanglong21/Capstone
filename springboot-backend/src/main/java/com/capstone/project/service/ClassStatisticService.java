package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;

import java.text.ParseException;
import java.util.List;

public interface ClassStatisticService {
    Integer getTestNumber(int id) throws Exception;

    Integer getAssignmentNumber(int id) throws Exception;

    Integer getLeanerJoinedNumber(int id) throws ResourceNotFroundException, ParseException;

    List<Integer> getLeanerJoinedGrowth(int id) throws ResourceNotFroundException, ParseException;
    List<Integer> getPostGrowth(int id) throws Exception;

    List<Integer> getPointDistribution(int id) throws ResourceNotFroundException;
}
