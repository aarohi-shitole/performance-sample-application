package com.mycompany.performance.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PerformanceIndicatorMapperTest {

    private PerformanceIndicatorMapper performanceIndicatorMapper;

    @BeforeEach
    public void setUp() {
        performanceIndicatorMapper = new PerformanceIndicatorMapperImpl();
    }
}
