package com.capstone.project.service;

import com.capstone.project.model.Answer;
import java.util.List;

public interface AnswerService {

    List<Answer> getAllAnswers();

    List<Answer> getAllByQuestionId(int id);

    Answer createAnswer( Answer answer);

    Answer getAnswerById( int id);

    Answer updateAnswer ( int id, Answer answer);

    Boolean deleteAnswer ( int id);
}
