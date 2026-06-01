package com.nhom5.backend.controller;

import com.nhom5.backend.model.VipSubscription;
import com.nhom5.backend.service.VipSubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.nhom5.backend.dto.SePayWebhookRequest;
import org.springframework.web.bind.annotation.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

    // SePay Webhook Endpoint
    @PostMapping("/webhook/sepay")
    public ResponseEntity<Map<String, Object>> handleSePayWebhook(@RequestBody SePayWebhookRequest request) {
        try {
            // Determine the content string provided by SePay
            String content = request.getTransactionContent() != null ? request.getTransactionContent() : request.getContent();
            if (content == null) content = "";

            // Make content uppercase to be case-insensitive in search
            content = content.toUpperCase();

            // Extract our specific transaction code pattern (e.g. VIP<userid>-<timestamp>)
            // We'll search using regex: VIP\d+-\d+
            Pattern pattern = Pattern.compile("VIP\\d+-\\d+");
            Matcher matcher = pattern.matcher(content);
            
            if (matcher.find()) {
                String transactionCode = matcher.group();
                
                // Also verify the transfer amount to make sure it covers the package
                // In a production system, you'd load the pending subscription to check expected amount
                Long amount = request.getTransferAmount() != null ? request.getTransferAmount() : (request.getAmountIn() != null ? request.getAmountIn() : 0L);
                
                if (amount > 0) {
                    // Activate subscription
                    vipService.confirmPayment(transactionCode);
                    return ResponseEntity.ok(Map.of("success", true, "message", "Webhook processed successfully"));
                }
            }

            return ResponseEntity.ok(Map.of("success", false, "message", "No valid transaction code found or invalid amount"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }
}
