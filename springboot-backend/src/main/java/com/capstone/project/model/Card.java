package com.capstone.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

//    private String term;
//
//    private String definition;

    private String picture;

    private String audio;

    @ManyToOne
    @JoinColumn(name = "studyset_id", nullable = false)
    private StudySet studySet;
}
