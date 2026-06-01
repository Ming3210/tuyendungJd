package com.nhom5.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String message;

    private String type; // INTERVIEW, SYSTEM, JOB
    @Column(name = "is_read")
    private boolean seen = false;
    private Long relatedId; // ID of the related object (e.g. InterviewBooking ID)
    private LocalDateTime createdAt = LocalDateTime.now();
}
