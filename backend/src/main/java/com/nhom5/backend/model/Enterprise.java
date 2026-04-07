package com.nhom5.backend.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "enterprises")
@Data
public class Enterprise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String email;
    private String companySize;
    private String phoneNumber;
    private String industry;
    
    @Column(columnDefinition = "TEXT")
    private String introduction;
    
    private String websiteUrl;
    private String facebookUrl;
    private String linkedinUrl;
    private String twitterUrl;
    private String businessLicense;
    private String address;
    private Long userId;
    @Column(columnDefinition = "TEXT")
    private String avatar;
    private String status;
}
