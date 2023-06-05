package com.mycompany.performance.service.mapper;

import com.mycompany.performance.domain.MasterPerformanceIndicator;
import com.mycompany.performance.service.dto.MasterPerformanceIndicatorDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link MasterPerformanceIndicator} and its DTO {@link MasterPerformanceIndicatorDTO}.
 */
@Mapper(componentModel = "spring")
public interface MasterPerformanceIndicatorMapper extends EntityMapper<MasterPerformanceIndicatorDTO, MasterPerformanceIndicator> {}
