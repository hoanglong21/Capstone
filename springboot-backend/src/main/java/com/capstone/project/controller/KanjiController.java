package com.capstone.project.controller;

import com.capstone.project.service.KanjiDicParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class KanjiController {


    @Autowired
    private KanjiDicParser kanjiDicParser;

    @GetMapping("/real")
    public String getReal() {
        return kanjiDicParser.real();
    }
}