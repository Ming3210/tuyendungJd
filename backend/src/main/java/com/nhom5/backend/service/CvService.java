package com.nhom5.backend.service;

import com.nhom5.backend.model.Cv;
import java.util.List;
import java.util.Optional;

public interface CvService {
    List<Cv> getAllCvs();
    List<Cv> getCvsByUserId(Long userId);
    Optional<Cv> getCvById(Long id);
    Cv createCv(Cv cv);
    Optional<Cv> updateCv(Long id, Cv cvDetails);
    boolean deleteCv(Long id);
}
