package com.nhom5.backend.repository;

import com.nhom5.backend.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long>, JpaSpecificationExecutor<Job> {
    Page<Job> findByEnterpriseId(Long enterpriseId, Pageable pageable);
    Page<Job> findByEnterpriseIdAndFlight(Long enterpriseId, String flight, Pageable pageable);

    @Query(value = "SELECT * FROM jobs WHERE (:flight IS NULL OR flight = :flight) " +
           "AND (:industry IS NULL OR industry LIKE CONCAT('%', :industry, '%')) " +
           "AND (:province IS NULL OR province LIKE CONCAT('%', :province, '%')) " +
           "ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Job> findRandomJobs(@Param("flight") String flight, 
                             @Param("industry") String industry, 
                             @Param("province") String province, 
                             @Param("limit") int limit);

    @Query(value = "SELECT j.* FROM jobs j " +
           "LEFT JOIN enterprises e ON j.enterprise_id = e.id " +
           "WHERE (:flight IS NULL OR :flight = '' OR j.flight = :flight) " +
           "AND (:industry IS NULL OR :industry = '' OR j.industry LIKE CONCAT('%', :industry, '%')) " +
           "AND (:province IS NULL OR :province = '' OR j.province LIKE CONCAT('%', :province, '%')) " +
           "AND (:saturdayOff IS NULL OR j.saturday_off = :saturdayOff) " +
           "AND (:experience IS NULL OR :experience = '' OR j.experience = :experience) " +
           "AND (:salaryMin IS NULL OR j.max_salary >= :salaryMin) " +
           "AND (:salaryMax IS NULL OR j.min_salary <= :salaryMax) " +
           "AND (:jobLevel IS NULL OR :jobLevel = '' OR j.job_level = :jobLevel) " +
           "AND (:education IS NULL OR :education = '' OR j.education LIKE CONCAT('%', :education, '%')) " +
           "AND (:negotiable IS NULL OR j.negotiable = :negotiable) " +
           "AND (:enterpriseId IS NULL OR j.enterprise_id = :enterpriseId) " +
           "AND (:title IS NULL OR :title = '' OR (" +
           "   (:searchMode = 'title' AND j.title LIKE CONCAT('%', :title, '%')) OR " +
           "   (:searchMode = 'company' AND e.title LIKE CONCAT('%', :title, '%')) OR " +
           "   (:searchMode = 'both' AND (j.title LIKE CONCAT('%', :title, '%') OR e.title LIKE CONCAT('%', :title, '%'))) OR " +
           "   (:searchMode IS NULL AND j.title LIKE CONCAT('%', :title, '%'))" +
           ")) " +
           "ORDER BY RAND()", 
           countQuery = "SELECT count(*) FROM jobs j " +
           "LEFT JOIN enterprises e ON j.enterprise_id = e.id " +
           "WHERE (:flight IS NULL OR :flight = '' OR j.flight = :flight) " +
           "AND (:industry IS NULL OR :industry = '' OR j.industry LIKE CONCAT('%', :industry, '%')) " +
           "AND (:province IS NULL OR :province = '' OR j.province LIKE CONCAT('%', :province, '%')) " +
           "AND (:saturdayOff IS NULL OR j.saturday_off = :saturdayOff) " +
           "AND (:experience IS NULL OR :experience = '' OR j.experience = :experience) " +
           "AND (:salaryMin IS NULL OR j.max_salary >= :salaryMin) " +
           "AND (:salaryMax IS NULL OR j.min_salary <= :salaryMax) " +
           "AND (:jobLevel IS NULL OR :jobLevel = '' OR j.job_level = :jobLevel) " +
           "AND (:education IS NULL OR :education = '' OR j.education LIKE CONCAT('%', :education, '%')) " +
           "AND (:negotiable IS NULL OR j.negotiable = :negotiable) " +
           "AND (:enterpriseId IS NULL OR j.enterprise_id = :enterpriseId) " +
           "AND (:title IS NULL OR :title = '' OR (" +
           "   (:searchMode = 'title' AND j.title LIKE CONCAT('%', :title, '%')) OR " +
           "   (:searchMode = 'company' AND e.title LIKE CONCAT('%', :title, '%')) OR " +
           "   (:searchMode = 'both' AND (j.title LIKE CONCAT('%', :title, '%') OR e.title LIKE CONCAT('%', :title, '%'))) OR " +
           "   (:searchMode IS NULL AND j.title LIKE CONCAT('%', :title, '%'))" +
           "))",
           nativeQuery = true)
    Page<Job> findRandomJobsPaginated(@Param("flight") String flight, 
                                     @Param("industry") String industry, 
                                     @Param("province") String province, 
                                     @Param("saturdayOff") Boolean saturdayOff,
                                     @Param("experience") String experience,
                                     @Param("salaryMin") Double salaryMin,
                                     @Param("salaryMax") Double salaryMax,
                                     @Param("jobLevel") String jobLevel,
                                     @Param("education") String education,
                                     @Param("negotiable") Boolean negotiable,
                                     @Param("title") String title,
                                     @Param("enterpriseId") Long enterpriseId,
                                     @Param("searchMode") String searchMode,
                                     Pageable pageable);

    @Query(value = "SELECT j.* FROM jobs j WHERE (:flight IS NULL OR :flight = '' OR j.flight = :flight) " +
           "AND (:industry IS NULL OR :industry = '' OR j.industry LIKE CONCAT('%', :industry, '%')) " +
           "AND (:province IS NULL OR :province = '' OR j.province LIKE CONCAT('%', :province, '%')) " +
           "AND (:enterpriseId IS NULL OR j.enterprise_id = :enterpriseId) " +
           "AND (:title IS NULL OR :title = '' OR j.title LIKE CONCAT('%', :title, '%')) " +
           "AND (:saturdayOff IS NULL OR j.saturday_off = :saturdayOff) " +
           "AND (:experience IS NULL OR :experience = '' OR j.experience = :experience) " +
           "AND (:salaryMin IS NULL OR j.max_salary >= :salaryMin) " +
           "AND (:salaryMax IS NULL OR j.min_salary <= :salaryMax) " +
           "AND (:jobLevel IS NULL OR :jobLevel = '' OR j.job_level = :jobLevel) " +
           "AND (:education IS NULL OR :education = '' OR j.education LIKE CONCAT('%', :education, '%')) " +
           "AND (:negotiable IS NULL OR j.negotiable = :negotiable)",
           countQuery = "SELECT count(*) FROM jobs j WHERE (:flight IS NULL OR :flight = '' OR j.flight = :flight) " +
           "AND (:industry IS NULL OR :industry = '' OR j.industry LIKE CONCAT('%', :industry, '%')) " +
           "AND (:province IS NULL OR :province = '' OR j.province LIKE CONCAT('%', :province, '%')) " +
           "AND (:enterpriseId IS NULL OR j.enterprise_id = :enterpriseId) " +
           "AND (:title IS NULL OR :title = '' OR j.title LIKE CONCAT('%', :title, '%')) " +
           "AND (:saturdayOff IS NULL OR j.saturday_off = :saturdayOff) " +
           "AND (:experience IS NULL OR :experience = '' OR j.experience = :experience) " +
           "AND (:salaryMin IS NULL OR j.max_salary >= :salaryMin) " +
           "AND (:salaryMax IS NULL OR j.min_salary <= :salaryMax) " +
           "AND (:jobLevel IS NULL OR :jobLevel = '' OR j.job_level = :jobLevel) " +
           "AND (:education IS NULL OR :education = '' OR j.education LIKE CONCAT('%', :education, '%')) " +
           "AND (:negotiable IS NULL OR j.negotiable = :negotiable)",
           nativeQuery = true)
    Page<Job> findJobsFilteredPaginated(@Param("flight") String flight, 
                                       @Param("industry") String industry, 
                                       @Param("province") String province, 
                                       @Param("enterpriseId") Long enterpriseId,
                                       @Param("title") String title,
                                       @Param("saturdayOff") Boolean saturdayOff,
                                       @Param("experience") String experience,
                                       @Param("salaryMin") Double salaryMin,
                                       @Param("salaryMax") Double salaryMax,
                                       @Param("jobLevel") String jobLevel,
                                       @Param("education") String education,
                                       @Param("negotiable") Boolean negotiable,
                                       Pageable pageable);

    Page<Job> findByFlight(String flight, Pageable pageable);
    
    Page<Job> findByFlightAndIndustryContainingAndProvinceContaining(
            String flight, String industry, String province, Pageable pageable);

    Page<Job> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    
    Page<Job> findByFlightAndTitleContainingIgnoreCase(String flight, String title, Pageable pageable);

    List<Job> findByIdIn(List<Long> ids);
}
