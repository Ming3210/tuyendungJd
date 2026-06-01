package com.nhom5.backend.controller;

import com.nhom5.backend.model.InterviewBooking;
import com.nhom5.backend.service.InterviewBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/interview-bookings")
@CrossOrigin(origins = "*")
public class InterviewBookingController {

    @Autowired
    private InterviewBookingService interviewBookingService;

    @GetMapping
    public ResponseEntity<List<InterviewBooking>> getAll(
            @RequestParam(name = "_page", defaultValue = "1") int page,
            @RequestParam(name = "_limit", defaultValue = "6") int limit) {

        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<InterviewBooking> ibPage = interviewBookingService.getInterviewBookingsPaginated(pageable);

        HttpHeaders headers = new HttpHeaders();
        headers.add("x-total-count", String.valueOf(ibPage.getTotalElements()));
        headers.add("Access-Control-Expose-Headers", "x-total-count");

        return ResponseEntity.ok().headers(headers).body(ibPage.getContent());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<InterviewBooking>> getByUserIdPaginated(
            @PathVariable Long userId,
            @RequestParam(name = "_page", required = false) Integer page,
            @RequestParam(name = "_limit", required = false) Integer limit) {
        
        if (page != null && limit != null) {
            Pageable pageable = PageRequest.of(page - 1, limit);
            Page<InterviewBooking> ibPage = interviewBookingService.getByUserIdPaginated(userId, pageable);
            HttpHeaders headers = new HttpHeaders();
            headers.add("x-total-count", String.valueOf(ibPage.getTotalElements()));
            headers.add("Access-Control-Expose-Headers", "x-total-count");
            return ResponseEntity.ok().headers(headers).body(ibPage.getContent());
        } else {
            return ResponseEntity.ok(interviewBookingService.getByUserId(userId));
        }
    }

    @GetMapping("/enterprise/{enterpriseId}")
    public ResponseEntity<List<InterviewBooking>> getByEnterpriseIdPaginated(
            @PathVariable Long enterpriseId,
            @RequestParam(name = "status", required = false, defaultValue = "all") String status,
            @RequestParam(name = "_page", required = false) Integer page,
            @RequestParam(name = "_limit", required = false) Integer limit) {
        
        if (page != null && limit != null) {
            Pageable pageable = PageRequest.of(page - 1, limit);
            Page<InterviewBooking> ibPage = interviewBookingService.getByEnterpriseIdPaginated(enterpriseId, status, pageable);
            HttpHeaders headers = new HttpHeaders();
            headers.add("x-total-count", String.valueOf(ibPage.getTotalElements()));
            headers.add("Access-Control-Expose-Headers", "x-total-count");
            return ResponseEntity.ok().headers(headers).body(ibPage.getContent());
        } else {
            return ResponseEntity.ok(interviewBookingService.getByEnterpriseId(enterpriseId));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterviewBooking> getById(@PathVariable Long id) {
        return interviewBookingService.getInterviewBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public InterviewBooking create(@RequestBody InterviewBooking ib) {
        return interviewBookingService.createInterviewBooking(ib);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InterviewBooking> update(@PathVariable Long id, @RequestBody InterviewBooking ib) {
        return interviewBookingService.updateInterviewBooking(id, ib)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<InterviewBooking> patch(@PathVariable Long id, @RequestBody InterviewBooking patch) {
        return interviewBookingService.updateInterviewBooking(id, patch)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (interviewBookingService.deleteInterviewBooking(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
