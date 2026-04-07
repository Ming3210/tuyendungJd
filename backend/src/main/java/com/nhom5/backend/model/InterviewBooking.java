package com.nhom5.backend.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "interview_bookings")
@Data
public class InterviewBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long enterpriseId;
    private Long jobId;
    private String time;
    private String date;
    private Long userId;
    private String status;
    private String createAt;
    private String meetingLink;

    // Stored as JSON string
    @Column(columnDefinition = "TEXT")
    private String updateStatusTime;

    @Column(columnDefinition = "TEXT")
    private String cancelReason;
    private String interviewMode;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String rank;

    private String skills;
    private String province;
    private String district;
    private String address;

    @Column(columnDefinition = "TEXT")
    private String benefitsDescription;

    private String workingTime;
    private String skill;
    private String education;
}

