package com.mycompany.performance.service.mapper;

import com.mycompany.performance.domain.AppraisalEvaluation;
import com.mycompany.performance.domain.AppraisalEvaluationParameter;
import com.mycompany.performance.service.dto.AppraisalEvaluationDTO;
import com.mycompany.performance.service.dto.AppraisalEvaluationParameterDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AppraisalEvaluation} and its DTO {@link AppraisalEvaluationDTO}.
 */
@Mapper(componentModel = "spring")
public interface AppraisalEvaluationMapper extends EntityMapper<AppraisalEvaluationDTO, AppraisalEvaluation> {
    @Mapping(
        target = "appraisalEvaluationParameter",
        source = "appraisalEvaluationParameter",
        qualifiedByName = "appraisalEvaluationParameterId"
    )
    AppraisalEvaluationDTO toDto(AppraisalEvaluation s);

    @Named("appraisalEvaluationParameterId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AppraisalEvaluationParameterDTO toDtoAppraisalEvaluationParameterId(AppraisalEvaluationParameter appraisalEvaluationParameter);
}
