package com.nhom5.backend.service.impl;

import com.nhom5.backend.model.Job;
import com.nhom5.backend.repository.JobRepository;
import com.nhom5.backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<Job> getJobsPaginated(String flight, String industry, String province, String enterpriseId, String title, boolean random, Pageable pageable) {
        String industryFilter = (industry != null && !industry.isEmpty()) ? industry : null;
        String provinceFilter = (province != null && !province.isEmpty()) ? province : null;
        String flightFilter = (flight != null && !flight.isEmpty()) ? flight : null;
        String enterpriseIdFilter = (enterpriseId != null && !enterpriseId.isEmpty()) ? enterpriseId : null;
        String titleFilter = (title != null && !title.isEmpty()) ? title : null;

        if (random) {
            return jobRepository.findRandomJobsPaginated(flightFilter, industryFilter, provinceFilter, pageable);
        }

        return jobRepository.findJobsFilteredPaginated(
                flightFilter, 
                industryFilter, 
                provinceFilter, 
                enterpriseIdFilter, 
                titleFilter, 
                pageable);
    }

    @Override
    public List<Job> getRandomJobs(String flight, String industry, String province, int limit) {
        return jobRepository.findRandomJobs(flight, industry, province, limit);
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
    public List<Job> getJobsByIds(List<Long> ids) {
        return jobRepository.findByIdIn(ids);
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
