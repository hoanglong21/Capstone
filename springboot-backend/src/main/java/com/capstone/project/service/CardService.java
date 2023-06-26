package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Card;

import java.util.List;

public interface CardService {
    List<Card> getAllCards();

    List<Card> getAllByStudySetId(int id);

    Card createCard(Card card);

    Card getCardById(int id) throws ResourceNotFroundException;

    Card updateCard (int id, Card cardDetails) throws ResourceNotFroundException;

    Boolean deleteCard (int id) throws ResourceNotFroundException;

    Boolean checkBlank(int id) throws ResourceNotFroundException;

}
