package com.capstone.project.controller;

import com.capstone.project.model.Kanji;
import com.capstone.project.model.Vocabulary;
import com.capstone.project.service.KanjiParser;
import com.capstone.project.service.KanjivgFinder;
import com.capstone.project.service.VocabularyParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class DictionaryController {


    @Autowired
    private KanjiParser kanjiParser;

    @Autowired
    private VocabularyParser vocabularyParse;

    @Autowired
    private KanjivgFinder kanjivgFinder;

    @GetMapping("/kanji")
    public List<Kanji> getAllKanji(@RequestParam(defaultValue = "1") int page,
                                   @RequestParam(defaultValue = "3") int size) {
        return kanjiParser.getAllKanji(page, size);
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

    @GetMapping("/kanjivg/{char}")
    public String getKanjivg(@PathVariable("char") char character) {
        return kanjivgFinder.getSvgFile(character);
    }
}