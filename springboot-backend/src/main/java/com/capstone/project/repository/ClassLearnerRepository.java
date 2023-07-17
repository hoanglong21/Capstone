package com.capstone.project.repository;

import com.capstone.project.model.Class;
import com.capstone.project.model.ClassLearner;
import com.capstone.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassLearnerRepository extends JpaRepository<ClassLearner,Integer> {
    ClassLearner findByUserAndClassroom(User user, Class classroom);
}