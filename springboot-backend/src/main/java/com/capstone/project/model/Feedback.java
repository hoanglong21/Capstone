package com.capstone.project.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User user;

    private String title;

    @ManyToOne
    @JoinColumn(name = "type_id", nullable = false)
    private FeedbackType feedbackType;

    private String destination;

    private String content;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_date;
}
