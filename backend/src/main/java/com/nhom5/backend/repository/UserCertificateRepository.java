package com.nhom5.backend.repository;

import com.nhom5.backend.model.UserCertificate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserCertificateRepository extends JpaRepository<UserCertificate, Long> {
    List<UserCertificate> findByUserId(Long userId);
}
