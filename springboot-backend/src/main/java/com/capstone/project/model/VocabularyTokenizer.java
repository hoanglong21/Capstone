package com.capstone.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VocabularyTokenizer {
    private String Word;
    private List<String> partOfSpeech;
    private String dictionaryForm;
}
