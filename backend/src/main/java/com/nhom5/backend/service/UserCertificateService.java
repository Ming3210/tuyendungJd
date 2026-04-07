package com.nhom5.backend.service;

import com.nhom5.backend.model.UserCertificate;
import java.util.List;
import java.util.Optional;

public interface UserCertificateService {
    List<UserCertificate> getAllUserCertificates();
    List<UserCertificate> getByUserId(Long userId);
    Optional<UserCertificate> getUserCertificateById(Long id);
    UserCertificate createUserCertificate(UserCertificate userCertificate);
    Optional<UserCertificate> updateUserCertificate(Long id, UserCertificate details);
    boolean deleteUserCertificate(Long id);
}
