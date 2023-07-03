package com.capstone.project.controller;

import com.capstone.project.model.Grammar;
import com.capstone.project.model.Kanji;
import com.capstone.project.model.Vocabulary;
import com.capstone.project.service.KanjivgFinder;
import com.capstone.project.startup.ApplicationStartup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class DictionaryController {

    @Autowired
    private KanjivgFinder kanjivgFinder;


    @Autowired
    private ApplicationStartup applicationStartup;

    @GetMapping("/radical/{number}")
    public String getRadical(@PathVariable int number) {
        char kanjiCharacter = (char) (0x2F00 + number - 1);
        return String.valueOf(kanjiCharacter);
    }

    @GetMapping("/kanjivg/{char}")
    public String getKanjivg(@PathVariable("char") char character) {
        return kanjivgFinder.getSvgFile(character);
    }

    @GetMapping("/kanji")
    public List<Kanji> getKanji(@RequestParam(defaultValue = "1") int page,
                                @RequestParam(defaultValue = "3") int size,
                                @RequestParam(defaultValue = "") String search) {
        return applicationStartup.getKanjiService().searchAndPaginate(search, page, size);
    }

    @GetMapping("/vocabulary")
    public List<Vocabulary> getVocabulary( @RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "3") int size,
                                           @RequestParam(defaultValue = "") String search) {
        return applicationStartup.getVocabularyService().searchAndPaginate(search, page, size);
    }

    @GetMapping("/grammar")
    public List<Grammar> getGrammar(@RequestParam(defaultValue = "1") int page,
                                    @RequestParam(defaultValue = "3") int size,
                                    @RequestParam(defaultValue = "") String search,
                                    @RequestParam(defaultValue = "0") int level) {
        return applicationStartup.getGrammarService().searchAndPaginate(search, level, page, size);
    }
}