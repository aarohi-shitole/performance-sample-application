package com.mycompany.performance.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.performance.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AppraisalEvaluationDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AppraisalEvaluationDTO.class);
        AppraisalEvaluationDTO appraisalEvaluationDTO1 = new AppraisalEvaluationDTO();
        appraisalEvaluationDTO1.setId(1L);
        AppraisalEvaluationDTO appraisalEvaluationDTO2 = new AppraisalEvaluationDTO();
        assertThat(appraisalEvaluationDTO1).isNotEqualTo(appraisalEvaluationDTO2);
        appraisalEvaluationDTO2.setId(appraisalEvaluationDTO1.getId());
        assertThat(appraisalEvaluationDTO1).isEqualTo(appraisalEvaluationDTO2);
        appraisalEvaluationDTO2.setId(2L);
        assertThat(appraisalEvaluationDTO1).isNotEqualTo(appraisalEvaluationDTO2);
        appraisalEvaluationDTO1.setId(null);
        assertThat(appraisalEvaluationDTO1).isNotEqualTo(appraisalEvaluationDTO2);
    }
}
