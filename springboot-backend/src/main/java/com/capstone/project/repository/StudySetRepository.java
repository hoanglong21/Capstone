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


}
