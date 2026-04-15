package com.nhom5.backend.service;

import com.nhom5.backend.model.Enterprise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface EnterpriseService {
    List<Enterprise> getAllEnterprises();
    Page<Enterprise> getEnterprisesPaginated(Pageable pageable);
    Optional<Enterprise> getEnterpriseById(Long id);
    Enterprise createEnterprise(Enterprise enterprise);
    Optional<Enterprise> updateEnterprise(Long id, Enterprise enterpriseDetails);
    List<Enterprise> getEnterprisesByUserId(Long userId);
    boolean deleteEnterprise(Long id);
}
