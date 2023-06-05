package com.mycompany.performance.repository;

import com.mycompany.performance.domain.AppraisalEvaluationParameter;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AppraisalEvaluationParameter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppraisalEvaluationParameterRepository
    extends JpaRepository<AppraisalEvaluationParameter, Long>, JpaSpecificationExecutor<AppraisalEvaluationParameter> {}
