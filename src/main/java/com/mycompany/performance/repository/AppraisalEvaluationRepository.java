package com.mycompany.performance.repository;

import com.mycompany.performance.domain.AppraisalEvaluation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AppraisalEvaluation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppraisalEvaluationRepository
    extends JpaRepository<AppraisalEvaluation, Long>, JpaSpecificationExecutor<AppraisalEvaluation> {}
