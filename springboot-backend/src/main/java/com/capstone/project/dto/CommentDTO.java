package com.capstone.project.dto;

import com.capstone.project.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
    private int id;

    private String content;

    private Date created_date;

    private User user;

    private List<CommentDTO> childComments;
}
