package com.capstone.project.service;

import com.capstone.project.model.Field;

import java.util.List;

public interface FieldService {

    Field getFieldById(int id);

    List<Field> getAll();
}
