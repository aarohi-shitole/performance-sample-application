package com.mycompany.performance.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class EmployeeGoalsReviewMapperTest {

    private EmployeeGoalsReviewMapper employeeGoalsReviewMapper;

    @BeforeEach
    public void setUp() {
        employeeGoalsReviewMapper = new EmployeeGoalsReviewMapperImpl();
    }
}
