package com.nhom5.backend.controller;

import com.nhom5.backend.model.VipSubscription;
import com.nhom5.backend.service.VipSubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vip")
@CrossOrigin(origins = "*")
public class VipSubscriptionController {

    @Autowired
    private VipSubscriptionService vipService;

    // Create a new subscription (returns pending subscription with transactionCode)
    @PostMapping("/subscribe")
    public ResponseEntity<VipSubscription> subscribe(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        String planType = payload.get("planType").toString();
        int months = Integer.parseInt(payload.getOrDefault("months", 1).toString());

        VipSubscription sub = vipService.createSubscription(userId, planType, months);
        return ResponseEntity.ok(sub);
    }

    // Check VIP status for a user
    @GetMapping("/status/{userId}")
    public ResponseEntity<Map<String, Object>> getVipStatus(@PathVariable Long userId) {
        return ResponseEntity.ok(vipService.getVipStatus(userId));
    }

    // Confirm payment (simulated - called after QR "payment")
    @PostMapping("/confirm/{transactionCode}")
    public ResponseEntity<?> confirmPayment(@PathVariable String transactionCode) {
        return vipService.confirmPayment(transactionCode)
                .map(sub -> ResponseEntity.ok((Object) sub))
                .orElse(ResponseEntity.notFound().build());
    }

    // Cancel subscription
    @PostMapping("/cancel/{subscriptionId}")
    public ResponseEntity<?> cancelSubscription(@PathVariable Long subscriptionId) {
        return vipService.cancelSubscription(subscriptionId)
                .map(sub -> ResponseEntity.ok((Object) sub))
                .orElse(ResponseEntity.notFound().build());
    }

    // Get subscription history
    @GetMapping("/history/{userId}")
    public ResponseEntity<List<VipSubscription>> getHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(vipService.getSubscriptionHistory(userId));
    }
}
