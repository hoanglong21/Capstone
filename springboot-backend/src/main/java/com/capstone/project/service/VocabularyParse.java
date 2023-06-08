package com.capstone.project.service;
import java.io.File;
import java.io.IOException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

@Service
public class VocabularyParse {
    public String getAllVocabulary(){
        try{
            File inputFile = new File("src/main/resources/OmohaDictionary.xml");
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

            // Add this line to increase the entity expansion limit
            System.setProperty("entityExpansionLimit", "1000000");

            DocumentBuilder dBuilder = dbf.newDocumentBuilder();
            Document doc = dBuilder.parse(inputFile);
            doc.getDocumentElement().normalize();

            String result = "";
            NodeList entries = doc.getElementsByTagName("entry");

            for (int i = 0; i < entries.getLength(); i++) {
                Element entry = (Element)entries.item(i);
                String keb = "";
                NodeList kebNodes = entry.getElementsByTagName("keb");
                if (kebNodes.getLength() > 0) {
                    keb = ((Element)kebNodes.item(0)).getTextContent();
                }

                String reb1 = "";
                NodeList reb1Nodes = entry.getElementsByTagName("reb");
                if (reb1Nodes.getLength() > 0) {
                    reb1 = ((Element)reb1Nodes.item(0)).getTextContent();
                }

                String reb2 = "";
                NodeList reb2Nodes = entry.getElementsByTagName("reb");
                if (reb2Nodes.getLength() > 1) {
                    reb2 = ((Element)reb2Nodes.item(1)).getTextContent();
                }

                String reInf = "";
                NodeList reInfNodes = entry.getElementsByTagName("re_inf");
                if (reInfNodes.getLength() > 0) {
                    reInf = ((Element)reInfNodes.item(0)).getTextContent();
                }

                String ant = "";
                NodeList antNodes = entry.getElementsByTagName("ant");
                if (antNodes.getLength() > 0) {
                    ant = ((Element)antNodes.item(0)).getTextContent();
                }

                String gloss1 = "";
                NodeList gloss1Nodes = entry.getElementsByTagName("gloss");
                if (gloss1Nodes.getLength() > 0) {
                    gloss1 = ((Element)gloss1Nodes.item(0)).getTextContent();
                }

                String gloss2 = "";
                NodeList gloss2Nodes = entry.getElementsByTagName("gloss");
                if (gloss2Nodes.getLength() > 1) {
                    gloss2 = ((Element)gloss2Nodes.item(1)).getTextContent();
                }

                String pos1 = "";
                NodeList pos1Nodes = entry.getElementsByTagName("pos");
                if (pos1Nodes.getLength() > 0) {
                    pos1 = ((Element)pos1Nodes.item(0)).getTextContent();
                }

                String pos2 = "";
                NodeList pos2Nodes = entry.getElementsByTagName("pos");
                if (pos2Nodes.getLength() > 1) {
                    pos2 = ((Element)pos2Nodes.item(1)).getTextContent();
                }

                String exText = "";
                NodeList exTextNodes = entry.getElementsByTagName("ex_text");
                if (exTextNodes.getLength() > 0) {
                    exText = ((Element)exTextNodes.item(0)).getTextContent();
                }

                String exSentJpn = "";
                NodeList exSentJpnNodes = entry.getElementsByTagName("ex_sent");
                if (exSentJpnNodes.getLength() > 0) {
                    exSentJpn = ((Element)exSentJpnNodes.item(0)).getTextContent();
                }

                String exSentVi = "";
                NodeList exSentViNodes = entry.getElementsByTagName("ex_sent");
                if (exSentViNodes.getLength() > 1) {
                    exSentVi = ((Element)exSentViNodes.item(1)).getTextContent();
                }
//            result +=
                System.out.println("Entry " + (i+1));
                System.out.println("Kanji: " + keb);
                System.out.println("Hiragana 1: " + reb1);
                System.out.println("Hiragana 2: " + reb2);
                System.out.println("Miscellaneous info: " + reInf);
                System.out.println("Antonym: " + ant);
                System.out.println("Gloss 1: " + gloss1);
                System.out.println("Gloss 2: " + gloss2);
                System.out.println("Part of speech 1: " + pos1);
                System.out.println("Part of speech 2: " + pos2);
                System.out.println("Example text: " + exText);
                System.out.println("Example sentence (Japanese): " + exSentJpn);
                System.out.println("Example sentence (Vietnamese): " + exSentVi);
                System.out.println();
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }
}