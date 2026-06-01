package com.nhom5.backend.repository;

import com.nhom5.backend.model.Enterprise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EnterpriseRepository extends JpaRepository<Enterprise, Long> {
    List<Enterprise> findByUserId(Long userId);

    @Query(value = "SELECT * FROM enterprises WHERE " +
           "(:industry IS NULL OR industry LIKE CONCAT('%', :industry, '%')) " +
           "ORDER BY RAND()", 
           countQuery = "SELECT count(*) FROM enterprises WHERE " +
           "(:industry IS NULL OR industry LIKE CONCAT('%', :industry, '%'))", 
           nativeQuery = true)
    Page<Enterprise> findRandomEnterprisesPaginated(@Param("industry") String industry, Pageable pageable);

    @Query(value = "SELECT * FROM enterprises WHERE " +
           "(:industry IS NULL OR :industry = '' OR industry LIKE CONCAT('%', :industry, '%'))",
           countQuery = "SELECT count(*) FROM enterprises WHERE " +
           "(:industry IS NULL OR :industry = '' OR industry LIKE CONCAT('%', :industry, '%'))",
           nativeQuery = true)
    Page<Enterprise> findEnterprisesFilteredPaginated(@Param("industry") String industry, Pageable pageable);

    List<Enterprise> findByIdIn(List<Long> ids);
}
