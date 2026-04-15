package com.nhom5.backend.service;

import com.nhom5.backend.model.VipSubscription;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface VipSubscriptionService {
    VipSubscription createSubscription(Long userId, String planType, int months);
    Map<String, Object> getVipStatus(Long userId);
    Optional<VipSubscription> confirmPayment(String transactionCode);
    Optional<VipSubscription> cancelSubscription(Long subscriptionId);
    List<VipSubscription> getSubscriptionHistory(Long userId);
}
