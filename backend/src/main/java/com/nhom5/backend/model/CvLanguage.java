package com.nhom5.backend.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "cv_languages")
@Data
public class CvLanguage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String language;
    private String code;
    private Boolean status;
}
