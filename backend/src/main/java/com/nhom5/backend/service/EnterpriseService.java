package com.nhom5.backend.service;

import com.nhom5.backend.model.Enterprise;
import java.util.List;
import java.util.Optional;

public interface EnterpriseService {
    List<Enterprise> getAllEnterprises();
    Optional<Enterprise> getEnterpriseById(Long id);
    Enterprise createEnterprise(Enterprise enterprise);
    Optional<Enterprise> updateEnterprise(Long id, Enterprise enterpriseDetails);
    boolean deleteEnterprise(Long id);
}
