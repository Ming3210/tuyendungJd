package com.nhom5.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Builder
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String fullName;

    @Column(unique = true)
    private String email;

    private String userName;
    private String status;
    private String password;

    private String address;
    private String phone;
    private String role;

    @Column(name = "is_lock")
    private Boolean lock;

    private String gender;
    private String level;
    private String skills;

    private Integer yearsOfExperience;

    @Column(columnDefinition = "TEXT")
    private String avatar;

    private String position;

    private LocalDate birthdate;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
