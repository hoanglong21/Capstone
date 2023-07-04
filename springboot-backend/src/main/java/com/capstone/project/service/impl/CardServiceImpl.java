package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Card;
import com.capstone.project.model.Content;
import com.capstone.project.repository.CardRepository;
import com.capstone.project.repository.ContentRepository;
import com.capstone.project.repository.StudySetRepository;
import com.capstone.project.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardServiceImpl implements CardService {

    private final CardRepository cardRepository;

    private final ContentRepository contentRepository;

    @Autowired
    public CardServiceImpl(CardRepository cardRepository, ContentRepository contentRepository) {
        this.cardRepository = cardRepository;
        this.contentRepository = contentRepository;
    }

    @Override
    public List<Card> getAllCards() {
        return cardRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @Override
    public List<Card> getAllByStudySetId(int id) {
        return cardRepository.getCardByStudySetId(id);
    }

    @Override
    public Card createCard(Card card) {
        return cardRepository.save(card);
    }

    @Override
    public Card getCardById(int id) throws ResourceNotFroundException {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Card not exist with id: " + id));
        return card;
    }

    @Override
    public Card updateCard(int id, Card cardDetails) throws ResourceNotFroundException {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Card not exist with id: " + id));
        card.setPicture(cardDetails.getPicture());
        card.setAudio(cardDetails.getAudio());

        Card updateCard = cardRepository.save(card);
        return updateCard;
    }

    @Override
    public Boolean deleteCard(int id) throws ResourceNotFroundException {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Card not exist with id: " + id));
        for (Content content: contentRepository.getContentByCardId(card.getId())) {
            contentRepository.delete(content);
        }
        cardRepository.delete(card);
        return true;
    }

    @Override
    public Boolean checkBlank(int id) throws ResourceNotFroundException {
        Card card = cardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Card not exist with id: " + id));
        int count = 0;
        if ((card.getAudio() == null||card.getAudio().equals(""))  && (card.getPicture() == null||card.getPicture().equals(""))) {
            List<Content> contents = contentRepository.getContentByCardId(card.getId());
            for (Content content : contents) {
                if (content.getContent()==null||content.getContent().equals("")) {
                    count += 1;
                }
            }
            if(count==contents.size()) {
                return true;
            }
        }
        return false;
    }

}
