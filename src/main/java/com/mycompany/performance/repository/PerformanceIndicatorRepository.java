package com.mycompany.performance.repository;

import com.mycompany.performance.domain.PerformanceIndicator;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the PerformanceIndicator entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerformanceIndicatorRepository
    extends JpaRepository<PerformanceIndicator, Long>, JpaSpecificationExecutor<PerformanceIndicator> {}
