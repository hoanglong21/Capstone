package com.capstone.project.controller;

import com.capstone.project.ProjectApplication;
import com.capstone.project.model.Grammar;
import com.capstone.project.model.Kanji;
import com.capstone.project.model.Vocabulary;
import com.capstone.project.service.GrammarParser;
import com.capstone.project.service.KanjivgFinder;
import com.capstone.project.service.VocabularyParser;
import com.capstone.project.startup.ApplicationStartup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class DictionaryController {


    @Autowired
    private VocabularyParser vocabularyParse;

    @Autowired
    private KanjivgFinder kanjivgFinder;

    @Autowired
    private GrammarParser grammarParser;

    @Autowired
    private ApplicationStartup applicationStartup;

    @GetMapping("/kanji")
    public List<Kanji> getKanji(@RequestParam(defaultValue = "1") int page,
                                @RequestParam(defaultValue = "3") int size,
                                @RequestParam(defaultValue = "") String search) {
        return applicationStartup.getKanjiService().searchAndPaginate(search, page, size);
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

    @GetMapping("/grammar")
    public List<Grammar> getAllGrammar(@RequestParam(defaultValue = "1") int page,
                                       @RequestParam(defaultValue = "3") int size) {
        return grammarParser.getAllGrammars(page, size);
    }
}