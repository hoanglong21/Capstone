package com.capstone.project.repository;

import com.capstone.project.model.Card;
import com.capstone.project.model.StudySet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Integer> {
    List<Card> getCardByStudySetId(int id);

    @Query(value = "SELECT c.* FROM progress p " +
            "RIGHT JOIN card c ON p.card_id = c.id " +
            "WHERE COALESCE(p.user_id, :userId) = :userId AND COALESCE(p.status, 'not studied') IN :statuses AND c.studyset_id = :studysetId", nativeQuery = true)
    List<Card> findCardByProgress(@Param("userId") int userId, @Param("statuses") String[] statuses, @Param("studysetId") int studysetId);

    @Query(value = "SELECT c.* FROM progress p RIGHT JOIN card c ON p.card_id = c.id " +
            " WHERE COALESCE(p.user_id, :userId) = :userId AND COALESCE(p.status, 'not studied') IN :status " +
            " AND c.studyset_id = :studySetId AND (:star = false OR COALESCE(p.star, false) = :star) ", nativeQuery = true)
    List<Card> getCardInSetWithCondition(int studySetId, int userId, String[] status, boolean star);
}
