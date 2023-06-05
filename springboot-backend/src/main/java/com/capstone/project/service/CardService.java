package com.capstone.project.service;

import com.capstone.project.model.Card;

import java.util.List;

public interface CardService {
    List<Card> getAllCards();

    Card createCard( Card card);

    Card getCardById( int id);

    Card updateCard ( int id, Card cardDetails);

    Boolean deleteCard ( int id);
}
