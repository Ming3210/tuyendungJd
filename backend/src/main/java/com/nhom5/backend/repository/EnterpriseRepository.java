package com.nhom5.backend.repository;

import com.nhom5.backend.model.Enterprise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnterpriseRepository extends JpaRepository<Enterprise, Long> {
    List<Enterprise> findByUserId(Long userId);
}
