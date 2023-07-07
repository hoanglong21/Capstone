package com.capstone.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "class")
public class Class {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User user;

    @Column
    @Temporal(TemporalType.DATE)
    private Date created_date;

    private String class_name;

    @Column(unique = true)
    private String classcode;

    private String description;

    @ManyToMany
    @JoinTable(
            name = "class_studyset",
            joinColumns = @JoinColumn(name = "class_id"),
            inverseJoinColumns = @JoinColumn(name = "sudyset_id"))
    Set<StudySet> studySets;

    @ManyToMany
    @JoinTable(
            name = "class_learner",
            joinColumns = @JoinColumn(name = "class_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    Set<User> users;

    private boolean is_deleted;

    @Column
    @Temporal(TemporalType.DATE)
    private Date deleted_date;
}
