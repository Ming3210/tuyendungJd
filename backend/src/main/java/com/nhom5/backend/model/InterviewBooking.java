package com.nhom5.backend.model;
import com.nhom5.backend.converter.JsonListConverter;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;


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
    @Convert(converter = JsonListConverter.class)
    private List<String> updateStatusTime;

    @Column(columnDefinition = "TEXT")
    private String cancelReason;
    private String interviewMode;

    @Column(columnDefinition = "TEXT")
    @Convert(converter = JsonListConverter.class)
    private List<String> description;

    @Column(name = "`rank`", columnDefinition = "TEXT")
    @Convert(converter = JsonListConverter.class)
    private List<String> rank;

    private String skills;
    private String province;
    private String district;
    private String address;

    @Column(columnDefinition = "TEXT")
    @Convert(converter = JsonListConverter.class)
    private List<String> benefitsDescription;

    private String workingTime;
    private String skill;
    private String education;
}

