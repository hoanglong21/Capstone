package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.StudySet;
import com.capstone.project.repository.StudySetRepository;
import com.capstone.project.repository.StudySetTypeRepository;
import com.capstone.project.repository.UserRepository;
import com.capstone.project.service.StudySetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudySetServiceImpl implements StudySetService {

    private final StudySetRepository studySetRepository;


    @Autowired
    public StudySetServiceImpl(StudySetRepository studySetRepository) {
        this.studySetRepository = studySetRepository;
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
    public StudySet getStudySetById(int id) {
        StudySet studySet = null;
        try {
            studySet = studySetRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Studyset not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        return studySet;
    }

    @Override
    public StudySet updateStudySet(int id, StudySet studySetDetails) {
        StudySet studySet = null;
        try {
            studySet = studySetRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Studyset not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        studySet.setTitle(studySetDetails.getTitle());
        studySet.setDescription(studySetDetails.getDescription());
        studySet.setDeleted(studySetDetails.isDeleted());
        studySet.setPublic(studySetDetails.isPublic());

        StudySet updateStudySet = studySetRepository.save(studySet);
        return updateStudySet;
    }

    @Override
    public Boolean deleteStudySet(int id) {
        StudySet studySet;
        try {
            studySet = studySetRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Studyset not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
            return false;
        }
        studySetRepository.delete(studySet);
        return true;
    }
}
