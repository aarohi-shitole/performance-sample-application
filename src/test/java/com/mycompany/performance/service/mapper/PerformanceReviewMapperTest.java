package com.mycompany.performance.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PerformanceReviewMapperTest {

    private PerformanceReviewMapper performanceReviewMapper;

    @BeforeEach
    public void setUp() {
        performanceReviewMapper = new PerformanceReviewMapperImpl();
    }
}
