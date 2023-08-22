package com.capstone.project.repository;

import com.capstone.project.model.Card;
import com.capstone.project.model.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Integer> {
    List<History> getHistoriesByStudySetId(int id);

    List<History> getHistoriesByClassroomId(int id);
}
