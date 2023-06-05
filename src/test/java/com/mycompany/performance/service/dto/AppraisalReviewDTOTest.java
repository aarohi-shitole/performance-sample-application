package com.mycompany.performance.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.performance.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AppraisalReviewDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AppraisalReviewDTO.class);
        AppraisalReviewDTO appraisalReviewDTO1 = new AppraisalReviewDTO();
        appraisalReviewDTO1.setId(1L);
        AppraisalReviewDTO appraisalReviewDTO2 = new AppraisalReviewDTO();
        assertThat(appraisalReviewDTO1).isNotEqualTo(appraisalReviewDTO2);
        appraisalReviewDTO2.setId(appraisalReviewDTO1.getId());
        assertThat(appraisalReviewDTO1).isEqualTo(appraisalReviewDTO2);
        appraisalReviewDTO2.setId(2L);
        assertThat(appraisalReviewDTO1).isNotEqualTo(appraisalReviewDTO2);
        appraisalReviewDTO1.setId(null);
        assertThat(appraisalReviewDTO1).isNotEqualTo(appraisalReviewDTO2);
    }
}
