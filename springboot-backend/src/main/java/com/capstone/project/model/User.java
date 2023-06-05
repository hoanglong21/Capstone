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
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false)
    private String username;

    private String first_name;

    private String last_name;

//    private boolean gender; // 0 male; 1 female

    private String gender;

    @Column
    @Temporal(TemporalType.DATE)
    private Date DOB;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true)
    private String phone_number;

    private String password;

    private String role;

    private String address;

    private String bio;

    private String status;

    private String avatar;

    @ManyToMany(mappedBy = "users")
    Set<Class> classes;

//    @Column(name = "is_banned", columnDefinition="boolean default false", nullable = false)
//    private Boolean banned;
}