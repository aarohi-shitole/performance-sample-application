package com.mycompany.performance.repository;

import com.mycompany.performance.domain.AppraisalCommentsReview;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AppraisalCommentsReview entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppraisalCommentsReviewRepository
    extends JpaRepository<AppraisalCommentsReview, Long>, JpaSpecificationExecutor<AppraisalCommentsReview> {}
