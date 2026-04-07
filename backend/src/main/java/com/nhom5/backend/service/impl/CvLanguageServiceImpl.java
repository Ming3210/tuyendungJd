package com.nhom5.backend.service.impl;

import com.nhom5.backend.model.CvLanguage;
import com.nhom5.backend.repository.CvLanguageRepository;
import com.nhom5.backend.service.CvLanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CvLanguageServiceImpl implements CvLanguageService {

    @Autowired
    private CvLanguageRepository cvLanguageRepository;

    @Override
    public List<CvLanguage> getAllCvLanguages() {
        return cvLanguageRepository.findAll();
    }

    @Override
    public Optional<CvLanguage> getCvLanguageById(Long id) {
        return cvLanguageRepository.findById(id);
    }

    @Override
    public CvLanguage createCvLanguage(CvLanguage cvLanguage) {
        return cvLanguageRepository.save(cvLanguage);
    }

    @Override
    public Optional<CvLanguage> updateCvLanguage(Long id, CvLanguage details) {
        return cvLanguageRepository.findById(id).map(cl -> {
            cl.setLanguage(details.getLanguage());
            cl.setCode(details.getCode());
            cl.setStatus(details.getStatus());
            return cvLanguageRepository.save(cl);
        });
    }

    @Override
    public boolean deleteCvLanguage(Long id) {
        if (cvLanguageRepository.existsById(id)) {
            cvLanguageRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
