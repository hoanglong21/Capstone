package com.capstone.project.service;


import com.atilika.kuromoji.ipadic.Token;
import com.atilika.kuromoji.ipadic.Tokenizer;
import com.capstone.project.model.VocabularyTokenizer;
import io.github.cdimascio.dotenv.Dotenv;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.http.HttpClient;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class DetectionService {

    public List<VocabularyTokenizer> detectVocabulary(String text) {
        // Create a tokenizer instance
        Tokenizer tokenizer = new Tokenizer.Builder().build();

        // Tokenize the text
        Iterable<Token> tokens = tokenizer.tokenize(text);

        // Iterate through the tokens and print the details
        List<VocabularyTokenizer> response = new ArrayList<>();
        for (Token token : tokens) {
            VocabularyTokenizer vocabularyTokenizer = new VocabularyTokenizer();
            vocabularyTokenizer.setWord(token.getSurface());

            List<String> partOfSpeech = new ArrayList<>();
            partOfSpeech.add(token.getPartOfSpeechLevel1());
            partOfSpeech.add(token.getPartOfSpeechLevel2());
            partOfSpeech.add(token.getPartOfSpeechLevel3());
            partOfSpeech.add(token.getPartOfSpeechLevel4());
            partOfSpeech.removeAll(Collections.singleton("*"));
            vocabularyTokenizer.setPartOfSpeech(partOfSpeech);

            vocabularyTokenizer.setDictionaryForm(token.getBaseForm());

            response.add(vocabularyTokenizer);
        }
        return response;
    }

    public String detectGrammar(String text, String to) throws Exception {
        Dotenv dotenv = Dotenv.load();
        String url = "https://api.openai.com/v1/chat/completions";
        HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();

        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Authorization", "Bearer " + dotenv.get("OPENAI_API_KEY"));

        JSONObject data = new JSONObject();
        data.put("model", "gpt-3.5-turbo");
//        data.put("max_tokens", 100);
        data.put("temperature", 1.0);

        // Create a new JSONArray for messages
        JSONArray messages = new JSONArray();

        // Create a new JSONObject for the user message
        JSONObject userMessage = new JSONObject();
        userMessage.put("role", "user");
        userMessage.put("content", "Please perform a grammar check on the following Japanese input, " +
                "translate the following Japanese text into English and provide a detailed analysis of the grammar used:\n" +
                "Japanese Text: [" + text + "])");

        // Add the user message to the messages array
        messages.put(userMessage);
        // Add the messages array to the data object
        data.put("messages", messages);

        con.setDoOutput(true);
        con.getOutputStream().write(data.toString().getBytes());

        String output = new BufferedReader(new InputStreamReader(con.getInputStream())).lines()
                .reduce((a, b) -> a + b).get();
        String resultInEnglish = new JSONObject(output).getJSONArray("choices").getJSONObject(0).getJSONObject("message").getString("content");
        if(!to.toLowerCase().equals("english")) {
            return ConvertDetectGrammar(resultInEnglish);
        } else {
            return resultInEnglish;
        }
    }

    private  String ConvertDetectGrammar(String text) throws Exception {
        Dotenv dotenv = Dotenv.load();
        String url = "https://api.openai.com/v1/chat/completions";
        HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();

        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Authorization", "Bearer " + dotenv.get("OPENAI_API_KEY"));

        JSONObject data = new JSONObject();
        data.put("model", "gpt-3.5-turbo");
//        data.put("max_tokens", 100);
        data.put("temperature", 1.0);

        // Create a new JSONArray for messages
        JSONArray messages = new JSONArray();

        // Create a new JSONObject for the user message
        JSONObject userMessage = new JSONObject();
        userMessage.put("role", "user");
        userMessage.put("content", " \"" + text + "\"\n translate everything into Vietnamese except Japanese text no more other words");

        // Add the user message to the messages array
        messages.put(userMessage);
        // Add the messages array to the data object
        data.put("messages", messages);

        con.setDoOutput(true);
        con.getOutputStream().write(data.toString().getBytes());

        String output = new BufferedReader(new InputStreamReader(con.getInputStream())).lines()
                .reduce((a, b) -> a + b).get();

        return new JSONObject(output).getJSONArray("choices").getJSONObject(0).getJSONObject("message").getString("content");
    }

}
