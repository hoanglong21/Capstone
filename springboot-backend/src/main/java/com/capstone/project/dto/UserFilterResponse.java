package com.capstone.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFilterResponse {
    private String username;
    private String first_name;
    private String last_name;
    private String gender;
    private String email;
    private String bio;
    private String role;
    private String avatar;
}
