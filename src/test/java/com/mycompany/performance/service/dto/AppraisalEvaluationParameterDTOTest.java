package com.mycompany.performance.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.performance.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AppraisalEvaluationParameterDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AppraisalEvaluationParameterDTO.class);
        AppraisalEvaluationParameterDTO appraisalEvaluationParameterDTO1 = new AppraisalEvaluationParameterDTO();
        appraisalEvaluationParameterDTO1.setId(1L);
        AppraisalEvaluationParameterDTO appraisalEvaluationParameterDTO2 = new AppraisalEvaluationParameterDTO();
        assertThat(appraisalEvaluationParameterDTO1).isNotEqualTo(appraisalEvaluationParameterDTO2);
        appraisalEvaluationParameterDTO2.setId(appraisalEvaluationParameterDTO1.getId());
        assertThat(appraisalEvaluationParameterDTO1).isEqualTo(appraisalEvaluationParameterDTO2);
        appraisalEvaluationParameterDTO2.setId(2L);
        assertThat(appraisalEvaluationParameterDTO1).isNotEqualTo(appraisalEvaluationParameterDTO2);
        appraisalEvaluationParameterDTO1.setId(null);
        assertThat(appraisalEvaluationParameterDTO1).isNotEqualTo(appraisalEvaluationParameterDTO2);
    }
}
