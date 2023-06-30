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
import com.capstone.project.service.UserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StudySetServiceImpl implements StudySetService {

    private final StudySetRepository studySetRepository;
    private final CardRepository cardRepository;
    private final ContentRepository contentRepository;
    private final CardService cardService;
    private final UserService userService;

    @PersistenceContext
    private EntityManager em;
    private final UserRepository userRepository;
    @Autowired
    public StudySetServiceImpl(StudySetRepository studySetRepository, CardRepository cardRepository, ContentRepository contentRepository, CardService cardService, UserRepository userRepository, UserService userService) {
        this.studySetRepository = studySetRepository;
        this.cardRepository = cardRepository;
        this.contentRepository = contentRepository;
        this.cardService = cardService;
        this.userRepository = userRepository;
        this.userService = userService;
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
        studySet.set_draft(studySetDetails.is_draft());
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
        return studySets;
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
    public Map<String, Object> getFilterList(Boolean isDeleted, Boolean isPublic, Boolean isDraft, String search, String author, String from, String to, int page, int size) throws ResourceNotFroundException {
        int offset = (page - 1) * size;

        String query = "SELECT s.id, s.title, s.description, s.is_deleted, s.is_public, s.is_draft, s.type_id, s.author_id, s.deleted_date, " +
                "(SELECT COUNT(*) FROM capstone.card WHERE studyset_id = s.id) AS count, " +
                "(SELECT username FROM capstone.user WHERE id = s.author_id) AS author FROM studyset s WHERE 1=1 ";
        Boolean conditionFirst = false;
        Map<String, Object> parameters = new HashMap<>();

        if (isDeleted != null && isDeleted) {
            query += " AND s.is_deleted = :isDeleted";
            parameters.put("isDeleted", true);
            conditionFirst = true;
        }

        if (isPublic != null && isPublic) {
            if (conditionFirst) {
                query += " OR s.is_public = :isPublic";
            } else {
                query += " AND s.is_public = :isPublic";
                conditionFirst = true;
            }
            parameters.put("isPublic", true);
        }

        if (isDraft != null && isDraft) {
            if (conditionFirst) {
                query += " OR s.is_draft = :isDraft";
            } else {
                query += " AND s.is_draft = :isDraft";
            }
            parameters.put("isDraft", true);
        }

        if (search != null && !search.isEmpty()) {
            query += " AND (s.title LIKE :search OR s.description LIKE :search)";
            parameters.put("search", "%" + search + "%");
        }

        if ((isDeleted == null || isDeleted)) {
            if (from != null) {
                query += " AND s.deleted_date >= :from";
                parameters.put("from", from);
            }
            if (to != null) {
                query += " AND s.deleted_date <= :to";
                parameters.put("to", to);
            }
        }

        if (author != null && !author.isEmpty()) {
            query += " AND s.author_id = :authorId";
            User user = userService.getUserByUsername(author);
            parameters.put("authorId", user.getId());
        }

        Query q = em.createNativeQuery(query, "StudySetResponseCustomListMapping");
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            q.setParameter(entry.getKey(), entry.getValue());
        }

        int totalItems = q.getResultList().size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        q.setFirstResult(offset);
        q.setMaxResults(size);

        List<StudySetResponse> resultList = q.getResultList();

        Map<String, Object> response = new HashMap<>();
        response.put("list", resultList);
        response.put("totalPages", totalPages);
        response.put("totalItems", totalItems);

        return response;
    }
}
