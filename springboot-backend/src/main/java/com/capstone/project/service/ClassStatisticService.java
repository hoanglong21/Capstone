package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;

import java.text.ParseException;

public interface ClassStatisticService {
    Integer getTestNumber(int id) throws ResourceNotFroundException;

    Integer getAssignmentNumber(int id) throws ResourceNotFroundException;

    Integer getLeanerJoined(int id) throws ResourceNotFroundException, ParseException;
}
