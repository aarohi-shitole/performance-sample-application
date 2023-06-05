package com.mycompany.performance.repository;

import com.mycompany.performance.domain.MasterPerformanceIndicator;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the MasterPerformanceIndicator entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MasterPerformanceIndicatorRepository
    extends JpaRepository<MasterPerformanceIndicator, Long>, JpaSpecificationExecutor<MasterPerformanceIndicator> {}
