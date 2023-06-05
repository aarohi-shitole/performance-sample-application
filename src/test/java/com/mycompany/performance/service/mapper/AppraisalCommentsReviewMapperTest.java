package com.mycompany.performance.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AppraisalCommentsReviewMapperTest {

    private AppraisalCommentsReviewMapper appraisalCommentsReviewMapper;

    @BeforeEach
    public void setUp() {
        appraisalCommentsReviewMapper = new AppraisalCommentsReviewMapperImpl();
    }
}
