package com.nhom5.backend.service.impl;

import com.nhom5.backend.model.Enterprise;
import com.nhom5.backend.repository.EnterpriseRepository;
import com.nhom5.backend.service.EnterpriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnterpriseServiceImpl implements EnterpriseService {

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Override
    public List<Enterprise> getAllEnterprises() {
        return enterpriseRepository.findAll();
    }

    @Override
    public Page<Enterprise> getEnterprisesPaginated(Pageable pageable) {
        return enterpriseRepository.findAll(pageable);
    }

    @Override
    public Optional<Enterprise> getEnterpriseById(Long id) {
        return enterpriseRepository.findById(id);
    }

    @Override
    public Enterprise createEnterprise(Enterprise enterprise) {
        return enterpriseRepository.save(enterprise);
    }

    @Override
    public Optional<Enterprise> updateEnterprise(Long id, Enterprise details) {
        return enterpriseRepository.findById(id).map(e -> {
            e.setTitle(details.getTitle());
            e.setEmail(details.getEmail());
            e.setCompanySize(details.getCompanySize());
            e.setPhoneNumber(details.getPhoneNumber());
            e.setIndustry(details.getIndustry());
            e.setIntroduction(details.getIntroduction());
            e.setWebsiteUrl(details.getWebsiteUrl());
            e.setFacebookUrl(details.getFacebookUrl());
            e.setLinkedinUrl(details.getLinkedinUrl());
            e.setTwitterUrl(details.getTwitterUrl());
            e.setBusinessLicense(details.getBusinessLicense());
            e.setAddress(details.getAddress());
            e.setUserId(details.getUserId());
            e.setAvatar(details.getAvatar());
            e.setStatus(details.getStatus());
            return enterpriseRepository.save(e);
        });
    }

    @Override
    public List<Enterprise> getEnterprisesByUserId(Long userId) {
        return enterpriseRepository.findByUserId(userId);
    }

    @Override
    public boolean deleteEnterprise(Long id) {
        if (enterpriseRepository.existsById(id)) {
            enterpriseRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
