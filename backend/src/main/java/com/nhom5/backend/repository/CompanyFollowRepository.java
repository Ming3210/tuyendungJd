package com.nhom5.backend.repository;

import com.nhom5.backend.model.CompanyFollow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyFollowRepository extends JpaRepository<CompanyFollow, Long> {
    Optional<CompanyFollow> findByUserIdAndEnterpriseId(Long userId, Long enterpriseId);
    List<CompanyFollow> findByEnterpriseId(Long enterpriseId);
    List<CompanyFollow> findByUserId(Long userId);
    void deleteByUserIdAndEnterpriseId(Long userId, Long enterpriseId);
}
