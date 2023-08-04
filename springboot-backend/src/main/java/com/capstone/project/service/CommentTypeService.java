package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.AchievementType;
import com.capstone.project.model.CommentType;
import com.capstone.project.model.StudySetType;

import java.util.List;

public interface CommentTypeService {

    List<CommentType> getAll();

    CommentType getCommentTypeById(int id);
}
