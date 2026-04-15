package com.nhom5.backend.controller;

import com.nhom5.backend.model.CertificateType;
import com.nhom5.backend.service.CertificateTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/certificateTypes")
@CrossOrigin(origins = "*")
public class CertificateTypeController {

    @Autowired
    private CertificateTypeService certificateTypeService;

    @GetMapping
    public ResponseEntity<List<CertificateType>> getAll(
            @RequestParam(name = "_page", defaultValue = "1") int page,
            @RequestParam(name = "_limit", defaultValue = "6") int limit) {
        
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<CertificateType> ctPage = certificateTypeService.getCertificateTypesPaginated(pageable);

        HttpHeaders headers = new HttpHeaders();
        headers.add("x-total-count", String.valueOf(ctPage.getTotalElements()));
        headers.add("Access-Control-Expose-Headers", "x-total-count");

        return ResponseEntity.ok().headers(headers).body(ctPage.getContent());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CertificateType> getById(@PathVariable Long id) {
        return certificateTypeService.getCertificateTypeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CertificateType create(@RequestBody CertificateType ct) {
        return certificateTypeService.createCertificateType(ct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CertificateType> update(@PathVariable Long id, @RequestBody CertificateType ct) {
        return certificateTypeService.updateCertificateType(id, ct)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CertificateType> patch(@PathVariable Long id, @RequestBody CertificateType patch) {
        return certificateTypeService.getCertificateTypeById(id).map(existing -> {
            if (patch.getStatus() != null) existing.setStatus(patch.getStatus());
            if (patch.getType() != null) existing.setType(patch.getType());
            if (patch.getCode() != null) existing.setCode(patch.getCode());
            return ResponseEntity.ok(certificateTypeService.createCertificateType(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (certificateTypeService.deleteCertificateType(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
