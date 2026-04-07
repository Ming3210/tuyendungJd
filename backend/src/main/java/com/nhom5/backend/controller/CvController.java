package com.nhom5.backend.controller;

import com.nhom5.backend.model.Cv;
import com.nhom5.backend.service.CvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cvs")
@CrossOrigin(origins = "*")
public class CvController {

    @Autowired
    private CvService cvService;

    @GetMapping
    public List<Cv> getAll() {
        return cvService.getAllCvs();
    }

    @GetMapping("/user/{userId}")
    public List<Cv> getByUserId(@PathVariable Long userId) {
        return cvService.getCvsByUserId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cv> getById(@PathVariable Long id) {
        return cvService.getCvById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Cv create(@RequestBody Cv cv) {
        return cvService.createCv(cv);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cv> update(@PathVariable Long id, @RequestBody Cv cv) {
        return cvService.updateCv(id, cv)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Cv> patch(@PathVariable Long id, @RequestBody Cv patch) {
        return cvService.getCvById(id).map(existing -> {
            if (patch.getStatus() != null) existing.setStatus(patch.getStatus());
            if (patch.getTitle() != null) existing.setTitle(patch.getTitle());
            return ResponseEntity.ok(cvService.createCv(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (cvService.deleteCv(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
