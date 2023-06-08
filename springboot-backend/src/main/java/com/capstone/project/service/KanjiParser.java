package com.capstone.project.service;

import com.capstone.project.model.Kanji;
import org.springframework.stereotype.Service;
import org.w3c.dom.*;
import javax.xml.parsers.*;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class KanjiParser {
    private List<Kanji> kanjiList = new ArrayList<>();

    public List<Kanji> getAllKanji() {
        try {
            // Load the XML file
            File inputFile = new File("src/main/resources/kanjidic2.xml");
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(inputFile);
            doc.getDocumentElement().normalize();

            // Extract information from the XML elements
            NodeList nodeList = doc.getElementsByTagName("character");
            for (int i = 0; i < nodeList.getLength(); i++) {
                Kanji kanji = new Kanji();
                Node node = nodeList.item(i);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element character = (Element) node;
                    String literal = character.getElementsByTagName("literal").item(0).getTextContent();
                    kanji.setCharacter(literal);

                    NodeList gradeLevel = character.getElementsByTagName("grade");
                    if(gradeLevel.getLength()>0) {
                        kanji.setGradeLevel(gradeLevel.item(0).getTextContent());
                    }
                    NodeList strokeCount = character.getElementsByTagName("stroke_count");
                    if(strokeCount.getLength()>0) {
                        kanji.setStrokeCount(strokeCount.item(0).getTextContent());
                    }
                    NodeList jlptLevel = character.getElementsByTagName("jlpt");
                    if(jlptLevel.getLength()>0) {
                        kanji.setJlptLevel(jlptLevel.item(0).getTextContent());
                    }
                    NodeList radicalsList = character.getElementsByTagName("radical");
                    NodeList readingsList = character.getElementsByTagName("reading");
                    NodeList meaningsList = character.getElementsByTagName("meaning");
                    List<String> radicals = new ArrayList<>();
                    List<String> readingVietnam = new ArrayList<>();
                    List<String> readingJapaneseOn = new ArrayList<>();
                    List<String> readingJapaneseKun = new ArrayList<>();
                    List<String> meanings = new ArrayList<>();
                    for (int j = 0; j < radicalsList.getLength(); j++) {
                        String radical = radicalsList.item(j).getTextContent();
                        char kanjiCharacter = (char) (0x2F00 + Integer.parseInt(radical) - 1);
                        radicals.add(String.valueOf(kanjiCharacter));
                    }
                    for (int j = 0; j < readingsList.getLength(); j++) {
                        Element reading = (Element) readingsList.item(j);
                        String attributeValue = reading.getAttribute("r_type");
                        if (attributeValue.equals("vietnam") ) {
                            readingVietnam.add(readingsList.item(j).getTextContent());
                        } else if (attributeValue.equals("ja_on")) {
                            readingJapaneseOn.add(readingsList.item(j).getTextContent());
                        } else if (attributeValue.equals("ja_kun")) {
                            readingJapaneseKun.add(readingsList.item(j).getTextContent());
                        }
                    }
                    for (int j = 0; j < meaningsList.getLength(); j++) {
                        Element meaning = (Element) meaningsList.item(j);
                        String attributeValue = meaning.getAttribute("m_lang");
                        if (attributeValue.equals("")) {
                            meanings.add(meaningsList.item(j).getTextContent());
                        }
                    }
                    kanji.setRadicals(radicals);
                    kanji.setReadingVietnam(readingVietnam);
                    kanji.setReadingJapaneseOn(readingJapaneseOn);
                    kanji.setReadingJapaneseKun(readingJapaneseKun);
                    kanji.setMeanings(meanings);
                }
                kanjiList.add(kanji);
            }
            return kanjiList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
