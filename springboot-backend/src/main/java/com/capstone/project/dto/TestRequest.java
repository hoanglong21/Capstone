package com.capstone.project.dto;

import com.capstone.project.model.User;
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
public class TestRequest {
    private int id;

    @NotBlank(message = "Title cannot be empty")
    @Pattern(regexp = "[a-zA-Z0-9\\s]+", message = "Title can only contain letters, numbers, and spaces")
    @Length(min = 3, message = "Title must have at least 3 characters")
    private String title;

    private User user;

    @Pattern(regexp = ".*|[a-zA-Z0-9\\s.,:+-]+", message = "Description can only contain letters, numbers, and spaces")
    private String description;

    @Min(value = 5, message = "min duration is 5")
    @NumberFormat(style = NumberFormat.Style.NUMBER)
    private float duration;

    public String getDescription() {
        if (description != null) {
            // Remove extra spaces between words
            return StringUtils.normalizeSpace(description.trim());
        }
        return description;
    }

    public String getTitle() {
        if (title != null) {
            // Remove extra spaces between words
            return StringUtils.normalizeSpace(title.trim());
        }
        return title;
    }
}
