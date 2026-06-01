package com.nhom5.backend.service.impl;

import com.nhom5.backend.model.Notification;
import com.nhom5.backend.repository.NotificationRepository;
import com.nhom5.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Override
    public Notification createNotification(Long userId, String title, String message, String type, Long relatedId) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type);
        notification.setRelatedId(relatedId);
        notification.setCreatedAt(LocalDateTime.now());
        notification.setSeen(false);
        Notification noti = notificationRepository.save(notification);
        // Send to a direct topic that the frontend subscribes to by userId
        messagingTemplate.convertAndSend(
                "/topic/notifications/" + userId,
                noti
        );
        return noti;
    }

    @Override
    public List<Notification> getUserNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    @Transactional
    public void markAsRead(Long id) {
        notificationRepository.findById(id).ifPresent(n -> {
            n.setSeen(true);
            notificationRepository.save(n);
        });
    }

    @Override
    @Transactional
    public void markAllAsRead(Long userId) {
        List<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
        notifications.forEach(n -> n.setSeen(true));
        notificationRepository.saveAll(notifications);
    }

    /**
     * Auto-delete notifications older than 30 days.
     * Runs every day at midnight.
     */
    @Override
    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void deleteOldNotifications() {
        LocalDateTime expiryDate = LocalDateTime.now().minusDays(30);
        notificationRepository.deleteByCreatedAtBefore(expiryDate);
    }
}
