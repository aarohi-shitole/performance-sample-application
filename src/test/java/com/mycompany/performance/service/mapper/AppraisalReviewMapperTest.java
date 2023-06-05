package com.mycompany.performance.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AppraisalReviewMapperTest {

    private AppraisalReviewMapper appraisalReviewMapper;

    @BeforeEach
    public void setUp() {
        appraisalReviewMapper = new AppraisalReviewMapperImpl();
    }
}
