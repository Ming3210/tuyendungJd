package com.nhom5.backend.service;

import com.nhom5.backend.model.InterviewBooking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface InterviewBookingService {
    List<InterviewBooking> getAllInterviewBookings();
    Page<InterviewBooking> getInterviewBookingsPaginated(Pageable pageable);
    List<InterviewBooking> getByUserId(Long userId);
    Page<InterviewBooking> getByUserIdPaginated(Long userId, Pageable pageable);
    List<InterviewBooking> getByEnterpriseId(Long enterpriseId);
    Page<InterviewBooking> getByEnterpriseIdPaginated(Long enterpriseId, String status, Pageable pageable);
    Optional<InterviewBooking> getInterviewBookingById(Long id);
    InterviewBooking createInterviewBooking(InterviewBooking interviewBooking);
    Optional<InterviewBooking> updateInterviewBooking(Long id, InterviewBooking details);
    boolean deleteInterviewBooking(Long id);
}
