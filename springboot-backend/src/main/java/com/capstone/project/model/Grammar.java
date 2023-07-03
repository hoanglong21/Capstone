package com.capstone.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Grammar {
    private String title;
    private String explanation;
    private String structure;
    private String attention;
    private String about;
    private String level;
    private List<String> example;
}