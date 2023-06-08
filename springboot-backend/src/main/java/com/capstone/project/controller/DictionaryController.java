package com.capstone.project.controller;

import com.capstone.project.model.Kanji;
import com.capstone.project.service.KanjiParser;
import com.capstone.project.service.VocabularyParse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class DictionaryController {


    @Autowired
    private KanjiParser kanjiParser;

    @Autowired
    private VocabularyParse vocabularyParse;

    @GetMapping("/kanji")
    public List<Kanji> getAllKanji() {
        return kanjiParser.getAllKanji();
    }

    @GetMapping("/vocabulary")
    public String getAllVocabulary() {
        return vocabularyParse.getAllVocabulary();
    }

    @GetMapping("/radical/{number}")
    public String getRadical(@PathVariable int number) {
        char kanjiCharacter = (char) (0x2F00 + number - 1);
        return String.valueOf(kanjiCharacter);
    }
}