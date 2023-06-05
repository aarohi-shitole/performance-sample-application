package com.mycompany.performance.service.mapper;

import com.mycompany.performance.domain.EmployeeGoalsReview;
import com.mycompany.performance.service.dto.EmployeeGoalsReviewDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EmployeeGoalsReview} and its DTO {@link EmployeeGoalsReviewDTO}.
 */
@Mapper(componentModel = "spring")
public interface EmployeeGoalsReviewMapper extends EntityMapper<EmployeeGoalsReviewDTO, EmployeeGoalsReview> {}
