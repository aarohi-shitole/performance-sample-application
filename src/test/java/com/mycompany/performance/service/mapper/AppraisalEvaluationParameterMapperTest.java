package com.mycompany.performance.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AppraisalEvaluationParameterMapperTest {

    private AppraisalEvaluationParameterMapper appraisalEvaluationParameterMapper;

    @BeforeEach
    public void setUp() {
        appraisalEvaluationParameterMapper = new AppraisalEvaluationParameterMapperImpl();
    }
}
