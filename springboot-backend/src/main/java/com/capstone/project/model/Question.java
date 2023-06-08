package com.capstone.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String question;

    @ManyToOne
    @JoinColumn(name = "type_id", nullable = false)
    private QuestionType questionType;

    private int num_choice;

    @ManyToOne
    @JoinColumn(name = "test_id", nullable = false)
    private Test test;
}
