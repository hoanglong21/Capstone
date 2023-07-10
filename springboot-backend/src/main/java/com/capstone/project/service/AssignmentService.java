package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Assignment;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface AssignmentService {

    List<Assignment> getAllAssignment();
    List<Assignment> getAllAssignmentByClassId(int id);

    Assignment createAssignment(Assignment assignment, List<String> file, int type);

    Assignment getAssignmentById (int id) throws ResourceNotFroundException;

    Assignment updateAssignment(int id, Assignment assignment, List<String> files, int type) throws ResourceNotFroundException;

    Boolean deleteAssignment(int id) throws ResourceNotFroundException;

    Map<String, Object> getFilterAssignment( String search, String author, String from, String to,int classid, int page, int size) throws ResourceNotFroundException;
}
