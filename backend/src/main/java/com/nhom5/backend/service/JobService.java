package com.nhom5.backend.service;

import com.nhom5.backend.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface JobService {
    List<Job> getAllJobs();
    Page<Job> getJobsPaginated(String flight, String industry, String province, String enterpriseId, String title, boolean random, Pageable pageable);
    List<Job> getRandomJobs(String flight, String industry, String province, int limit);
    Optional<Job> getJobById(Long id);
    Job createJob(Job job);
    Optional<Job> updateJob(Long id, Job jobDetails);
    List<Job> getJobsByIds(List<Long> ids);
    boolean deleteJob(Long id);
}
