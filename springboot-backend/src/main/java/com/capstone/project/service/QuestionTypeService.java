package com.capstone.project.service;

import com.capstone.project.model.CommentType;
import com.capstone.project.model.QuestionType;

import java.util.List;

public interface QuestionTypeService {

    List<QuestionType> getAll();

    QuestionType getQuestionTypeById(int id);
}
