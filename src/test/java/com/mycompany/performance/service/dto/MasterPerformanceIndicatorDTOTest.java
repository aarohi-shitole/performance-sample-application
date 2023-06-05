package com.mycompany.performance.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.performance.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MasterPerformanceIndicatorDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MasterPerformanceIndicatorDTO.class);
        MasterPerformanceIndicatorDTO masterPerformanceIndicatorDTO1 = new MasterPerformanceIndicatorDTO();
        masterPerformanceIndicatorDTO1.setId(1L);
        MasterPerformanceIndicatorDTO masterPerformanceIndicatorDTO2 = new MasterPerformanceIndicatorDTO();
        assertThat(masterPerformanceIndicatorDTO1).isNotEqualTo(masterPerformanceIndicatorDTO2);
        masterPerformanceIndicatorDTO2.setId(masterPerformanceIndicatorDTO1.getId());
        assertThat(masterPerformanceIndicatorDTO1).isEqualTo(masterPerformanceIndicatorDTO2);
        masterPerformanceIndicatorDTO2.setId(2L);
        assertThat(masterPerformanceIndicatorDTO1).isNotEqualTo(masterPerformanceIndicatorDTO2);
        masterPerformanceIndicatorDTO1.setId(null);
        assertThat(masterPerformanceIndicatorDTO1).isNotEqualTo(masterPerformanceIndicatorDTO2);
    }
}
