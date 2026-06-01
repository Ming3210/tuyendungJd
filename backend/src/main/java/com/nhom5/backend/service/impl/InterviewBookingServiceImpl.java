package com.nhom5.backend.service.impl;

import com.nhom5.backend.model.InterviewBooking;
import com.nhom5.backend.repository.InterviewBookingRepository;
import com.nhom5.backend.service.InterviewBookingService;
import com.nhom5.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class InterviewBookingServiceImpl implements InterviewBookingService {

    @Autowired
    private InterviewBookingRepository interviewBookingRepository;

    @Autowired
    private NotificationService notificationService;

    @Override
    public List<InterviewBooking> getAllInterviewBookings() {
        return interviewBookingRepository.findAll();
    }

    @Override
    public Page<InterviewBooking> getInterviewBookingsPaginated(Pageable pageable) {
        return interviewBookingRepository.findAll(pageable);
    }

    @Override
    public List<InterviewBooking> getByUserId(Long userId) {
        return interviewBookingRepository.findByUserId(userId);
    }

    @Override
    public Page<InterviewBooking> getByUserIdPaginated(Long userId, Pageable pageable) {
        return interviewBookingRepository.findByUserIdOrderByCreateAtDesc(userId, pageable);
    }

    @Override
    public List<InterviewBooking> getByEnterpriseId(Long enterpriseId) {
        return interviewBookingRepository.findByEnterpriseId(enterpriseId);
    }

    @Override
    public Page<InterviewBooking> getByEnterpriseIdPaginated(Long enterpriseId, String status, Pageable pageable) {
        if (status == null || status.equals("all") || status.isEmpty()) {
            return interviewBookingRepository.findByEnterpriseIdOrderByCreateAtDesc(enterpriseId, pageable);
        }
        return interviewBookingRepository.findByEnterpriseIdAndStatusOrderByCreateAtDesc(enterpriseId, status, pageable);
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
            String oldStatus = ib.getStatus();
            if (details.getEnterpriseId() != null) ib.setEnterpriseId(details.getEnterpriseId());
            if (details.getJobId() != null) ib.setJobId(details.getJobId());
            if (details.getTime() != null) ib.setTime(details.getTime());
            if (details.getDate() != null) ib.setDate(details.getDate());
            if (details.getUserId() != null) ib.setUserId(details.getUserId());
            if (details.getCvId() != null) ib.setCvId(details.getCvId());
            if (details.getStatus() != null) ib.setStatus(details.getStatus());
            if (details.getCreateAt() != null) ib.setCreateAt(details.getCreateAt());
            if (details.getMeetingLink() != null) ib.setMeetingLink(details.getMeetingLink());
            if (details.getUpdateStatusTime() != null) ib.setUpdateStatusTime(details.getUpdateStatusTime());
            if (details.getCancelReason() != null) ib.setCancelReason(details.getCancelReason());
            if (details.getInterviewMode() != null) ib.setInterviewMode(details.getInterviewMode());
            if (details.getDescription() != null) ib.setDescription(details.getDescription());
            if (details.getRank() != null) ib.setRank(details.getRank());
            if (details.getProvince() != null) ib.setProvince(details.getProvince());
            if (details.getDistrict() != null) ib.setDistrict(details.getDistrict());
            if (details.getAddress() != null) ib.setAddress(details.getAddress());
            if (details.getBenefitsDescription() != null) ib.setBenefitsDescription(details.getBenefitsDescription());
            if (details.getWorkingTime() != null) ib.setWorkingTime(details.getWorkingTime());
            if (details.getEducation() != null) ib.setEducation(details.getEducation());
            
            InterviewBooking saved = interviewBookingRepository.save(ib);
            
            // Generate notification if status changed to something important
            if (details.getStatus() != null && !details.getStatus().equals(oldStatus)) {
                String title = "";
                String message = "";
                
                if ("interviewing".equals(details.getStatus())) {
                    title = "Lời mời phỏng vấn mới";
                    message = "Chúc mừng! Bạn có một lịch hẹn phỏng vấn mới. Vui lòng kiểm tra chi tiết ngày giờ.";
                } else if ("accepted".equals(details.getStatus())) {
                    title = "Kết quả tuyển dụng";
                    message = "Tuyệt vời! Bạn đã trúng tuyển một vị trí công việc. Xem chi tiết ngay!";
                } else if ("rejected".equals(details.getStatus())) {
                    title = "Cập nhật hồ sơ";
                    message = "Rất tiếc, doanh nghiệp đã từ chối hồ sơ của bạn cho vị trí này. Đừng bỏ cuộc nhé!";
                }
                
                if (!title.isEmpty()) {
                    notificationService.createNotification(ib.getUserId(), title, message, "INTERVIEW", ib.getId());
                }
            }
            
            return saved;
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
