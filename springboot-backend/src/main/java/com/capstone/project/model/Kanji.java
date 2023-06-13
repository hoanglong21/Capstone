package com.capstone.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Kanji {
    private String character;
    private String gradeLevel;
    private String strokeCount;
    private String jlptLevel;
    private List<String> radicals;
    private List<String> readingVietnam;
    private List<String> readingJapaneseOn;
    private List<String> readingJapaneseKun;
    private List<String> meanings;
    private String svgFile;
}