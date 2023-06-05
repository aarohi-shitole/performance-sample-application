package com.mycompany.performance.repository;

import com.mycompany.performance.domain.AppraisalReview;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AppraisalReview entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppraisalReviewRepository extends JpaRepository<AppraisalReview, Long>, JpaSpecificationExecutor<AppraisalReview> {}
