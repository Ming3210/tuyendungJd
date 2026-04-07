package com.nhom5.backend.service;

import com.nhom5.backend.model.CvLanguage;
import java.util.List;
import java.util.Optional;

public interface CvLanguageService {
    List<CvLanguage> getAllCvLanguages();
    Optional<CvLanguage> getCvLanguageById(Long id);
    CvLanguage createCvLanguage(CvLanguage cvLanguage);
    Optional<CvLanguage> updateCvLanguage(Long id, CvLanguage cvLanguageDetails);
    boolean deleteCvLanguage(Long id);
}
