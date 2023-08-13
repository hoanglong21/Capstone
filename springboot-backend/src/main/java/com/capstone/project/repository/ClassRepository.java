package com.capstone.project.repository;

import com.capstone.project.model.Class;
import com.capstone.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepository extends JpaRepository<Class,Integer> {
//    Class findByClassCode(String Code);
//    Class findClassById(int id);
    Class findByClasscode(String Code);

    Class findClassById(int id);
}
