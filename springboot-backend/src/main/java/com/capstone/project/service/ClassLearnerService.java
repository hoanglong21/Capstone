package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.ClassLearner;
import com.capstone.project.model.UserAchievement;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface ClassLearnerService {

    List<ClassLearner> getAll();

    ClassLearner createClassLearner(ClassLearner classLearner);

    ClassLearner updateClassLearner(ClassLearner classLearner, int id) throws ResourceNotFroundException;

    ClassLearner updateClassLearnerById(ClassLearner classLearner, int classid, int userid);

    Boolean deleteClassLearner(int userid ,int classid) throws ResourceNotFroundException;

    Boolean deleteClassLearnerById(int id) throws ResourceNotFroundException;

    ClassLearner getClassLeanerById(int id) throws ResourceNotFroundException;

    List<ClassLearner> getClassLeanerByUserId(int id);

    Map<String, Object> filterClassLearner(int userId, int classId, String fromCreated, String toCreated,String status,
                                              String sortBy, String direction, int page, int size) throws ParseException;

    Map<String, Object> filterGetLearner(int userId, int classId, String status,
                                           String sortBy, String direction, int page, int size) throws ParseException;

}
