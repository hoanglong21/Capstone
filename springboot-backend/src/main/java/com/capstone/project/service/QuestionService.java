package com.capstone.project.service;

import com.capstone.project.model.Answer;
import com.capstone.project.model.Question;

import java.util.List;

public interface QuestionService {

    List<Question> getAllQuestions();

    List<Question> getAllByTestId(int id);

    Question createQuestion( Question question);

    Question getQuestionById( int id);

    Question updateQuestion ( int id, Question question);

    Boolean deleteQuestion ( int id);
}
