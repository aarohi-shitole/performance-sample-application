package com.mycompany.performance.service.mapper;

import com.mycompany.performance.domain.MasterPerformanceIndicator;
import com.mycompany.performance.domain.PerformanceIndicator;
import com.mycompany.performance.service.dto.MasterPerformanceIndicatorDTO;
import com.mycompany.performance.service.dto.PerformanceIndicatorDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PerformanceIndicator} and its DTO {@link PerformanceIndicatorDTO}.
 */
@Mapper(componentModel = "spring")
public interface PerformanceIndicatorMapper extends EntityMapper<PerformanceIndicatorDTO, PerformanceIndicator> {
    @Mapping(target = "masterPerformanceIndicator", source = "masterPerformanceIndicator", qualifiedByName = "masterPerformanceIndicatorId")
    PerformanceIndicatorDTO toDto(PerformanceIndicator s);

    @Named("masterPerformanceIndicatorId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    MasterPerformanceIndicatorDTO toDtoMasterPerformanceIndicatorId(MasterPerformanceIndicator masterPerformanceIndicator);
}
