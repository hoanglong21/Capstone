package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Field;
import com.capstone.project.repository.FieldRepository;
import com.capstone.project.service.FieldService;
import org.springframework.stereotype.Service;

@Service
public class FieldServiceImpl implements FieldService {

    private final FieldRepository fieldRepository;

    public FieldServiceImpl(FieldRepository fieldRepository) {
        this.fieldRepository = fieldRepository;
    }

    @Override
    public Field getFieldById(int id) {
        Field field = null;
        try {
            field = fieldRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Field not exist with id: " + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        return field;
    }
}