package com.nhom5.backend.controller;

import com.nhom5.backend.service.CompanyFollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/follows")
@CrossOrigin(origins = "*")
public class CompanyFollowController {

    @Autowired
    private CompanyFollowService companyFollowService;

    @PostMapping("/toggle")
    public ResponseEntity<?> toggleFollow(@RequestBody Map<String, Long> payload) {
        Long userId = payload.get("userId");
        Long enterpriseId = payload.get("enterpriseId");

        if (companyFollowService.isFollowing(userId, enterpriseId)) {
            companyFollowService.unfollow(userId, enterpriseId);
            return ResponseEntity.ok(Map.of("following", false));
        } else {
            companyFollowService.follow(userId, enterpriseId);
            return ResponseEntity.ok(Map.of("following", true));
        }
    }

    @GetMapping("/status")
    public ResponseEntity<?> getStatus(@RequestParam Long userId, @RequestParam Long enterpriseId) {
        boolean following = companyFollowService.isFollowing(userId, enterpriseId);
        return ResponseEntity.ok(Map.of("following", following));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserFollows(@PathVariable Long userId) {
        return ResponseEntity.ok(companyFollowService.getFollowsByUserId(userId));
    }
}
