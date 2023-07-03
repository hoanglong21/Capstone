package com.capstone.project.dto;

import com.capstone.project.model.QuestionType;
import com.capstone.project.model.Test;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.NumberFormat;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionRequest {

    private int id;

    @NotBlank(message = "Question cannot be empty")
    @Pattern(regexp = "[a-zA-Z0-9\\s.,?&!:\\[\\]()\\-]+", message = "Question can only contain letters, numbers, and spaces")
    @Length(min = 5, message = "Question must have at least 5 characters")
    private String question;

    private QuestionType questionType;


    @NumberFormat(style = NumberFormat.Style.NUMBER)
    @Min(value = 1, message = "number of choice must >= 1")
    @Max(value = 6, message = "number of choice must <= 6")
    private int num_choice;

    private Test test;

    public String getQuestion() {
        if (question != null) {
            // Remove extra spaces between words
            return StringUtils.normalizeSpace(question.trim());
        }
        return question;
    }
}
