package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.ClassLearner;
import com.capstone.project.model.UserAchievement;

import java.util.List;
import java.util.Map;

public interface ClassLearnerService {

    List<ClassLearner> getAll();

    ClassLearner createClassLearner(ClassLearner classLearner);

    ClassLearner getClassLeanerById(int id) throws ResourceNotFroundException;

    List<ClassLearner> getClassLeanerByUserId(int id);

    Map<String, Object> filterClassLeaner(int userId, int classId, String fromCreated, String toCreated,
                                              String sortBy, String direction, int page, int size);

}
