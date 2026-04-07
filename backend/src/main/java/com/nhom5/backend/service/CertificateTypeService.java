package com.nhom5.backend.service;

import com.nhom5.backend.model.CertificateType;
import java.util.List;
import java.util.Optional;

public interface CertificateTypeService {
    List<CertificateType> getAllCertificateTypes();
    Optional<CertificateType> getCertificateTypeById(Long id);
    CertificateType createCertificateType(CertificateType certificateType);
    Optional<CertificateType> updateCertificateType(Long id, CertificateType details);
    boolean deleteCertificateType(Long id);
}
