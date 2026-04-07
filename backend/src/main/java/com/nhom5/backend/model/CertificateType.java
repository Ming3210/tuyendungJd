package com.nhom5.backend.model;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "certificate_types")
@Data
public class CertificateType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    @ElementCollection
    private List<String> value;
    private String language;
    private Boolean status;
    private String code;
}
