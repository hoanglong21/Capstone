package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Card;
import com.capstone.project.repository.CardRepository;
import com.capstone.project.repository.StudySetRepository;
import com.capstone.project.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;
    private final StudySetRepository studySetRepository;

    @Autowired
    public CardServiceImpl(CardRepository cardRepository, StudySetRepository studySetRepository) {
        this.cardRepository = cardRepository;
        this.studySetRepository = studySetRepository;
    }

    @Override
    public List<Card> getAllCards() {
        return cardRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @Override
    public Card createCard(Card card) {
        return cardRepository.save(card);
    }

    @Override
    public Card getCardById(int id) {
        Card card = null;
        try {
            card = cardRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Card not exist with id: " + id));
        }catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        return card;
    }

    @Override
    public Card updateCard(int id, Card cardDetails) {
        Card card = null;
        try {
            card = cardRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Card not exist with id: " + id));
        }catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }

//        card.setTerm(cardDetails.getTerm());
//        card.setDefinition(cardDetails.getDefinition());
//        card.setNote(cardDetails.getNote());
        card.setStudySet(studySetRepository.findStudySetById(cardDetails.getStudySet().getId()));

        Card updateCard = cardRepository.save(card);
        return updateCard;
    }

    @Override
    public Boolean deleteCard(int id) {
        Card card;
        try {
            card = cardRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Card not exist with id: " + id));
        }catch (ResourceNotFroundException e) {
            e.printStackTrace();
            return false;
        }
        cardRepository.delete(card);
        return true;
    }
}
