//package com.capstone.project.service;
//
//import org.springframework.stereotype.Service;
//import org.w3c.dom.Document;
//import org.w3c.dom.Element;
//import org.w3c.dom.NodeList;
//
//import javax.xml.parsers.DocumentBuilder;
//import javax.xml.parsers.DocumentBuilderFactory;
//import java.io.File;
//
//@Service
//public class VocabularyParse2 {
//    public String getAllVocabulary(){
//        try{
//            File inputFile = new File("src/main/resources/OmohaDictionary.xml");
//            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
//            dbf.setValidating(false);
//            dbf.setFeature("http://xml.org/sax/features/namespaces", false); // optional
//            dbf.setFeature("http://xml.org/sax/features/validation", false); // optional
//            dbf.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
////            DocumentBuilder dBuilder = dbf.newDocumentBuilder();
////            Document doc = dBuilder.parse(inputFile);
////            doc.getDocumentElement().normalize();
//
//            String result = "";
//            NodeList entries = doc.getElementsByTagName("entry");
//            for (int i = 0; i < entries.getLength(); i++) {
//                Element entry = (Element)entries.item(i);
//                String keb = ((Element)entry.getElementsByTagName("keb").item(0)).getTextContent();
//                String reb1 = ((Element)entry.getElementsByTagName("reb").item(0)).getTextContent();
//                String reb2 = ((Element)entry.getElementsByTagName("reb").item(1)).getTextContent();
//                String reInf = ((Element)entry.getElementsByTagName("re_inf").item(0)).getTextContent();
//                String ant = ((Element)entry.getElementsByTagName("ant").item(0)).getTextContent();
//                String gloss1 = ((Element)entry.getElementsByTagName("gloss").item(0)).getTextContent();
//                String gloss2 = ((Element)entry.getElementsByTagName("gloss").item(1)).getTextContent();
//                String pos1 = ((Element)entry.getElementsByTagName("pos").item(0)).getTextContent();
//                String pos2 = ((Element)entry.getElementsByTagName("pos").item(1)).getTextContent();
//                String exText = ((Element)entry.getElementsByTagName("ex_text").item(0)).getTextContent();
//                String exSentJpn = ((Element)entry.getElementsByTagName("ex_sent").item(0)).getTextContent();
//                String exSentVi = ((Element)entry.getElementsByTagName("ex_sent").item(1)).getTextContent();
////            result +=
//                System.out.println("Entry " + (i+1));
//                System.out.println("Kanji: " + keb);
//                System.out.println("Hiragana 1: " + reb1);
//                System.out.println("Hiragana 2: " + reb2);
//                System.out.println("Miscellaneous info: " + reInf);
//                System.out.println("Antonym: " + ant);
//                System.out.println("Gloss 1: " + gloss1);
//                System.out.println("Gloss 2: " + gloss2);
//                System.out.println("Part of speech 1: " + pos1);
//                System.out.println("Part of speech 2: " + pos2);
//                System.out.println("Example text: " + exText);
//                System.out.println("Example sentence (Japanese): " + exSentJpn);
//                System.out.println("Example sentence (Vietnamese): " + exSentVi);
//                System.out.println();
//            }
//            return result;
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }
//
//    }
//}