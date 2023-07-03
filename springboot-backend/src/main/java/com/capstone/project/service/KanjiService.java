package com.capstone.project.service;

import com.capstone.project.model.Kanji;
import org.springframework.stereotype.Service;
import org.w3c.dom.*;
import javax.xml.parsers.*;
import java.io.*;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;

@Service
public class KanjiService {

    KanjivgFinder kanjivgFinder;
    private List<Kanji> kanjiList = new ArrayList<>();

    public List<Kanji> getKanjiList() {
        return kanjiList;
    }

    public List<Kanji> getAllKanji() {
        try {
            // Load the XML file
            ClassLoader classLoader = getClass().getClassLoader();
            InputStream inputStream = classLoader.getResourceAsStream("kanjidic2.xml");

            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(inputStream);
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
                    kanji.setSvgFile(kanjivgFinder.getSvgFile(literal.charAt(0)));
                    NodeList gradeLevel = character.getElementsByTagName("grade");
                    if (gradeLevel.getLength() > 0) {
                        kanji.setGradeLevel(gradeLevel.item(0).getTextContent());
                    }
                    NodeList strokeCount = character.getElementsByTagName("stroke_count");
                    if (strokeCount.getLength() > 0) {
                        kanji.setStrokeCount(strokeCount.item(0).getTextContent());
                    }
                    NodeList jlptLevel = character.getElementsByTagName("jlpt");
                    if (jlptLevel.getLength() > 0) {
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
                        if (attributeValue.equals("vietnam")) {
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

    public List<Kanji> searchAndPaginate(String query, int page, int pageSize) {
        List<Kanji> results = new ArrayList<>();

        // Perform search based on the query
        for (Kanji kanji : kanjiList) {
            if (matchesQuery(kanji, query)) {
                results.add(kanji);
            }
        }

        // Apply pagination
        int startIndex = (page - 1) * pageSize;
        int endIndex = Math.min(startIndex + pageSize, results.size());

        return results.subList(startIndex, endIndex);
    }

    private boolean matchesQuery(Kanji kanji, String query) {
        if(query==null || query.equals("")) {
            return true;
        }
        String lowercaseQuery = query.toLowerCase();

        // Check if the query matches any property of the Kanji object
        if (kanji.getCharacter().toLowerCase().contains(lowercaseQuery)) {
            return true;
        }

        for (String reading : kanji.getReadingVietnam()) {
            //ignore accented Vietnamese
            if (normalizeString(reading).contains(normalizeString(query))) {
                return true;
            }
        }

        for (String reading : kanji.getReadingJapaneseOn()) {
            if (reading.toLowerCase().contains(lowercaseQuery)) {
                return true;
            }
        }

        for (String reading : kanji.getReadingJapaneseKun()) {
            if (reading.toLowerCase().contains(lowercaseQuery)) {
                return true;
            }
        }

        for (String meaning : kanji.getMeanings()) {
            if (meaning.toLowerCase().contains(lowercaseQuery)) {
                return true;
            }
        }
        return false;
    }

    private String normalizeString(String input) {
        return Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .toLowerCase();
    }

}


