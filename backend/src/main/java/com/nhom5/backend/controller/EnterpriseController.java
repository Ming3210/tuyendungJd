package com.nhom5.backend.controller;

import com.nhom5.backend.model.Enterprise;
import com.nhom5.backend.service.EnterpriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
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
    public ResponseEntity<List<Enterprise>> getAll(
            @RequestParam(name = "_page", defaultValue = "1") int page,
            @RequestParam(name = "_limit", defaultValue = "6") int limit,
            @RequestParam(name = "industry", required = false) String industry,
            @RequestParam(name = "_sort", required = false) String sort) {
        
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Enterprise> enterprisePage = enterpriseService.getEnterprisesPaginated(industry, sort, pageable);

        HttpHeaders headers = new HttpHeaders();
        headers.add("x-total-count", String.valueOf(enterprisePage.getTotalElements()));
        headers.add("Access-Control-Expose-Headers", "x-total-count");

        return ResponseEntity.ok().headers(headers).body(enterprisePage.getContent());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Enterprise> getById(@PathVariable Long id) {
        return enterpriseService.getEnterpriseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Enterprise> getByUserId(@PathVariable Long userId) {
        return enterpriseService.getEnterprisesByUserId(userId);
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

    @PostMapping("/ids")
    public ResponseEntity<List<Enterprise>> getByIds(@RequestBody List<Long> ids) {
        return ResponseEntity.ok(enterpriseService.getEnterprisesByIds(ids));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (enterpriseService.deleteEnterprise(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
