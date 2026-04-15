package com.nhom5.backend.model;

import com.nhom5.backend.converter.JsonListConverter;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;


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

    @Column(columnDefinition = "TEXT")
    @Convert(converter = JsonListConverter.class)
    private List<String> description;

    @Column(name = "`rank`", columnDefinition = "TEXT")
    @Convert(converter = JsonListConverter.class)
    private List<String> rank;

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
    @Convert(converter = JsonListConverter.class)
    private List<String> benefitsDescription;

    private String workingTime;
    private String deadline;

    @Column(columnDefinition = "TEXT")
    @Convert(converter = JsonListConverter.class)
    private List<String> required;

    private String industry;
    private String enterpriseId;
    private String flight;

    private String updateDate;
}

