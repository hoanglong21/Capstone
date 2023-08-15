package com.capstone.project.repository;

import com.capstone.project.model.TestLearner;
import com.capstone.project.model.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestResultRepository extends JpaRepository<TestResult, Integer> {

    List<TestResult> getTestResultBytestLearnerId(int id);
    List<TestResult> getTestResultByQuestionId(int id);
}
