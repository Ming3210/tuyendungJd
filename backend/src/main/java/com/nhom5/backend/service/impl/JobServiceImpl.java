package com.nhom5.backend.service.impl;

import com.nhom5.backend.model.Job;
import com.nhom5.backend.repository.JobRepository;
import com.nhom5.backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    @Override
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    @Override
    public Optional<Job> updateJob(Long id, Job jobDetails) {
        return jobRepository.findById(id).map(job -> {
            job.setTitle(jobDetails.getTitle());
            job.setQuantity(jobDetails.getQuantity());
            job.setDescription(jobDetails.getDescription());
            job.setRank(jobDetails.getRank());
            job.setGender(jobDetails.getGender());
            job.setSkills(jobDetails.getSkills());
            job.setSalaryCurrent(jobDetails.getSalaryCurrent());
            job.setSalary(jobDetails.getSalary());
            job.setProvince(jobDetails.getProvince());
            job.setDistrict(jobDetails.getDistrict());
            job.setImage(jobDetails.getImage());
            job.setAddress(jobDetails.getAddress());
            job.setBenefitsDescription(jobDetails.getBenefitsDescription());
            job.setWorkingTime(jobDetails.getWorkingTime());
            job.setDeadline(jobDetails.getDeadline());
            job.setRequired(jobDetails.getRequired());
            job.setIndustry(jobDetails.getIndustry());
            job.setEnterpriseId(jobDetails.getEnterpriseId());
            job.setFlight(jobDetails.getFlight());
            job.setUpdateDate(jobDetails.getUpdateDate());
            return jobRepository.save(job);
        });
    }

    @Override
    public boolean deleteJob(Long id) {
        if (jobRepository.existsById(id)) {
            jobRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
