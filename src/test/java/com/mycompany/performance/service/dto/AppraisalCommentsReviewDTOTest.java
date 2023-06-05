package com.mycompany.performance.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.performance.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AppraisalCommentsReviewDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AppraisalCommentsReviewDTO.class);
        AppraisalCommentsReviewDTO appraisalCommentsReviewDTO1 = new AppraisalCommentsReviewDTO();
        appraisalCommentsReviewDTO1.setId(1L);
        AppraisalCommentsReviewDTO appraisalCommentsReviewDTO2 = new AppraisalCommentsReviewDTO();
        assertThat(appraisalCommentsReviewDTO1).isNotEqualTo(appraisalCommentsReviewDTO2);
        appraisalCommentsReviewDTO2.setId(appraisalCommentsReviewDTO1.getId());
        assertThat(appraisalCommentsReviewDTO1).isEqualTo(appraisalCommentsReviewDTO2);
        appraisalCommentsReviewDTO2.setId(2L);
        assertThat(appraisalCommentsReviewDTO1).isNotEqualTo(appraisalCommentsReviewDTO2);
        appraisalCommentsReviewDTO1.setId(null);
        assertThat(appraisalCommentsReviewDTO1).isNotEqualTo(appraisalCommentsReviewDTO2);
    }
}
