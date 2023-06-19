package com.capstone.project.service;

import com.capstone.project.model.StudySet;

import java.util.List;

public interface StudySetService {

    List<StudySet> getAllStudySets();

    StudySet createStudySet( StudySet studySet);

    StudySet getStudySetById ( int id);

    StudySet updateStudySet( int id, StudySet studySetDetails);

    Boolean deleteStudySet( int id);

    Boolean deleteHardStudySet(int id);

//    ResponseEntity<Map<String, Object>> getAllEmployeesFilterAndPagination(String id, int page, int size);
}
