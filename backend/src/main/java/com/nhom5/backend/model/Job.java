package com.nhom5.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private Integer quantity;

    // Stored as JSON string, e.g. ["item1","item2"]
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "`rank`", columnDefinition = "TEXT")
    private String rank;

    private String gender;
    private String skills;
    private String salaryCurrent;
    private String salary;
    private String province;
    private String district;

    @Column(columnDefinition = "TEXT")
    private String image;

    private String address;

    @Column(columnDefinition = "TEXT")
    private String benefitsDescription;

    private String workingTime;
    private String deadline;

    @Column(columnDefinition = "TEXT")
    private String required;

    private String industry;
    private String enterpriseId;
    private String flight;

    private String updateDate;
}

