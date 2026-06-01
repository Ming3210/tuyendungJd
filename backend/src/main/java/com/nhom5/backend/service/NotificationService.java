package com.nhom5.backend.service;

import com.nhom5.backend.model.Notification;
import java.util.List;

public interface NotificationService {
    Notification createNotification(Long userId, String title, String message, String type, Long relatedId);
    List<Notification> getUserNotifications(Long userId);
    void markAsRead(Long id);
    void markAllAsRead(Long userId);
    void deleteOldNotifications();
}
