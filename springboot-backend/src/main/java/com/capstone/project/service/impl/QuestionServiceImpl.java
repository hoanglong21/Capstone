package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Answer;
import com.capstone.project.model.Attachment;
import com.capstone.project.model.Question;
import com.capstone.project.model.Submission;
import com.capstone.project.repository.AnswerRepository;
import com.capstone.project.repository.QuestionRepository;
import com.capstone.project.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    private final AnswerRepository answerRepository;

    @Autowired
    public QuestionServiceImpl(QuestionRepository questionRepository, AnswerRepository answerRepository) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public List<Question> getAllByTestId(int id) {
        return questionRepository.getQuestionByTestId(id);
    }

    @Override
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public Question getQuestionById(int id) {
        Question question = null;
        try {
            question = questionRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Question not exist with id: " + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        return question;
    }

    @Override
    public Question updateQuestion(int id, Question question) {
        Question question_new = null;
        try {
            question_new = questionRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Question not exist with id: " + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        question_new.setNum_choice(question.getNum_choice());
        question_new.setQuestion(question.getQuestion());
        question_new.setQuestionType(question.getQuestionType());
        return questionRepository.save(question_new);
    }

    @Override
    public Boolean deleteQuestion(int id) {
        Question question = null;
        try {
            question = questionRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Question not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        for (Answer answer : answerRepository.getAnswerByQuestionId(question.getId())) {
             answerRepository.delete(answer);
        }

        questionRepository.delete(question);
        return true;
    }
}
