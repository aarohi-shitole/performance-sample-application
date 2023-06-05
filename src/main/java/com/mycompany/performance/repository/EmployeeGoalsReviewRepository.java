package com.mycompany.performance.repository;

import com.mycompany.performance.domain.EmployeeGoalsReview;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the EmployeeGoalsReview entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeGoalsReviewRepository
    extends JpaRepository<EmployeeGoalsReview, Long>, JpaSpecificationExecutor<EmployeeGoalsReview> {}
