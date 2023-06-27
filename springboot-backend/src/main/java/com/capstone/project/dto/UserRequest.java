package com.capstone.project.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.core.annotation.Order;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequest {
    private int id;

    @NotBlank(message = "Username cannot be empty")
    private String username;
    private String first_name;
    private String last_name;
    private String gender;
    private Date dob;

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Invalid email address")
    private String email;

    //@Length(min = 10, max = 11, message = "Phone number must be from 10 to 11 digits")
    @Pattern(regexp = "\\d{10}", message = "Phone number must be exactly 10 digits")
    private String phone;

    @NotBlank(message = "Password cannot be empty")
    @Pattern(regexp = ".*[a-z].*", message = "Password must contain at least one lowercase letter")
    @Pattern(regexp = ".*[A-Z].*", message = "Password must contain at least one uppercase letter")
    @Pattern(regexp = ".*\\d.*", message = "Password must contain at least one digit (number)")
    @Length(min = 8, message = "Password at least 8 characters")
    private String password;
    private String role;
    private String address;
    private String bio;
    private String status;
    private String avatar;
}
