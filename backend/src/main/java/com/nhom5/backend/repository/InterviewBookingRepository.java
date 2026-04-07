package com.nhom5.backend.repository;

import com.nhom5.backend.model.InterviewBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewBookingRepository extends JpaRepository<InterviewBooking, Long> {
    List<InterviewBooking> findByUserId(Long userId);
    List<InterviewBooking> findByEnterpriseId(Long enterpriseId);
}
