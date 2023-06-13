package com.capstone.project.service;
import java.io.File;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import com.capstone.project.model.Example;
import com.capstone.project.model.Sense;
import com.capstone.project.model.Vocabulary;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

@Service
public class VocabularyParse {
    private List<Vocabulary> vocabularyList = new ArrayList<>();

//    public List<Vocabulary> getAllVocabulary(){
//        try{
//            File inputFile = new File("src/main/resources/OmohaDictionary.xml");
//            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
//
//            // Add this line to increase the entity expansion limit
//            System.setProperty("entityExpansionLimit", "1000000");
//
//            DocumentBuilder dBuilder = dbf.newDocumentBuilder();
//            Document doc = dBuilder.parse(inputFile);
//            doc.getDocumentElement().normalize();
//
//            NodeList nodeList = doc.getElementsByTagName("entry");
//
//            for (int i = 0; i < nodeList.getLength(); i++) {
//                Vocabulary vocabulary = new Vocabulary();
//                Node node = nodeList.item(i);
//                if (node.getNodeType() == Node.ELEMENT_NODE) {
//                    Element entry = (Element) node;
//                    NodeList kanjisList = entry.getElementsByTagName("keb");
//                    NodeList readingsList = entry.getElementsByTagName("reb");
//                    NodeList sensesList = entry.getElementsByTagName("sense");
//                    List<String> kanjis = new ArrayList<>();
//                    List<String> readings = new ArrayList<>();
//                    List<Sense> senses = new ArrayList<>();
//                    for(int j = 0; j < kanjisList.getLength(); j++) {
//                        kanjis.add(kanjisList.item(j).getTextContent());
//                    }
//                    for(int j = 0; j < readingsList.getLength(); j++) {
//                        readings.add(readingsList.item(j).getTextContent());
//                    }
//                    for(int j = 0; j < sensesList.getLength(); j++) {
//                        Sense sense = new Sense();
//                        Element senseNode = (Element) sensesList.item(j);
//
//                        NodeList typesList = senseNode.getElementsByTagName("pos");
//                        List<String> types = new ArrayList<>();
//                        for(int k = 0; k < typesList.getLength(); k++) {
//                            types.add(typesList.item(k).getTextContent());
//                        }
//                        sense.setType(types);
//
//                        NodeList relatesList = senseNode.getElementsByTagName("xref");
//                        List<String> relates = new ArrayList<>();
//                        for(int k = 0; k < relatesList.getLength(); k++) {
//                            relates.add(relatesList.item(k).getTextContent());
//                        }
//                        sense.setRelate(relates);
//
//                        NodeList definitionsList = senseNode.getElementsByTagName("gloss");
//                        List<String> definitions = new ArrayList<>();
//                        for(int k = 0; k < definitionsList.getLength(); k++) {
//                            definitions.add(definitionsList.item(k).getTextContent());
//                        }
//                        sense.setDefinition(definitions);
//
//                        NodeList examplesList = senseNode.getElementsByTagName("example");
//                        List<Example> examples = new ArrayList<>();
//                        for(int k = 0; k < examplesList.getLength(); k++) {
//                            Example example = new Example();
//                            Element exampleNode = (Element) examplesList.item(k);
//
//                            example.setExampleText(exampleNode.getElementsByTagName("ex_text").item(0).getTextContent());
//                            example.setExampleSentenceJapanese(exampleNode.getElementsByTagName("ex_sent").item(0).getTextContent());
//                            example.setExampleSentenceVietnamese(exampleNode.getElementsByTagName("ex_sent").item(1).getTextContent());
//                            examples.add(example);
//                        }
//                        sense.setExample(examples);
//
//                        senses.add(sense);
//                    }
//                    vocabulary.setKanji(kanjis);
//                    vocabulary.setReading(readings);
//                    vocabulary.setSense(senses);
//                }
//                vocabularyList.add(vocabulary);
//            }
//            return vocabularyList;
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }

    public List<Vocabulary> getAllVocabulary(int page, int size) {
        try {
            ClassLoader classLoader = getClass().getClassLoader();
            InputStream inputStream = classLoader.getResourceAsStream("OmohaDictionary.xml");

            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

// Add this line to increase the entity expansion limit
            System.setProperty("entityExpansionLimit", "1000000");

            DocumentBuilder dBuilder = dbf.newDocumentBuilder();
            Document doc = dBuilder.parse(inputStream);
            doc.getDocumentElement().normalize();

            NodeList nodeList = doc.getElementsByTagName("entry");
            int startIndex = (page - 1) * size;
            int endIndex = Math.min(startIndex + size, nodeList.getLength());

            for (int i = startIndex; i < endIndex; i++) {
//                System.out.println(i);
                Vocabulary vocabulary = new Vocabulary();
                Node node = nodeList.item(i);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element entry = (Element) node;
                    NodeList kanjisList = entry.getElementsByTagName("keb");
                    NodeList readingsList = entry.getElementsByTagName("reb");
                    NodeList sensesList = entry.getElementsByTagName("sense");
                    List<String> kanjis = new ArrayList<>();
                    List<String> readings = new ArrayList<>();
                    List<Sense> senses = new ArrayList<>();
                    for (int j = 0; j < kanjisList.getLength(); j++) {
                        kanjis.add(kanjisList.item(j).getTextContent());
                    }
                    for (int j = 0; j < readingsList.getLength(); j++) {
                        readings.add(readingsList.item(j).getTextContent());
                    }
                    for (int j = 0; j < sensesList.getLength(); j++) {
                        Sense sense = new Sense();
                        Element senseNode = (Element) sensesList.item(j);

                        NodeList typesList = senseNode.getElementsByTagName("pos");
                        List<String> types = new ArrayList<>();
                        for (int k = 0; k < typesList.getLength(); k++) {
                            types.add(typesList.item(k).getTextContent());
                        }
                        sense.setType(types);

                        NodeList relatesList = senseNode.getElementsByTagName("xref");
                        List<String> relates = new ArrayList<>();
                        for (int k = 0; k < relatesList.getLength(); k++) {
                            relates.add(relatesList.item(k).getTextContent());
                        }
                        sense.setRelate(relates);

                        NodeList definitionsList = senseNode.getElementsByTagName("gloss");
                        List<String> definitions = new ArrayList<>();
                        for (int k = 0; k < definitionsList.getLength(); k++) {
                            definitions.add(definitionsList.item(k).getTextContent());
                        }
                        sense.setDefinition(definitions);

                        NodeList examplesList = senseNode.getElementsByTagName("example");
                        List<Example> examples = new ArrayList<>();
                        for (int k = 0; k < examplesList.getLength(); k++) {
                            Example example = new Example();
                            Element exampleNode = (Element) examplesList.item(k);

                            example.setExampleText(exampleNode.getElementsByTagName("ex_text").item(0).getTextContent());
                            example.setExampleSentenceJapanese(exampleNode.getElementsByTagName("ex_sent").item(0).getTextContent());
                            example.setExampleSentenceVietnamese(exampleNode.getElementsByTagName("ex_sent").item(1).getTextContent());
                            examples.add(example);
                        }
                        sense.setExample(examples);

                        senses.add(sense);
                    }
                    vocabulary.setKanji(kanjis);
                    vocabulary.setReading(readings);
                    vocabulary.setSense(senses);

                    vocabularyList.add(vocabulary);
                }
            }

            // Return the sublist for the specified page and size
            int totalItems = vocabularyList.size();
            int totalPages = (int) Math.ceil((double) totalItems / size);
            int currentPage = page;
            List<Vocabulary> result = vocabularyList.subList(0, 0); // Empty list

            if (page > 0 && page <= totalPages) {
                int start = (currentPage - 1) * size;
                int end = Math.min(start + size, totalItems);
                result = vocabularyList.subList(start, end);
            }

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
