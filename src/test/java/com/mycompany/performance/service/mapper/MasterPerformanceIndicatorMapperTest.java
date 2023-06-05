package com.mycompany.performance.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MasterPerformanceIndicatorMapperTest {

    private MasterPerformanceIndicatorMapper masterPerformanceIndicatorMapper;

    @BeforeEach
    public void setUp() {
        masterPerformanceIndicatorMapper = new MasterPerformanceIndicatorMapperImpl();
    }
}
