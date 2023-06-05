package com.mycompany.performance.service.mapper;

import com.mycompany.performance.domain.PerformanceIndicator;
import com.mycompany.performance.domain.PerformanceReview;
import com.mycompany.performance.service.dto.PerformanceIndicatorDTO;
import com.mycompany.performance.service.dto.PerformanceReviewDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PerformanceReview} and its DTO {@link PerformanceReviewDTO}.
 */
@Mapper(componentModel = "spring")
public interface PerformanceReviewMapper extends EntityMapper<PerformanceReviewDTO, PerformanceReview> {
    @Mapping(target = "performanceIndicator", source = "performanceIndicator", qualifiedByName = "performanceIndicatorId")
    PerformanceReviewDTO toDto(PerformanceReview s);

    @Named("performanceIndicatorId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    PerformanceIndicatorDTO toDtoPerformanceIndicatorId(PerformanceIndicator performanceIndicator);
}
