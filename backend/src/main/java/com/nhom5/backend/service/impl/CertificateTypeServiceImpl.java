package com.nhom5.backend.service.impl;

import com.nhom5.backend.model.CertificateType;
import com.nhom5.backend.repository.CertificateTypeRepository;
import com.nhom5.backend.service.CertificateTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CertificateTypeServiceImpl implements CertificateTypeService {

    @Autowired
    private CertificateTypeRepository certificateTypeRepository;

    @Override
    public List<CertificateType> getAllCertificateTypes() {
        return certificateTypeRepository.findAll();
    }

    @Override
    public Optional<CertificateType> getCertificateTypeById(Long id) {
        return certificateTypeRepository.findById(id);
    }

    @Override
    public CertificateType createCertificateType(CertificateType ct) {
        return certificateTypeRepository.save(ct);
    }

    @Override
    public Optional<CertificateType> updateCertificateType(Long id, CertificateType details) {
        return certificateTypeRepository.findById(id).map(ct -> {
            ct.setType(details.getType());
            ct.setValue(details.getValue());
            ct.setLanguage(details.getLanguage());
            ct.setStatus(details.getStatus());
            ct.setCode(details.getCode());
            return certificateTypeRepository.save(ct);
        });
    }

    @Override
    public boolean deleteCertificateType(Long id) {
        if (certificateTypeRepository.existsById(id)) {
            certificateTypeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
