package com.mycompany.performance.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.performance.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EmployeeGoalsReviewDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeGoalsReviewDTO.class);
        EmployeeGoalsReviewDTO employeeGoalsReviewDTO1 = new EmployeeGoalsReviewDTO();
        employeeGoalsReviewDTO1.setId(1L);
        EmployeeGoalsReviewDTO employeeGoalsReviewDTO2 = new EmployeeGoalsReviewDTO();
        assertThat(employeeGoalsReviewDTO1).isNotEqualTo(employeeGoalsReviewDTO2);
        employeeGoalsReviewDTO2.setId(employeeGoalsReviewDTO1.getId());
        assertThat(employeeGoalsReviewDTO1).isEqualTo(employeeGoalsReviewDTO2);
        employeeGoalsReviewDTO2.setId(2L);
        assertThat(employeeGoalsReviewDTO1).isNotEqualTo(employeeGoalsReviewDTO2);
        employeeGoalsReviewDTO1.setId(null);
        assertThat(employeeGoalsReviewDTO1).isNotEqualTo(employeeGoalsReviewDTO2);
    }
}
