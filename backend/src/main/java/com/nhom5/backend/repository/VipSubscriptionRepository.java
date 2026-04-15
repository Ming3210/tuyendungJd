package com.nhom5.backend.repository;

import com.nhom5.backend.model.VipSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VipSubscriptionRepository extends JpaRepository<VipSubscription, Long> {
    List<VipSubscription> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<VipSubscription> findByUserIdAndStatus(Long userId, String status);
    Optional<VipSubscription> findByTransactionCode(String transactionCode);
}
