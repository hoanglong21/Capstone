package com.capstone.project.service.impl;

import com.capstone.project.dto.StudySetResponse;
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
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
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

    @PersistenceContext
    private EntityManager em;
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
    public StudySet getStudySetById(int id) throws ResourceNotFroundException {
        StudySet studySet = studySetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Studyset not exist with id: " + id));
        return studySet;
    }

    @Override
    public StudySet updateStudySet(int id, StudySet studySetDetails) throws ResourceNotFroundException {
        StudySet studySet = studySetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Studyset not exist with id: " + id));
        studySet.setTitle(studySetDetails.getTitle());
        studySet.setDescription(studySetDetails.getDescription());
        studySet.set_deleted(studySetDetails.is_deleted());
        studySet.set_public(studySetDetails.is_public());
        studySet.setDeleted_date(studySetDetails.getDeleted_date());

        StudySet updateStudySet = studySetRepository.save(studySet);
        return updateStudySet;
    }

    @Override
    public Boolean deleteStudySet(int id) throws ResourceNotFroundException {
        StudySet studySet = studySetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Studyset not exist with id: " + id));
        studySet.set_deleted(true);
        studySet.setDeleted_date(new Date());
        studySetRepository.save(studySet);
        return true;
    }

    @Override
    public Boolean deleteHardStudySet(int id) throws ResourceNotFroundException {
        StudySet studySet = studySetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Studyset not exist with id: " + id));

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
    public List<Integer> checkBlankCard(int id) throws ResourceNotFroundException {
        StudySet studySet = studySetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Studyset not exist with id: " + id));
        List<Integer> listCardIds = new ArrayList<>();
        for (Card card : cardRepository.getCardByStudySetId(studySet.getId())) {
            if(cardService.checkBlank(card.getId())) {
                listCardIds.add(card.getId());
            }
        }
        return listCardIds;
    }

    @Override
    public List<StudySet> getAllStudySetByUser(String username) throws ResourceNotFroundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new ResourceNotFroundException("Studyset not exist with author: " + username);
        }
        List<StudySet> studySets = studySetRepository.findStudySetByAuthor_id(user.getId());
        return  studySets;
    }

    @Override
    public List<StudySetResponse> getCustomList(Boolean isDeleted, Boolean isPublic, Boolean isDraft) {
        String query = "SELECT s.id, s.title, s.description, s.is_deleted, s.is_public, s.is_draft, s.type_id, s.author_id, s.deleted_date, " +
                "(SELECT COUNT(*) FROM capstone.card WHERE studyset_id = s.id) AS count FROM studyset s WHERE 1=1";
        if (isPublic != null) {
            query += " AND s.is_public = :isPublic";
        }

        if (isDraft != null) {
            query += " AND s.is_draft = :isDraft";
        }

        if (isDeleted != null) {
            query += " AND s.is_deleted = :isDeleted";
        }

        Query q = em.createNativeQuery(query, "StudySetResponseCustomListMapping");
        if (isPublic != null) {
            q.setParameter("isPublic", isPublic);
        }

        if (isDraft != null) {
            q.setParameter("isDraft", isDraft);
        }

        if (isDeleted != null) {
            q.setParameter("isDeleted", isDeleted);
        }

        return q.getResultList();
    }

    @Override
    public List<StudySetResponse> getFilterList(Boolean isDeleted, Boolean isPublic, Boolean isDraft) {
        return null;
    }
}
