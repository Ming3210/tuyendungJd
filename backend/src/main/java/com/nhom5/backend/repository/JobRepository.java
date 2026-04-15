package com.nhom5.backend.repository;

import com.nhom5.backend.model.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    Page<Job> findByEnterpriseId(String enterpriseId, Pageable pageable);
    Page<Job> findByEnterpriseIdAndFlight(String enterpriseId, String flight, Pageable pageable);

    @Query(value = "SELECT * FROM jobs WHERE (:flight IS NULL OR flight = :flight) " +
           "AND (:industry IS NULL OR industry LIKE %:industry%) " +
           "AND (:province IS NULL OR province LIKE %:province%) " +
           "ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Job> findRandomJobs(@Param("flight") String flight, 
                             @Param("industry") String industry, 
                             @Param("province") String province, 
                             @Param("limit") int limit);

    @Query(value = "SELECT * FROM jobs WHERE (:flight IS NULL OR flight = :flight) " +
           "AND (:industry IS NULL OR industry LIKE %:industry%) " +
           "AND (:province IS NULL OR province LIKE %:province%) " +
           "ORDER BY RAND()", 
           countQuery = "SELECT count(*) FROM jobs WHERE (:flight IS NULL OR flight = :flight) " +
           "AND (:industry IS NULL OR industry LIKE %:industry%) " +
           "AND (:province IS NULL OR province LIKE %:province%)",
           nativeQuery = true)
    Page<Job> findRandomJobsPaginated(@Param("flight") String flight, 
                                     @Param("industry") String industry, 
                                     @Param("province") String province, 
                                     Pageable pageable);

    @Query(value = "SELECT * FROM jobs WHERE (:flight IS NULL OR flight = :flight) " +
           "AND (:industry IS NULL OR industry LIKE %:industry%) " +
           "AND (:province IS NULL OR province LIKE %:province%) " +
           "AND (:enterpriseId IS NULL OR enterprise_id = :enterpriseId) " +
           "AND (:title IS NULL OR title LIKE %:title%)",
           countQuery = "SELECT count(*) FROM jobs WHERE (:flight IS NULL OR flight = :flight) " +
           "AND (:industry IS NULL OR industry LIKE %:industry%) " +
           "AND (:province IS NULL OR province LIKE %:province%) " +
           "AND (:enterpriseId IS NULL OR enterprise_id = :enterpriseId) " +
           "AND (:title IS NULL OR title LIKE %:title%)",
           nativeQuery = true)
    Page<Job> findJobsFilteredPaginated(@Param("flight") String flight, 
                                       @Param("industry") String industry, 
                                       @Param("province") String province, 
                                       @Param("enterpriseId") String enterpriseId,
                                       @Param("title") String title,
                                       Pageable pageable);

    Page<Job> findByFlight(String flight, Pageable pageable);
    
    Page<Job> findByFlightAndIndustryContainingAndProvinceContaining(
            String flight, String industry, String province, Pageable pageable);

    Page<Job> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    
    Page<Job> findByFlightAndTitleContainingIgnoreCase(String flight, String title, Pageable pageable);

    List<Job> findByIdIn(List<Long> ids);
}
