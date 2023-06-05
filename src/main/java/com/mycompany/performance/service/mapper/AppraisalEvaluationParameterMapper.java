package com.mycompany.performance.service.mapper;

import com.mycompany.performance.domain.AppraisalEvaluationParameter;
import com.mycompany.performance.service.dto.AppraisalEvaluationParameterDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AppraisalEvaluationParameter} and its DTO {@link AppraisalEvaluationParameterDTO}.
 */
@Mapper(componentModel = "spring")
public interface AppraisalEvaluationParameterMapper extends EntityMapper<AppraisalEvaluationParameterDTO, AppraisalEvaluationParameter> {}
