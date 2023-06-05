package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.StudySetType;
import com.capstone.project.repository.StudySetTypeRepository;
import com.capstone.project.service.StudySetTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudySetTypeServiceImpl implements StudySetTypeService {

    private final StudySetTypeRepository studysetTypeRepository;

    @Autowired
    public StudySetTypeServiceImpl(StudySetTypeRepository studysetTypeRepository) {
        this.studysetTypeRepository = studysetTypeRepository;
    }

    @Override
    public StudySetType getStudySetTypeById(int id) {
        StudySetType studySetType= null;
        try {
            studySetType = studysetTypeRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("StudysetType not exist with id: " + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        return studySetType;
    }
}
