package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Class;
import com.capstone.project.repository.ClassRepository;
import com.capstone.project.repository.UserRepository;
import com.capstone.project.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ClassServiceImpl implements ClassService {

    private final ClassRepository classRepository;
    private final UserRepository userRepository;

    @Autowired
    public ClassServiceImpl(ClassRepository classRepository, UserRepository userRepository) {
        this.classRepository = classRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Class> getAllClass() {
        return classRepository.findAll();
    }

    @Override
    public Class getClassroomById(int id) {
        Class classroom =null;
        try {
            classroom = classRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Class not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        return classroom;
    }

    @Override
    public Class createClassroom(Class classroom) {
        return classRepository.save(classroom);
    }

    @Override
    public Class updateClassroom(Class classrooms, int id) {
        Class classroom = null;
        try {
            classroom = classRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Class not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        classroom.setClass_name(classrooms.getClass_name());
        classroom.setDescription(classrooms.getDescription());
        classroom.setUser(userRepository.findUserById(classrooms.getUser().getId()));
        return classRepository.save(classroom);
    }

    @Override
    public String deleteClass(int id) {
        if (!classRepository.existsById(id)) {
            new ResourceNotFroundException("Could not find class with id: " + id);
        }
        classRepository.deleteById(id);
        return "Class has been deleted success";
    }
    }

