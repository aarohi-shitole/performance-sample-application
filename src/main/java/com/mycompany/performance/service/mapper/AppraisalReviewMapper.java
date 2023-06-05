package com.mycompany.performance.service.mapper;

import com.mycompany.performance.domain.AppraisalReview;
import com.mycompany.performance.domain.Employee;
import com.mycompany.performance.service.dto.AppraisalReviewDTO;
import com.mycompany.performance.service.dto.EmployeeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AppraisalReview} and its DTO {@link AppraisalReviewDTO}.
 */
@Mapper(componentModel = "spring")
public interface AppraisalReviewMapper extends EntityMapper<AppraisalReviewDTO, AppraisalReview> {
    @Mapping(target = "employee", source = "employee", qualifiedByName = "employeeId")
    AppraisalReviewDTO toDto(AppraisalReview s);

    @Named("employeeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EmployeeDTO toDtoEmployeeId(Employee employee);
}
