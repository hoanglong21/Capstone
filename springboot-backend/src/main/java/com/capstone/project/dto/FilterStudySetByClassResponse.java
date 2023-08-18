package com.capstone.project.dto;

import com.capstone.project.model.Class;
import com.capstone.project.model.StudySetType;
import com.capstone.project.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FilterStudySetByClassResponse {

    private int id;
    private User user;
    private String title;
    private String description;
    private boolean is_deleted;
    private boolean is_public;
    private boolean is_draft;
    private StudySetType studySetType;
    Set<Class> classes;
    private Date deleted_date;
    private Date created_date;
    private int count;
}
