package com.nhom5.backend.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "cvs")
@Data
public class Cv {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long languageId;
    private String language;
    private String title;
    private String pdf;
    @Column(columnDefinition = "TEXT")
    private String pdfDataUrl;
    private Long userId;
    private String date;
    private Boolean status;
}
