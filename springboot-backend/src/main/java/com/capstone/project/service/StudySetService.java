package com.capstone.project.service;

import com.capstone.project.dto.StudySetResponse;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.StudySet;

import java.util.List;

public interface StudySetService {

    List<StudySet> getAllStudySets();

    StudySet createStudySet( StudySet studySet);

    StudySet getStudySetById ( int id) throws ResourceNotFroundException;

    StudySet updateStudySet( int id, StudySet studySetDetails) throws ResourceNotFroundException;

    Boolean deleteStudySet( int id) throws ResourceNotFroundException;

    Boolean deleteHardStudySet(int id) throws ResourceNotFroundException;

//    ResponseEntity<Map<String, Object>> getAllEmployeesFilterAndPagination(String id, int page, int size);

    List<Integer> checkBlankCard(int id) throws ResourceNotFroundException;

    List<StudySet> getAllStudySetByUser(String username) throws ResourceNotFroundException;

    List<StudySetResponse> getCustomList(Boolean isDeleted, Boolean isPublic, Boolean isDraft); // old

    List<StudySetResponse> getFilterList(Boolean isDeleted, Boolean isPublic, Boolean isDraft);
}
