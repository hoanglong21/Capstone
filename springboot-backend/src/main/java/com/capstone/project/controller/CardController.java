package com.capstone.project.controller;

import com.capstone.project.model.Card;
import com.capstone.project.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("/cards")
    public List<Card> getAllCards() {
        return cardService.getAllCards();
    }

    @PostMapping("/cards")
    public Card createCard(@RequestBody Card card) {
        return cardService.createCard(card);
    }

    /*
        // add example
    {
        "term": "HL",
            "definition": "Hoang Long",
            "note": "it's my name",
            "studySet": {
                "id": "2"
            }
    }
    */

    @GetMapping("/cards/{id}")
    public ResponseEntity<Card> getCardById(@PathVariable int id) {
        Card card = cardService.getCardById(id);
        return ResponseEntity.ok(card);
    }

    @PostMapping("/cards/{id}")
    public ResponseEntity<Card> updateCard(@PathVariable int id, @RequestBody Card cardDetails) {
        Card updateCard = cardService.updateCard(id, cardDetails);
        return ResponseEntity.ok(updateCard);
    }

    @DeleteMapping("/cards/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCard(@PathVariable int id) {
        boolean deleted = cardService.deleteCard(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
}
