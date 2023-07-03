package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class TranslateService {

    public String translate(String text, String to) throws Exception {
        String preUrl = "https://clients5.google.com/translate_a/single?dj=1&dt=t&dt=sp&dt=ld&dt=bd&client=dict-chrome-ex&sl=auto&tl=" + to +"&q=" +
                URLEncoder.encode(text, StandardCharsets.UTF_8.toString());;
        URL url = new URL(preUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        int responseCode = connection.getResponseCode();

        if (responseCode == HttpURLConnection.HTTP_OK) {
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // Parse the JSON response
            JsonParser parser = new JsonParser();
            JsonObject jsonResponse = parser.parse(response.toString()).getAsJsonObject();

            // Extract the "trans" value
            JsonArray sentences = jsonResponse.getAsJsonArray("sentences");
            if (sentences.size() > 0) {
                JsonObject firstSentence = sentences.get(0).getAsJsonObject();
                String translation = firstSentence.get("trans").getAsString();
                return translation;
            } else {
                return "No translation found.";
            }
        } else {
            return "No translation found.";
        }
    }
}