package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Class;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface ClassService {
    List<Class> getAllClass();

    Class getClassroomById(int id) throws ResourceNotFroundException;

    Class createClassroom(Class classroom) throws ParseException;

    Class updateClassroom( Class classrooms,  int id) throws ResourceNotFroundException;

    Boolean deleteClass( int id) throws ResourceNotFroundException;
    Boolean deleteHardClass( int id) throws ResourceNotFroundException;

    Map<String, Object> getFilterClass(Boolean isDeleted, String search, String author,String learner, String from, String to, int page, int size) throws ResourceNotFroundException;

    Class joinClass(String classCode, String username) throws ResourceNotFroundException;

    Class ResetClassCode(int id) throws ResourceNotFroundException;
}
