package com.capstone.project.repository;

import com.capstone.project.model.Class;
import com.capstone.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClassRepository extends JpaRepository<Class,Integer> {
//    Class findByClassCode(String Code);
//    Class findClassById(int id);
    Class findByClasscode(String Code);

    Class findClassById(int id);

    @Query(value = " SELECT id FROM class WHERE is_deleted = true AND deleted_date <= DATE_SUB(NOW(), INTERVAL 30 DAY) ", nativeQuery = true)
    List<Integer> findListIdToDelete();
}
