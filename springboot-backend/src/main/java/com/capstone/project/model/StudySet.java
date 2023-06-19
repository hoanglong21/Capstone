package com.capstone.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "studyset")
public class StudySet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User user;

    private String title;

    private String description;

    private boolean is_deleted; // delete 1 or not 0

    private boolean is_public; // public 1 or private 0

//    private boolean is_draft; // draft 1 or not 0

    @ManyToOne
    @JoinColumn(name = "type_id", nullable = false)
    private StudySetType studySetType;

    @ManyToMany(mappedBy = "studySets")
    Set<Class> classes;

    @Column
    @Temporal(TemporalType.DATE)
    private Date deleted_date;
}
