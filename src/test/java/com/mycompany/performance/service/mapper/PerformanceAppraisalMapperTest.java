package com.mycompany.performance.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PerformanceAppraisalMapperTest {

    private PerformanceAppraisalMapper performanceAppraisalMapper;

    @BeforeEach
    public void setUp() {
        performanceAppraisalMapper = new PerformanceAppraisalMapperImpl();
    }
}
