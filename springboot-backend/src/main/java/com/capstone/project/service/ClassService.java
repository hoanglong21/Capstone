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

    Boolean recoverClass( int id) throws ResourceNotFroundException;

    Map<String, Object> getFilterClass(int classid, Boolean isDeleted, String search, String author,String learner, String fromDeleted, String toDeleted,
                                       String fromCreated, String toCreated, String sortBy, String direction, int page, int size) throws ResourceNotFroundException;

    Class joinClass(String classCode, String username) throws ResourceNotFroundException;

    Map<String, Object> getFilterClassStudySet(String search, int studysetassigned, int studysetnotassigned,int authorId, int page, int size) throws ResourceNotFroundException;

    Class AssignStudyset(int classid, int studysetid) throws ResourceNotFroundException;
    Boolean UnassignStudyset(int classid, int studysetid) throws ResourceNotFroundException;

    Class ResetClassCode(int id) throws ResourceNotFroundException;

    Boolean CheckUserClass(int userId, int classId) throws ResourceNotFroundException;

    Boolean CheckUserClassWaiting(int userId, int classId) throws ResourceNotFroundException;
}
