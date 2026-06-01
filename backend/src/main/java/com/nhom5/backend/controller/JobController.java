package com.nhom5.backend.controller;

import com.nhom5.backend.model.Job;
import com.nhom5.backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs(
            @RequestParam(name = "_page", defaultValue = "1") int page,
            @RequestParam(name = "_limit", defaultValue = "6") int limit,
            @RequestParam(name = "industry", required = false) String industry,
            @RequestParam(name = "province", required = false) String province,
            @RequestParam(name = "flight", required = false) String flight,
            @RequestParam(name = "enterpriseId", required = false) Long enterpriseId,
            @RequestParam(name = "title", required = false) String title,
            @RequestParam(name = "experience", required = false) String experience,
            @RequestParam(name = "saturdayOff", required = false) Boolean saturdayOff,
            @RequestParam(name = "jobCategory", required = false) String jobCategory,
            @RequestParam(name = "rank", required = false) String rank,
            @RequestParam(name = "salaryMin", required = false) Double salaryMin,
            @RequestParam(name = "salaryMax", required = false) Double salaryMax,
            @RequestParam(name = "negotiable", required = false) Boolean negotiable,
            @RequestParam(name = "jobLevel", required = false) String jobLevel,
            @RequestParam(name = "education", required = false) String education,
            @RequestParam(name = "searchMode", required = false) String searchMode,
            @RequestParam(name = "_sort", required = false) String sort) {
        
        boolean random = "random".equals(sort);

        // Standard Pagination (1-indexed to 0-indexed conversion)
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<Job> jobPage = jobService.getJobsPaginated(
            flight, industry, province, enterpriseId, title, 
            experience, saturdayOff, jobCategory, null,
            rank, salaryMin, salaryMax, negotiable,
            jobLevel, education, searchMode,
            random, pageable);
        
        HttpHeaders headers = new HttpHeaders();
        headers.add("x-total-count", String.valueOf(jobPage.getTotalElements()));
        headers.add("Access-Control-Expose-Headers", "x-total-count");
        
        return ResponseEntity.ok().headers(headers).body(jobPage.getContent());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        return jobService.getJobById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ids")
    public List<Job> getJobsByIds(@RequestParam List<Long> ids) {
        return jobService.getJobsByIds(ids);
    }

    @PostMapping
    public Job createJob(@RequestBody Job job) {
        return jobService.createJob(job);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Job> patchJob(@PathVariable Long id, @RequestBody Job patch) {
        return jobService.getJobById(id).map(existing -> {
            if (patch.getTitle() != null) existing.setTitle(patch.getTitle());
            if (patch.getQuantity() != null) existing.setQuantity(patch.getQuantity());
            if (patch.getDescription() != null) existing.setDescription(patch.getDescription());
            if (patch.getRank() != null) existing.setRank(patch.getRank());
            if (patch.getGender() != null) existing.setGender(patch.getGender());
            if (patch.getSalaryCurrent() != null) existing.setSalaryCurrent(patch.getSalaryCurrent());
            if (patch.getSalary() != null) existing.setSalary(patch.getSalary());
            if (patch.getProvince() != null) existing.setProvince(patch.getProvince());
            if (patch.getDistrict() != null) existing.setDistrict(patch.getDistrict());
            if (patch.getImage() != null) existing.setImage(patch.getImage());
            if (patch.getAddress() != null) existing.setAddress(patch.getAddress());
            if (patch.getBenefitsDescription() != null) existing.setBenefitsDescription(patch.getBenefitsDescription());
            if (patch.getWorkingTime() != null) existing.setWorkingTime(patch.getWorkingTime());
            if (patch.getDeadline() != null) existing.setDeadline(patch.getDeadline());
            if (patch.getRequired() != null) existing.setRequired(patch.getRequired());
            if (patch.getIndustry() != null) existing.setIndustry(patch.getIndustry());
            if (patch.getEnterpriseId() != null) existing.setEnterpriseId(patch.getEnterpriseId());
            if (patch.getFlight() != null) existing.setFlight(patch.getFlight());
            if (patch.getUpdateDate() != null) existing.setUpdateDate(patch.getUpdateDate());
            if (patch.getSaturdayOff() != null) existing.setSaturdayOff(patch.getSaturdayOff());
            if (patch.getMinSalary() != null) existing.setMinSalary(patch.getMinSalary());
            if (patch.getMaxSalary() != null) existing.setMaxSalary(patch.getMaxSalary());
            if (patch.getNegotiable() != null) existing.setNegotiable(patch.getNegotiable());
            if (patch.getJobLevel() != null) existing.setJobLevel(patch.getJobLevel());
            if (patch.getEducation() != null) existing.setEducation(patch.getEducation());
            
            return ResponseEntity.ok(jobService.createJob(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        if (jobService.deleteJob(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
