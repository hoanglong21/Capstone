package com.capstone.project.repository;

import com.capstone.project.model.CommentType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentTypeRepository extends JpaRepository<CommentType,Integer> {
}
