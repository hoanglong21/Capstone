package com.capstone.project.dto;

import com.capstone.project.model.Answer;
import com.capstone.project.model.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionWrapper {

    private Question question;
    private List<Answer> answerList;
}
