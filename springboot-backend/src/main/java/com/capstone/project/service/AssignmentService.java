package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Assignment;

import java.text.ParseException;
import java.util.List;

public interface AssignmentService {

    List<Assignment> getAllAssignment();
    List<Assignment> getAllAssignmentByClassId(int id);

    Assignment createAssignment(Assignment assignment) ;

    Assignment getAssignmentById ( int id) throws ResourceNotFroundException;

    Assignment updateAssignment( int id, Assignment assignment) throws ResourceNotFroundException;

    Boolean deleteAssignment(int id) throws ResourceNotFroundException;
}
