package com.nhom5.backend.controller;

import com.nhom5.backend.model.SavedJob;
import com.nhom5.backend.service.SavedJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved-jobs")
@CrossOrigin(origins = "*")
public class SavedJobController {

    @Autowired
    private SavedJobService savedJobService;

    @GetMapping("/user/{userId}")
    public List<SavedJob> getByUserId(@PathVariable Long userId) {
        return savedJobService.getSavedJobsByUserId(userId);
    }

    @PostMapping
    public ResponseEntity<SavedJob> toggleSave(@RequestBody SavedJob savedJob) {
        return savedJobService.findByUserAndJob(savedJob.getUserId(), savedJob.getJobId())
                .map(existing -> {
                    savedJobService.deleteSavedJob(existing.getId());
                    return ResponseEntity.noContent().<SavedJob>build();
                })
                .orElseGet(() -> ResponseEntity.ok(savedJobService.saveJob(savedJob)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (savedJobService.deleteSavedJob(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
