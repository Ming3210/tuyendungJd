package com.nhom5.backend.service;

import com.nhom5.backend.model.SavedJob;
import java.util.List;
import java.util.Optional;

public interface SavedJobService {
    List<SavedJob> getSavedJobsByUserId(Long userId);
    SavedJob saveJob(SavedJob savedJob);
    boolean deleteSavedJob(Long id);
    boolean deleteSavedJobByUserAndJob(Long userId, Long jobId);
    Optional<SavedJob> findByUserAndJob(Long userId, Long jobId);
}
