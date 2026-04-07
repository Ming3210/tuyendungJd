package com.nhom5.backend.service.impl;

import com.nhom5.backend.model.InterviewBooking;
import com.nhom5.backend.repository.InterviewBookingRepository;
import com.nhom5.backend.service.InterviewBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InterviewBookingServiceImpl implements InterviewBookingService {

    @Autowired
    private InterviewBookingRepository interviewBookingRepository;

    @Override
    public List<InterviewBooking> getAllInterviewBookings() {
        return interviewBookingRepository.findAll();
    }

    @Override
    public List<InterviewBooking> getByUserId(Long userId) {
        return interviewBookingRepository.findByUserId(userId);
    }

    @Override
    public List<InterviewBooking> getByEnterpriseId(Long enterpriseId) {
        return interviewBookingRepository.findByEnterpriseId(enterpriseId);
    }

    @Override
    public Optional<InterviewBooking> getInterviewBookingById(Long id) {
        return interviewBookingRepository.findById(id);
    }

    @Override
    public InterviewBooking createInterviewBooking(InterviewBooking ib) {
        return interviewBookingRepository.save(ib);
    }

    @Override
    public Optional<InterviewBooking> updateInterviewBooking(Long id, InterviewBooking details) {
        return interviewBookingRepository.findById(id).map(ib -> {
            ib.setEnterpriseId(details.getEnterpriseId());
            ib.setJobId(details.getJobId());
            ib.setTime(details.getTime());
            ib.setDate(details.getDate());
            ib.setUserId(details.getUserId());
            ib.setStatus(details.getStatus());
            ib.setCreateAt(details.getCreateAt());
            ib.setMeetingLink(details.getMeetingLink());
            ib.setUpdateStatusTime(details.getUpdateStatusTime());
            ib.setCancelReason(details.getCancelReason());
            ib.setInterviewMode(details.getInterviewMode());
            ib.setDescription(details.getDescription());
            ib.setRank(details.getRank());
            ib.setSkills(details.getSkills());
            ib.setProvince(details.getProvince());
            ib.setDistrict(details.getDistrict());
            ib.setAddress(details.getAddress());
            ib.setBenefitsDescription(details.getBenefitsDescription());
            ib.setWorkingTime(details.getWorkingTime());
            ib.setSkill(details.getSkill());
            ib.setEducation(details.getEducation());
            return interviewBookingRepository.save(ib);
        });
    }

    @Override
    public boolean deleteInterviewBooking(Long id) {
        if (interviewBookingRepository.existsById(id)) {
            interviewBookingRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
