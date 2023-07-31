package com.capstone.project.repository;

import com.capstone.project.dto.StudySetResponse;
import com.capstone.project.model.StudySet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudySetRepository extends JpaRepository<StudySet, Integer> {

    @Query(value = "SELECT * FROM studyset WHERE author_id = :id", nativeQuery = true)
    List<StudySet> findStudySetByAuthor_id(int id);

    @Query(value = "SELECT COUNT(c.*) FROM progress p RIGHT JOIN card c ON p.card_id = c.id " +
            " WHERE COALESCE(p.user_id, :userId) = :userId AND COALESCE(p.status, 'not studied') IN (:status) " +
            " AND c.studyset_id = :studySetId AND (:star = false OR COALESCE(p.star, false) = :star) ", nativeQuery = true)
    Integer countCardInSetWithCondition(int studySetId, int userId, String status, boolean star);

}
