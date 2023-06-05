package com.mycompany.performance.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.performance.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PerformanceAppraisalDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PerformanceAppraisalDTO.class);
        PerformanceAppraisalDTO performanceAppraisalDTO1 = new PerformanceAppraisalDTO();
        performanceAppraisalDTO1.setId(1L);
        PerformanceAppraisalDTO performanceAppraisalDTO2 = new PerformanceAppraisalDTO();
        assertThat(performanceAppraisalDTO1).isNotEqualTo(performanceAppraisalDTO2);
        performanceAppraisalDTO2.setId(performanceAppraisalDTO1.getId());
        assertThat(performanceAppraisalDTO1).isEqualTo(performanceAppraisalDTO2);
        performanceAppraisalDTO2.setId(2L);
        assertThat(performanceAppraisalDTO1).isNotEqualTo(performanceAppraisalDTO2);
        performanceAppraisalDTO1.setId(null);
        assertThat(performanceAppraisalDTO1).isNotEqualTo(performanceAppraisalDTO2);
    }
}
