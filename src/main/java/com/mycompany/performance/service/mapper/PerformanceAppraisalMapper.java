package com.mycompany.performance.service.mapper;

import com.mycompany.performance.domain.AppraisalReview;
import com.mycompany.performance.domain.PerformanceAppraisal;
import com.mycompany.performance.service.dto.AppraisalReviewDTO;
import com.mycompany.performance.service.dto.PerformanceAppraisalDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PerformanceAppraisal} and its DTO {@link PerformanceAppraisalDTO}.
 */
@Mapper(componentModel = "spring")
public interface PerformanceAppraisalMapper extends EntityMapper<PerformanceAppraisalDTO, PerformanceAppraisal> {
    @Mapping(target = "appraisalReview", source = "appraisalReview", qualifiedByName = "appraisalReviewId")
    PerformanceAppraisalDTO toDto(PerformanceAppraisal s);

    @Named("appraisalReviewId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AppraisalReviewDTO toDtoAppraisalReviewId(AppraisalReview appraisalReview);
}
