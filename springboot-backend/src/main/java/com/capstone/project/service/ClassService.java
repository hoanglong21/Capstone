package com.capstone.project.service;

import com.capstone.project.model.Class;

import java.text.ParseException;
import java.util.List;

public interface ClassService {
    List<Class> getAllClass();

    Class getClassroomById(int id);

    Class createClassroom(Class classroom) throws ParseException;

    Class updateClassroom( Class classrooms,  int id);

    Boolean deleteClass( int id);
}
