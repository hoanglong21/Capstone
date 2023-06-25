package com.capstone.project.controller;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Card;
import com.capstone.project.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("/cards")
    public ResponseEntity<?> getAllCards() {
        return ResponseEntity.ok(cardService.getAllCards());
    }

    @GetMapping("/cardbystudysetid")
    public ResponseEntity<?> getAllByStudySetId(@RequestParam int id) {
        return ResponseEntity.ok(cardService.getAllByStudySetId(id));
    }

    @PostMapping("/cards")
    public ResponseEntity<?> createCard(@RequestBody Card card) {
        return ResponseEntity.ok(cardService.createCard(card));
    }

    @GetMapping("/cards/{id}")
    public ResponseEntity<?> getCardById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(cardService.getCardById(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/cards/{id}")
    public ResponseEntity<?> updateCard(@PathVariable int id, @RequestBody Card cardDetails) {
        try {
            return ResponseEntity.ok(cardService.updateCard(id, cardDetails));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/cards/{id}")
    public ResponseEntity<?> deleteCard(@PathVariable int id) {
        try {
            return ResponseEntity.ok(cardService.deleteCard(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
