package com.nhom5.backend.controller;

import com.nhom5.backend.model.Enterprise;
import com.nhom5.backend.service.EnterpriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enterprises")
@CrossOrigin(origins = "*")
public class EnterpriseController {

    @Autowired
    private EnterpriseService enterpriseService;

    @GetMapping
    public List<Enterprise> getAll() {
        return enterpriseService.getAllEnterprises();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Enterprise> getById(@PathVariable Long id) {
        return enterpriseService.getEnterpriseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Enterprise create(@RequestBody Enterprise enterprise) {
        return enterpriseService.createEnterprise(enterprise);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Enterprise> update(@PathVariable Long id, @RequestBody Enterprise enterprise) {
        return enterpriseService.updateEnterprise(id, enterprise)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Enterprise> patch(@PathVariable Long id, @RequestBody Enterprise patch) {
        return enterpriseService.getEnterpriseById(id).map(existing -> {
            if (patch.getStatus() != null) existing.setStatus(patch.getStatus());
            if (patch.getTitle() != null) existing.setTitle(patch.getTitle());
            if (patch.getAvatar() != null) existing.setAvatar(patch.getAvatar());
            return ResponseEntity.ok(enterpriseService.createEnterprise(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (enterpriseService.deleteEnterprise(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
