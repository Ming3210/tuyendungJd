package com.nhom5.backend.service;

import com.nhom5.backend.model.Job;
import java.util.List;
import java.util.Optional;

public interface JobService {
    List<Job> getAllJobs();
    Optional<Job> getJobById(Long id);
    Job createJob(Job job);
    Optional<Job> updateJob(Long id, Job jobDetails);
    boolean deleteJob(Long id);
}
