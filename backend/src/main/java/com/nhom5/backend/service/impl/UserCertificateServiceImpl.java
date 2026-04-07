package com.nhom5.backend.service.impl;

import com.nhom5.backend.model.UserCertificate;
import com.nhom5.backend.repository.UserCertificateRepository;
import com.nhom5.backend.service.UserCertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserCertificateServiceImpl implements UserCertificateService {

    @Autowired
    private UserCertificateRepository userCertificateRepository;

    @Override
    public List<UserCertificate> getAllUserCertificates() {
        return userCertificateRepository.findAll();
    }

    @Override
    public List<UserCertificate> getByUserId(Long userId) {
        return userCertificateRepository.findByUserId(userId);
    }

    @Override
    public Optional<UserCertificate> getUserCertificateById(Long id) {
        return userCertificateRepository.findById(id);
    }

    @Override
    public UserCertificate createUserCertificate(UserCertificate uc) {
        return userCertificateRepository.save(uc);
    }

    @Override
    public Optional<UserCertificate> updateUserCertificate(Long id, UserCertificate details) {
        return userCertificateRepository.findById(id).map(uc -> {
            uc.setCertificateType(details.getCertificateType());
            uc.setCertificateValue(details.getCertificateValue());
            uc.setReceivedDate(details.getReceivedDate());
            uc.setExpirationDate(details.getExpirationDate());
            uc.setUserId(details.getUserId());
            uc.setCertificateId(details.getCertificateId());
            return userCertificateRepository.save(uc);
        });
    }

    @Override
    public boolean deleteUserCertificate(Long id) {
        if (userCertificateRepository.existsById(id)) {
            userCertificateRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
