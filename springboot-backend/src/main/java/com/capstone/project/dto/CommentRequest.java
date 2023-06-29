package com.capstone.project.dto;

import com.capstone.project.model.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequest {
    private int id;

    private User user;


    @NotBlank(message = "Content cannot be empty")
    @Pattern(regexp = "[a-zA-Z0-9\\s]+", message = "Content can only contain letters, numbers, and spaces")
    @Length(min = 3, message = "Content must have at least 3 characters")
    private String content;

    private Comment root;

    private CommentType commentType;

    private Post post;

    private StudySet studySet;

    private Test test;

    public String getContent() {
        if (content != null) {
            // Remove extra spaces between words
            return StringUtils.normalizeSpace(content.trim());
        }
        return content;
    }
}
