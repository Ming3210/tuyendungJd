package com.nhom5.backend.service.impl;

import com.nhom5.backend.model.Cv;
import com.nhom5.backend.repository.CvRepository;
import com.nhom5.backend.service.CvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CvServiceImpl implements CvService {

    @Autowired
    private CvRepository cvRepository;

    @Override
    public List<Cv> getAllCvs() {
        return cvRepository.findAll();
    }

    @Override
    public List<Cv> getCvsByUserId(Long userId) {
        return cvRepository.findByUserId(userId);
    }

    @Override
    public Optional<Cv> getCvById(Long id) {
        return cvRepository.findById(id);
    }

    @Override
    public Cv createCv(Cv cv) {
        return cvRepository.save(cv);
    }

    @Override
    public Optional<Cv> updateCv(Long id, Cv details) {
        return cvRepository.findById(id).map(cv -> {
            cv.setLanguageId(details.getLanguageId());
            cv.setLanguage(details.getLanguage());
            cv.setTitle(details.getTitle());
            cv.setPdf(details.getPdf());
            cv.setPdfDataUrl(details.getPdfDataUrl());
            cv.setUserId(details.getUserId());
            cv.setDate(details.getDate());
            cv.setStatus(details.getStatus());
            return cvRepository.save(cv);
        });
    }

    @Override
    public boolean deleteCv(Long id) {
        if (cvRepository.existsById(id)) {
            cvRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
