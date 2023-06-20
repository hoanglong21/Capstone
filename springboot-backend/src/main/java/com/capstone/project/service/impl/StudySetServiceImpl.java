package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Card;
import com.capstone.project.model.Content;
import com.capstone.project.model.StudySet;
import com.capstone.project.model.User;
import com.capstone.project.repository.CardRepository;
import com.capstone.project.repository.ContentRepository;
import com.capstone.project.repository.StudySetRepository;
import com.capstone.project.repository.UserRepository;
import com.capstone.project.service.CardService;
import com.capstone.project.service.StudySetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class StudySetServiceImpl implements StudySetService {

    private final StudySetRepository studySetRepository;
    private final CardRepository cardRepository;
    private final ContentRepository contentRepository;
    private final CardService cardService;

    private final UserRepository userRepository;
    @Autowired
    public StudySetServiceImpl(StudySetRepository studySetRepository, CardRepository cardRepository, ContentRepository contentRepository, CardService cardService, UserRepository userRepository) {
        this.studySetRepository = studySetRepository;
        this.cardRepository = cardRepository;
        this.contentRepository = contentRepository;
        this.cardService = cardService;
        this.userRepository = userRepository;
    }

    @Override
    public List<StudySet> getAllStudySets() {
        return studySetRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @Override
    public StudySet createStudySet(StudySet studySet) {
        return studySetRepository.save(studySet);
    }

    @Override
    public StudySet getStudySetById(int id) {
        StudySet studySet = null;
        try {
            studySet = studySetRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Studyset not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        return studySet;
    }

    @Override
    public StudySet updateStudySet(int id, StudySet studySetDetails) {
        StudySet studySet = null;
        try {
            studySet = studySetRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Studyset not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        studySet.setTitle(studySetDetails.getTitle());
        studySet.setDescription(studySetDetails.getDescription());
        studySet.set_deleted(studySetDetails.is_deleted());
        studySet.set_public(studySetDetails.is_public());
        studySet.setDeleted_date(studySetDetails.getDeleted_date());

        StudySet updateStudySet = studySetRepository.save(studySet);
        return updateStudySet;
    }

    @Override
    public Boolean deleteStudySet(int id) {
        StudySet studySet;
        try {
            studySet = studySetRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Studyset not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
            return false;
        }
        studySet.set_deleted(true);
        studySet.setDeleted_date(new Date());
        studySetRepository.save(studySet);
        return true;
    }

    @Override
    public Boolean deleteHardStudySet(int id) {
        StudySet studySet;
        try {
            studySet = studySetRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Studyset not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
            return false;
        }

        // delete all the cards and contents associated with the study set
        for (Card card : cardRepository.getCardByStudySetId(studySet.getId())) {
            for (Content content : contentRepository.getContentByCardId(card.getId())) {
                contentRepository.delete(content);
            }
            cardRepository.delete(card);
        }
        studySetRepository.delete(studySet);
        return true;
    }

    @Override
    public List<Integer> checkBlankCard(int id) {
        StudySet studySet = null;
        try {
            studySet = studySetRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Studyset not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        List<Integer> listCardIds = new ArrayList<>();
        for (Card card : cardRepository.getCardByStudySetId(studySet.getId())) {
            if(cardService.checkBlank(card.getId())) {
                listCardIds.add(card.getId());
            }
        }
        return listCardIds;
    }

    @Override
    public List<StudySet> getAllStudySetByUser(String username) {
        User user = null;
        try {
            user = userRepository.findUserByUsername(username);
            if (user == null) {
                throw new ResourceNotFroundException("Studyset not exist with username:" + username);
            }
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        List<StudySet> studySets = studySetRepository.findStudySetByAuthor_id(user.getId());
        return  studySets;
    }
}
