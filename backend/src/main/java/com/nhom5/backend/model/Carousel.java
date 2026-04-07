package com.nhom5.backend.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "carousels")
@Data
public class Carousel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private Integer idx; 
    @Column(columnDefinition = "TEXT")
    private String imgUrl;
    private String status;
}
