package com.nhom5.backend.controller;

import com.nhom5.backend.model.UserCertificate;
import com.nhom5.backend.service.UserCertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/userCertificates")
@CrossOrigin(origins = "*")
public class UserCertificateController {

    @Autowired
    private UserCertificateService userCertificateService;

    @GetMapping
    public List<UserCertificate> getAll() {
        return userCertificateService.getAllUserCertificates();
    }

    @GetMapping("/user/{userId}")
    public List<UserCertificate> getByUserId(@PathVariable Long userId) {
        return userCertificateService.getByUserId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserCertificate> getById(@PathVariable Long id) {
        return userCertificateService.getUserCertificateById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public UserCertificate create(@RequestBody UserCertificate uc) {
        return userCertificateService.createUserCertificate(uc);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserCertificate> update(@PathVariable Long id, @RequestBody UserCertificate uc) {
        return userCertificateService.updateUserCertificate(id, uc)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (userCertificateService.deleteUserCertificate(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
