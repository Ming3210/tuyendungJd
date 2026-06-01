package com.nhom5.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private String jobCategory;

    @Column(name = "enterprise_id")
    private Long enterpriseId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "enterprise_id", insertable = false, updatable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Enterprise enterprise;

    private String flight;

    private String experience;
    private Boolean saturdayOff;
    private Double minSalary;
    private Double maxSalary;

    private Boolean negotiable;
    private String jobLevel;
    private String education;

    private String updateDate;
}

