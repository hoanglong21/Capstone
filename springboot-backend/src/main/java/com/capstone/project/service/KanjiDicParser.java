package com.capstone.project.service;

import org.springframework.stereotype.Service;
import org.w3c.dom.*;
import javax.xml.parsers.*;
import java.io.*;

@Service
public class KanjiDicParser {
    public String real() {
        try {
            // Load the XML file
            File inputFile = new File("src\\main\\resources\\kanjidic2.xml");
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(inputFile);
            doc.getDocumentElement().normalize();

            String result = "";
            String temp = "";
            // Extract information from the XML elements
            NodeList nodeList = doc.getElementsByTagName("character");
            for (int i = 0; i < nodeList.getLength(); i++) {
                Node node = nodeList.item(i);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element character = (Element) node;
                    String literal = character.getElementsByTagName("literal").item(0).getTextContent();
                    NodeList readingsList = character.getElementsByTagName("reading");
                    NodeList meaningsList = character.getElementsByTagName("meaning");
                    String readings = "";
                    String meanings = "";
                    for (int j = 0; j < readingsList.getLength(); j++) {
                        Element reading = (Element) readingsList.item(j);
                        String attributeValue = reading.getAttribute("r_type");
                        if (attributeValue.equals("vietnam") || attributeValue.equals("ja_on") || attributeValue.equals("ja_kun")) {
                            readings += readingsList.item(j).getTextContent() + ", ";
                        }
                    }
                    for (int j = 0; j < meaningsList.getLength(); j++) {
                        Element meaning = (Element) meaningsList.item(j);
                        String attributeValue = meaning.getAttribute("m_lang");
                        if (attributeValue.equals("")) {
                            meanings += meaningsList.item(j).getTextContent()  + ", ";
                        }
                    }
//                    System.out.println(literal + ": " + String.join(", ", readings) + String.join(", ", meanings));
                    temp = literal + ": " + readings + meanings;
                    result += temp.substring(0, temp.length() - 1) + "\n";
                }
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
