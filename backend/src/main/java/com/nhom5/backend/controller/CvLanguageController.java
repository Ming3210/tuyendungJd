package com.nhom5.backend.controller;

import com.nhom5.backend.model.CvLanguage;
import com.nhom5.backend.service.CvLanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cvLanguages")
@CrossOrigin(origins = "*")
public class CvLanguageController {

    @Autowired
    private CvLanguageService cvLanguageService;

    @GetMapping
    public List<CvLanguage> getAll() {
        return cvLanguageService.getAllCvLanguages();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CvLanguage> getById(@PathVariable Long id) {
        return cvLanguageService.getCvLanguageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CvLanguage create(@RequestBody CvLanguage cvLanguage) {
        return cvLanguageService.createCvLanguage(cvLanguage);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CvLanguage> update(@PathVariable Long id, @RequestBody CvLanguage cvLanguage) {
        return cvLanguageService.updateCvLanguage(id, cvLanguage)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CvLanguage> patch(@PathVariable Long id, @RequestBody CvLanguage patch) {
        return cvLanguageService.getCvLanguageById(id).map(existing -> {
            if (patch.getStatus() != null) existing.setStatus(patch.getStatus());
            if (patch.getLanguage() != null) existing.setLanguage(patch.getLanguage());
            return ResponseEntity.ok(cvLanguageService.createCvLanguage(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (cvLanguageService.deleteCvLanguage(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
