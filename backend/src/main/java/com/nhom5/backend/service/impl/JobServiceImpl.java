package com.nhom5.backend.service.impl;

import com.nhom5.backend.model.Job;
import com.nhom5.backend.model.Notification;
import com.nhom5.backend.model.CompanyFollow;
import com.nhom5.backend.repository.JobRepository;
import com.nhom5.backend.repository.NotificationRepository;
import com.nhom5.backend.repository.CompanyFollowRepository;
import com.nhom5.backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private CompanyFollowRepository companyFollowRepository;

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public Page<Job> getJobsPaginated(
            String flight, String industry, String province, Long enterpriseId, String title, 
            String experience, Boolean saturdayOff, String jobCategory, String companyType, 
            String rank, Double minSalary, Double maxSalary, Boolean negotiable,
            String jobLevel, String education, String searchMode,
            boolean random, Pageable pageable) {
        
        // Only use the native random query if it's a pure random request without ANY filters
        boolean hasFilters = (title != null && !title.isEmpty()) || 
                            (experience != null && !experience.isEmpty()) || 
                            (saturdayOff != null) || 
                            (jobCategory != null && !jobCategory.isEmpty()) || 
                            (rank != null && !rank.isEmpty()) ||
                            (industry != null && !industry.isEmpty()) ||
                             (province != null && !province.isEmpty()) ||
                             (enterpriseId != null) ||
                            (minSalary != null && minSalary > 0) || (maxSalary != null && maxSalary > 0) ||
                            (negotiable != null) ||
                            (jobLevel != null && !jobLevel.isEmpty()) ||
                            (education != null && !education.isEmpty());

        if (random) {
            String flightFilter = (flight != null && !flight.isEmpty()) ? flight : null;
            return jobRepository.findRandomJobsPaginated(
                flightFilter, industry, province, saturdayOff, experience, 
                minSalary, maxSalary, jobLevel, education, negotiable, 
                title, enterpriseId, searchMode, pageable);
        }

        Specification<Job> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // IMPORTANT: Join Enterprise for company name search
            jakarta.persistence.criteria.Join<Job, com.nhom5.backend.model.Enterprise> enterpriseJoin = root.join("enterprise", jakarta.persistence.criteria.JoinType.LEFT);

            if (flight != null && !flight.isEmpty()) {
                predicates.add(cb.equal(root.get("flight"), flight));
            }
            if (industry != null && !industry.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("industry")), "%" + industry.toLowerCase() + "%"));
            }
            if (province != null && !province.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("province")), "%" + province.toLowerCase() + "%"));
            }
            if (enterpriseId != null) {
                predicates.add(cb.equal(root.get("enterpriseId"), enterpriseId));
            }
            if (experience != null && !experience.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("experience")), "%" + experience.toLowerCase() + "%"));
            }
            if (saturdayOff != null) {
                predicates.add(cb.equal(root.get("saturdayOff"), saturdayOff));
            }
            if (jobCategory != null && !jobCategory.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("jobCategory")), "%" + jobCategory.toLowerCase() + "%"));
            }
            
            // Handle Rank (stored as JSON list in TEXT column)
            if (rank != null && !rank.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("rank")), "%" + rank.toLowerCase() + "%"));
            }

            // Overlap logic: Job.maxSalary >= requestedMin AND Job.minSalary <= requestedMax
            if (minSalary != null && minSalary > 0) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("maxSalary"), minSalary));
            }
            if (maxSalary != null && maxSalary > 0) {
                predicates.add(cb.lessThanOrEqualTo(root.get("minSalary"), maxSalary));
            }

            if (negotiable != null) {
                predicates.add(cb.equal(root.get("negotiable"), negotiable));
            }

            if (jobLevel != null && !jobLevel.isEmpty()) {
                predicates.add(cb.equal(cb.lower(root.get("jobLevel")), jobLevel.toLowerCase()));
            }

            if (education != null && !education.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("education")), "%" + education.toLowerCase() + "%"));
            }

            // Temporarily disabled deadline check to debug why jobs are not appearing
            /*
            jakarta.persistence.criteria.Expression<String> currentPath = root.get("deadline");
            predicates.add(cb.or(
                cb.isNull(currentPath),
                cb.equal(currentPath, ""),
                cb.greaterThanOrEqualTo(
                    cb.function("STR_TO_DATE", java.util.Date.class, currentPath, cb.literal("%d/%m/%Y")),
                    cb.currentDate()
                )
            ));
            */


            // Search Mode Logic with JOINed Enterprise Table
            if (title != null && !title.isEmpty()) {
                String searchPattern = "%" + title.toLowerCase() + "%";
                if ("company".equals(searchMode)) {
                    // Search in Enterprise title (name)
                    predicates.add(cb.like(cb.lower(enterpriseJoin.get("title")), searchPattern));
                } else if ("both".equals(searchMode)) {
                    predicates.add(cb.or(
                        cb.like(cb.lower(root.get("title")), searchPattern),
                        cb.like(cb.lower(enterpriseJoin.get("title")), searchPattern)
                    ));
                } else {
                    predicates.add(cb.like(cb.lower(root.get("title")), searchPattern));
                }
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return jobRepository.findAll(spec, pageable);
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
    @Transactional
    public Job createJob(Job job) {
        Job savedJob = jobRepository.save(job);
        
        // Notify followers
        if (savedJob.getEnterpriseId() != null) {
            try {
                Long entId = savedJob.getEnterpriseId();
                List<CompanyFollow> followers = companyFollowRepository.findByEnterpriseId(entId);
                for (CompanyFollow follower : followers) {
                    Notification notification = new Notification();
                    notification.setUserId(follower.getUserId());
                    notification.setTitle("Công ty bạn theo dõi có việc làm mới");
                    notification.setMessage("Công ty vừa đăng tuyển vị trí: " + savedJob.getTitle());
                    notification.setType("JOB");
                    notification.setRelatedId(savedJob.getId());
                    notificationRepository.save(notification);
                }
            } catch (Exception e) {
                // Log error or ignore
            }
        }
        
        return savedJob;
    }

    @Override
    public Optional<Job> updateJob(Long id, Job jobDetails) {
        return jobRepository.findById(id).map(job -> {
            job.setTitle(jobDetails.getTitle());
            job.setQuantity(jobDetails.getQuantity());
            job.setDescription(jobDetails.getDescription());
            job.setRank(jobDetails.getRank());
            job.setGender(jobDetails.getGender());
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
            job.setMinSalary(jobDetails.getMinSalary());
            job.setMaxSalary(jobDetails.getMaxSalary());
            job.setJobCategory(jobDetails.getJobCategory());
            job.setNegotiable(jobDetails.getNegotiable());
            job.setJobLevel(jobDetails.getJobLevel());
            job.setEducation(jobDetails.getEducation());
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
