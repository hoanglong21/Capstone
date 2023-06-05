package com.capstone.project.repository;

import com.capstone.project.model.StudySetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudysetTypeRepository extends JpaRepository<StudySetType, Integer> {
}
