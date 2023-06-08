package com.capstone.project.controller;

import com.capstone.project.model.Card;
import com.capstone.project.model.Kanji;
import com.capstone.project.model.Vocabulary;
import com.capstone.project.service.KanjiParser;
import com.capstone.project.service.VocabularyParse;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<Vocabulary> getAllVocabulary( @RequestParam(defaultValue = "1") int page,
                                              @RequestParam(defaultValue = "3") int size) {
        return vocabularyParse.getAllVocabulary(page, size);
    }

    @GetMapping("/radical/{number}")
    public String getRadical(@PathVariable int number) {
        char kanjiCharacter = (char) (0x2F00 + number - 1);
        return String.valueOf(kanjiCharacter);
    }
}