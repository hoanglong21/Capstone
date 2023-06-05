package com.capstone.project.service;

import com.capstone.project.model.Class;

import java.util.List;

public interface ClassService {
    List<Class> getAllClass();

    Class getClassroomById(int id);

    Class createClassroom(Class classroom);

    Class updateClassroom( Class classrooms,  int id);

    String deleteClass( int id);
}
