package com.mycompany.performance.repository;

import com.mycompany.performance.domain.PerformanceAppraisal;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the PerformanceAppraisal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerformanceAppraisalRepository
    extends JpaRepository<PerformanceAppraisal, Long>, JpaSpecificationExecutor<PerformanceAppraisal> {}
