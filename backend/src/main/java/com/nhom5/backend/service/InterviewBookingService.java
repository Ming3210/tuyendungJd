package com.nhom5.backend.service;

import com.nhom5.backend.model.InterviewBooking;
import java.util.List;
import java.util.Optional;

public interface InterviewBookingService {
    List<InterviewBooking> getAllInterviewBookings();
    List<InterviewBooking> getByUserId(Long userId);
    List<InterviewBooking> getByEnterpriseId(Long enterpriseId);
    Optional<InterviewBooking> getInterviewBookingById(Long id);
    InterviewBooking createInterviewBooking(InterviewBooking interviewBooking);
    Optional<InterviewBooking> updateInterviewBooking(Long id, InterviewBooking details);
    boolean deleteInterviewBooking(Long id);
}
