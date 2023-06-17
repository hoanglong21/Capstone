package com.capstone.project.service;

import com.capstone.project.model.Assignment;

import java.text.ParseException;
import java.util.List;

public interface AssignmentService {
    List<Assignment> getAllAssignment();

    Assignment createAssignment(Assignment assignment) throws ParseException;

    Assignment getAssignmentById ( int id);

    Assignment updateAssignment( int id, Assignment assignment) throws ParseException;

    Boolean deleteAssignment(int id);
}
