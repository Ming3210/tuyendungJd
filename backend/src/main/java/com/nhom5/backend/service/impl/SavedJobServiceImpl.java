package com.nhom5.backend.service.impl;

import com.nhom5.backend.model.SavedJob;
import com.nhom5.backend.repository.SavedJobRepository;
import com.nhom5.backend.service.SavedJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SavedJobServiceImpl implements SavedJobService {

    @Autowired
    private SavedJobRepository savedJobRepository;

    @Override
    public List<SavedJob> getSavedJobsByUserId(Long userId) {
        return savedJobRepository.findByUserId(userId);
    }

    @Override
    public SavedJob saveJob(SavedJob savedJob) {
        return savedJobRepository.save(savedJob);
    }

    @Override
    public boolean deleteSavedJob(Long id) {
        if (savedJobRepository.existsById(id)) {
            savedJobRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public boolean deleteSavedJobByUserAndJob(Long userId, Long jobId) {
        Optional<SavedJob> existing = savedJobRepository.findByUserIdAndJobId(userId, jobId);
        if (existing.isPresent()) {
            savedJobRepository.deleteByUserIdAndJobId(userId, jobId);
            return true;
        }
        return false;
    }

    @Override
    public Optional<SavedJob> findByUserAndJob(Long userId, Long jobId) {
        return savedJobRepository.findByUserIdAndJobId(userId, jobId);
    }
}
