package com.capstone.project.service;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class KanjivgFinder {
    public static String getSvgFile(char kanji) {
        int kcode = String.valueOf(kanji).codePointAt(0);
        String hex = Integer.toHexString(kcode);
        int zeros = 5 - hex.length();
        hex = "0".repeat(zeros) + hex; // Get Unicode code point as hexadecimal string
        String fileName = "src/main/resources/kanji/" + hex + "-animated.svg";
//        System.out.println(fileName);
//        String unicodeHex = Integer.toHexString((int)kanji);
//        String fileName = unicodeHex.toUpperCase() + ".svg"; // Kanjivg file name is hex code point + ".svg"

        // Now you can use this file name to locate the SVG file in the Kanjivg collection.
        // The exact method for doing so will depend on your specific project and file system setup.
        File svgFile = new File(fileName);
//        System.out.println(svgFile.getAbsolutePath());
        if (!svgFile.exists()) {
            return "SVG file not found.";
        }

        try {
            String svgData = new String(Files.readAllBytes(Paths.get(svgFile.getAbsolutePath())));
            return svgData;
        } catch (IOException e) {
            return "Error reading SVG file: " + e.getMessage();
        }
    }
}
