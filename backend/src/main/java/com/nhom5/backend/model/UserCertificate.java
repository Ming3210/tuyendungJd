package com.nhom5.backend.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_certificates")
@Data
public class UserCertificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String certificateType;
    private String certificateValue;
    private String receivedDate;
    private String expirationDate;
    private Long userId;
    private Long certificateId;
}
