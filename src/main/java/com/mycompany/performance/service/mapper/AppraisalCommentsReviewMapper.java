package com.mycompany.performance.service.mapper;

import com.mycompany.performance.domain.AppraisalCommentsReview;
import com.mycompany.performance.domain.Employee;
import com.mycompany.performance.service.dto.AppraisalCommentsReviewDTO;
import com.mycompany.performance.service.dto.EmployeeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AppraisalCommentsReview} and its DTO {@link AppraisalCommentsReviewDTO}.
 */
@Mapper(componentModel = "spring")
public interface AppraisalCommentsReviewMapper extends EntityMapper<AppraisalCommentsReviewDTO, AppraisalCommentsReview> {
    @Mapping(target = "employee", source = "employee", qualifiedByName = "employeeId")
    AppraisalCommentsReviewDTO toDto(AppraisalCommentsReview s);

    @Named("employeeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EmployeeDTO toDtoEmployeeId(Employee employee);
}
