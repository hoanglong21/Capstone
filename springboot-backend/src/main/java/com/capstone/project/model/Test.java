package com.capstone.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "test")
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User user;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_date;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date modified_date;

    private String description;

    private float duration;

}
