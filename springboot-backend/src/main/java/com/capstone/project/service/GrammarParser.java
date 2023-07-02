package com.capstone.project.service;

import com.capstone.project.model.Grammar;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;


import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class GrammarParser {
    private List<Grammar> grammarList = new ArrayList<>();

    public List<Grammar> getAllGrammars(int page, int size) {
        try {
            ClassLoader classLoader = getClass().getClassLoader();
            InputStream inputStream = classLoader.getResourceAsStream("Lgrammar.xml");

            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

            // Add this line to increase the entity expansion limit
            System.setProperty("entityExpansionLimit", "1000000");

            DocumentBuilder dBuilder = dbf.newDocumentBuilder();
            Document doc = dBuilder.parse(inputStream);
            doc.getDocumentElement().normalize();

            NodeList nodeList = doc.getElementsByTagName("grammar");
            int startIndex = (page - 1) * size;
            int endIndex = Math.min(startIndex + size, nodeList.getLength());

            for(int i = startIndex; i < endIndex; i++) {
                Grammar grammar = new Grammar();
                Node node = nodeList.item(i);
                if(node.getNodeType() == Node.ELEMENT_NODE) {
                    Element grammar_point = (Element) node;
                    NodeList grammarTitle = grammar_point.getElementsByTagName("title");
                    if(grammarTitle.getLength() > 0) {
                        grammar.setTitle(grammarTitle.item(0).getTextContent());
                    }
                    NodeList grammarExplanation = grammar_point.getElementsByTagName("explanation");
                    if(grammarExplanation.getLength() > 0) {
                        grammar.setExplanation(grammarExplanation.item(0).getTextContent());
                    }
                    NodeList grammarStructure = grammar_point.getElementsByTagName("structure");
                    if(grammarStructure.getLength() > 0) {
                        grammar.setStructure(grammarStructure.item(0).getTextContent());
                    }
                    NodeList grammarAttention = grammar_point.getElementsByTagName("attention");
                    if(grammarAttention.getLength() > 0) {
                        grammar.setAttention(grammarAttention.item(0).getTextContent());
                    }
                    NodeList grammarAbout = grammar_point.getElementsByTagName("about");
                    if(grammarAbout.getLength() > 0) {
                        grammar.setAbout(grammarAbout.item(0).getTextContent());
                    }
                    NodeList grammarLevel = grammar_point.getElementsByTagName("level");
                    if(grammarLevel.getLength() > 0) {
                        grammar.setLevel(grammarLevel.item(0).getTextContent());
                    }
                    List<String> exampleList = new ArrayList<>();
                    NodeList grammarExample = grammar_point.getElementsByTagName("example");
                    for(int j = 0; j < grammarExample.getLength(); j++) {
                        Element exampleNode = (Element) grammarExample.item(j);
                        exampleList.add(exampleNode.getElementsByTagName("japanese").item(0).getTextContent()+"\n"+
                                exampleNode.getElementsByTagName("english").item(0).getTextContent());
                    }
                    grammar.setExample(exampleList);

                    grammarList.add(grammar);
                }
            }

            // Return the sublist for the specified page and size
            return grammarList.subList(startIndex, endIndex);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
