package com.capstone.project.dto;

import com.capstone.project.model.Class;
import com.capstone.project.model.User;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentRequest {

    private int id;
    private Class classroom;
    private User user;

    @NotBlank(message = "Title cannot be empty")
    @Pattern(regexp = "[a-zA-Z0-9\\s]+", message = "Title can only contain letters, numbers, and spaces")
    @Length(min = 3, message = "Title must have at least 3 characters")
    private String title;



    @FutureOrPresent
    @NotNull(message = "Start date cannot be null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date start_date;

    private boolean is_draft;

    @Future
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Nullable
    private Date due_date;

//    @Pattern(regexp = "[a-zA-Z0-9\\s]+", message = " Can only contain letters, numbers, and spaces")
    private String instruction;


    public String getTitle() {
        if (title != null) {
            // Remove extra spaces between words
            return StringUtils.normalizeSpace(title.trim());
        }
        return title;
    }

    public String getInstruction() {
        if (instruction != null) {
            // Remove extra spaces between words
            return StringUtils.normalizeSpace(instruction.trim());
        }
        return instruction;
    }

    @AssertTrue(message = "Due date must be greater than or equal to start date")
    public boolean isDueDateValid() {
        return due_date == null || start_date == null || due_date.compareTo(start_date) >= 0;
    }
}
