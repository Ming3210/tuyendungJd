package com.nhom5.backend.service.impl;

import com.nhom5.backend.model.VipSubscription;
import com.nhom5.backend.repository.VipSubscriptionRepository;
import com.nhom5.backend.service.VipSubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class VipSubscriptionServiceImpl implements VipSubscriptionService {

    @Autowired
    private VipSubscriptionRepository repository;

    private static final Map<String, Long> PLAN_PRICES = Map.of(
            "pro", 99000L,
            "business", 199000L
    );

    @Override
    public VipSubscription createSubscription(Long userId, String planType, int months) {
        // Check if user already has an active subscription
        Optional<VipSubscription> existing = repository.findByUserIdAndStatus(userId, "active");
        if (existing.isPresent()) {
            // Extend the existing subscription
            VipSubscription sub = existing.get();
            sub.setEndDate(sub.getEndDate().plusMonths(months));
            sub.setPlanType(planType);
            sub.setUpdatedAt(LocalDateTime.now());
            return repository.save(sub);
        }

        // Generate a unique transaction code for QR payment tracking
        String transactionCode = "VIP" + userId + "-" + System.currentTimeMillis();

        Long amount = PLAN_PRICES.getOrDefault(planType, 99000L) * months;

        VipSubscription subscription = VipSubscription.builder()
                .userId(userId)
                .planType(planType)
                .months(months)
                .amount(amount)
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusMonths(months))
                .status("pending")
                .transactionCode(transactionCode)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return repository.save(subscription);
    }

    @Override
    public Map<String, Object> getVipStatus(Long userId) {
        Map<String, Object> result = new HashMap<>();

        Optional<VipSubscription> active = repository.findByUserIdAndStatus(userId, "active");
        if (active.isPresent()) {
            VipSubscription sub = active.get();
            // Check if expired
            if (sub.getEndDate().isBefore(LocalDateTime.now())) {
                sub.setStatus("expired");
                sub.setUpdatedAt(LocalDateTime.now());
                repository.save(sub);
                result.put("isVip", false);
                return result;
            }
            result.put("isVip", true);
            result.put("planType", sub.getPlanType());
            result.put("endDate", sub.getEndDate().toString());
            result.put("subscriptionId", sub.getId());
            return result;
        }

        result.put("isVip", false);
        return result;
    }

    @Override
    public Optional<VipSubscription> confirmPayment(String transactionCode) {
        Optional<VipSubscription> opt = repository.findByTransactionCode(transactionCode);
        if (opt.isPresent()) {
            VipSubscription sub = opt.get();
            if ("pending".equals(sub.getStatus())) {
                sub.setStatus("active");
                sub.setStartDate(LocalDateTime.now());
                sub.setEndDate(LocalDateTime.now().plusMonths(sub.getMonths()));
                sub.setUpdatedAt(LocalDateTime.now());
                return Optional.of(repository.save(sub));
            }
        }
        return opt;
    }

    @Override
    public Optional<VipSubscription> cancelSubscription(Long subscriptionId) {
        Optional<VipSubscription> opt = repository.findById(subscriptionId);
        if (opt.isPresent()) {
            VipSubscription sub = opt.get();
            sub.setStatus("cancelled");
            sub.setUpdatedAt(LocalDateTime.now());
            return Optional.of(repository.save(sub));
        }
        return Optional.empty();
    }

    @Override
    public List<VipSubscription> getSubscriptionHistory(Long userId) {
        return repository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}
