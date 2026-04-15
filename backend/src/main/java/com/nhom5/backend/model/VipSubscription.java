package com.nhom5.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Builder
@Table(name = "vip_subscriptions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VipSubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String planType; // "pro" or "business"

    private Integer months; // subscription duration in months

    private Long amount; // payment amount in VND

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private String status; // "active", "expired", "cancelled", "pending"

    private String transactionCode; // unique code for QR payment tracking

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
