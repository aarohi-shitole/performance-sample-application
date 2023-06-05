package com.mycompany.performance.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AppraisalEvaluationMapperTest {

    private AppraisalEvaluationMapper appraisalEvaluationMapper;

    @BeforeEach
    public void setUp() {
        appraisalEvaluationMapper = new AppraisalEvaluationMapperImpl();
    }
}
