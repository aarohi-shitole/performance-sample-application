package com.mycompany.performance.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.performance.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PerformanceIndicatorDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PerformanceIndicatorDTO.class);
        PerformanceIndicatorDTO performanceIndicatorDTO1 = new PerformanceIndicatorDTO();
        performanceIndicatorDTO1.setId(1L);
        PerformanceIndicatorDTO performanceIndicatorDTO2 = new PerformanceIndicatorDTO();
        assertThat(performanceIndicatorDTO1).isNotEqualTo(performanceIndicatorDTO2);
        performanceIndicatorDTO2.setId(performanceIndicatorDTO1.getId());
        assertThat(performanceIndicatorDTO1).isEqualTo(performanceIndicatorDTO2);
        performanceIndicatorDTO2.setId(2L);
        assertThat(performanceIndicatorDTO1).isNotEqualTo(performanceIndicatorDTO2);
        performanceIndicatorDTO1.setId(null);
        assertThat(performanceIndicatorDTO1).isNotEqualTo(performanceIndicatorDTO2);
    }
}
