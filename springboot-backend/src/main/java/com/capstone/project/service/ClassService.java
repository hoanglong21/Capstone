package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Class;

import java.text.ParseException;
import java.util.List;

public interface ClassService {
    List<Class> getAllClass();

    Class getClassroomById(int id) throws ResourceNotFroundException;

    Class createClassroom(Class classroom) throws ParseException;

    Class updateClassroom( Class classrooms,  int id) throws ResourceNotFroundException;

    Boolean deleteClass( int id) throws ResourceNotFroundException;
    Boolean deleteHardClass( int id) throws ResourceNotFroundException;
}
