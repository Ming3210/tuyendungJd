package com.nhom5.backend.repository;

import com.nhom5.backend.model.InterviewBooking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewBookingRepository extends JpaRepository<InterviewBooking, Long> {
    List<InterviewBooking> findByUserId(Long userId);
    List<InterviewBooking> findByEnterpriseId(Long enterpriseId);

    // Paginated queries
    Page<InterviewBooking> findByEnterpriseIdOrderByCreateAtDesc(Long enterpriseId, Pageable pageable);
    Page<InterviewBooking> findByEnterpriseIdAndStatusOrderByCreateAtDesc(Long enterpriseId, String status, Pageable pageable);
    Page<InterviewBooking> findByUserIdOrderByCreateAtDesc(Long userId, Pageable pageable);
}
