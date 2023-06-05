package com.mycompany.performance.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.performance.IntegrationTest;
import com.mycompany.performance.domain.AppraisalReview;
import com.mycompany.performance.domain.Employee;
import com.mycompany.performance.repository.AppraisalReviewRepository;
import com.mycompany.performance.service.criteria.AppraisalReviewCriteria;
import com.mycompany.performance.service.dto.AppraisalReviewDTO;
import com.mycompany.performance.service.mapper.AppraisalReviewMapper;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link AppraisalReviewResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AppraisalReviewResourceIT {

    private static final String DEFAULT_REPORTING_OFFICER = "AAAAAAAAAA";
    private static final String UPDATED_REPORTING_OFFICER = "BBBBBBBBBB";

    private static final String DEFAULT_RO_DESIGNATION = "AAAAAAAAAA";
    private static final String UPDATED_RO_DESIGNATION = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Long DEFAULT_COMPANY_ID = 1L;
    private static final Long UPDATED_COMPANY_ID = 2L;
    private static final Long SMALLER_COMPANY_ID = 1L - 1L;

    private static final Instant DEFAULT_LAST_MODIFIED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/appraisal-reviews";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AppraisalReviewRepository appraisalReviewRepository;

    @Autowired
    private AppraisalReviewMapper appraisalReviewMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAppraisalReviewMockMvc;

    private AppraisalReview appraisalReview;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AppraisalReview createEntity(EntityManager em) {
        AppraisalReview appraisalReview = new AppraisalReview()
            .reportingOfficer(DEFAULT_REPORTING_OFFICER)
            .roDesignation(DEFAULT_RO_DESIGNATION)
            .status(DEFAULT_STATUS)
            .companyId(DEFAULT_COMPANY_ID)
            .lastModified(DEFAULT_LAST_MODIFIED)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY);
        return appraisalReview;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AppraisalReview createUpdatedEntity(EntityManager em) {
        AppraisalReview appraisalReview = new AppraisalReview()
            .reportingOfficer(UPDATED_REPORTING_OFFICER)
            .roDesignation(UPDATED_RO_DESIGNATION)
            .status(UPDATED_STATUS)
            .companyId(UPDATED_COMPANY_ID)
            .lastModified(UPDATED_LAST_MODIFIED)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);
        return appraisalReview;
    }

    @BeforeEach
    public void initTest() {
        appraisalReview = createEntity(em);
    }

    @Test
    @Transactional
    void createAppraisalReview() throws Exception {
        int databaseSizeBeforeCreate = appraisalReviewRepository.findAll().size();
        // Create the AppraisalReview
        AppraisalReviewDTO appraisalReviewDTO = appraisalReviewMapper.toDto(appraisalReview);
        restAppraisalReviewMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(appraisalReviewDTO))
            )
            .andExpect(status().isCreated());

        // Validate the AppraisalReview in the database
        List<AppraisalReview> appraisalReviewList = appraisalReviewRepository.findAll();
        assertThat(appraisalReviewList).hasSize(databaseSizeBeforeCreate + 1);
        AppraisalReview testAppraisalReview = appraisalReviewList.get(appraisalReviewList.size() - 1);
        assertThat(testAppraisalReview.getReportingOfficer()).isEqualTo(DEFAULT_REPORTING_OFFICER);
        assertThat(testAppraisalReview.getRoDesignation()).isEqualTo(DEFAULT_RO_DESIGNATION);
        assertThat(testAppraisalReview.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testAppraisalReview.getCompanyId()).isEqualTo(DEFAULT_COMPANY_ID);
        assertThat(testAppraisalReview.getLastModified()).isEqualTo(DEFAULT_LAST_MODIFIED);
        assertThat(testAppraisalReview.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void createAppraisalReviewWithExistingId() throws Exception {
        // Create the AppraisalReview with an existing ID
        appraisalReview.setId(1L);
        AppraisalReviewDTO appraisalReviewDTO = appraisalReviewMapper.toDto(appraisalReview);

        int databaseSizeBeforeCreate = appraisalReviewRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAppraisalReviewMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(appraisalReviewDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AppraisalReview in the database
        List<AppraisalReview> appraisalReviewList = appraisalReviewRepository.findAll();
        assertThat(appraisalReviewList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAppraisalReviews() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList
        restAppraisalReviewMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(appraisalReview.getId().intValue())))
            .andExpect(jsonPath("$.[*].reportingOfficer").value(hasItem(DEFAULT_REPORTING_OFFICER)))
            .andExpect(jsonPath("$.[*].roDesignation").value(hasItem(DEFAULT_RO_DESIGNATION)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].companyId").value(hasItem(DEFAULT_COMPANY_ID.intValue())))
            .andExpect(jsonPath("$.[*].lastModified").value(hasItem(DEFAULT_LAST_MODIFIED.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)));
    }

    @Test
    @Transactional
    void getAppraisalReview() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get the appraisalReview
        restAppraisalReviewMockMvc
            .perform(get(ENTITY_API_URL_ID, appraisalReview.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(appraisalReview.getId().intValue()))
            .andExpect(jsonPath("$.reportingOfficer").value(DEFAULT_REPORTING_OFFICER))
            .andExpect(jsonPath("$.roDesignation").value(DEFAULT_RO_DESIGNATION))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.companyId").value(DEFAULT_COMPANY_ID.intValue()))
            .andExpect(jsonPath("$.lastModified").value(DEFAULT_LAST_MODIFIED.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY));
    }

    @Test
    @Transactional
    void getAppraisalReviewsByIdFiltering() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        Long id = appraisalReview.getId();

        defaultAppraisalReviewShouldBeFound("id.equals=" + id);
        defaultAppraisalReviewShouldNotBeFound("id.notEquals=" + id);

        defaultAppraisalReviewShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultAppraisalReviewShouldNotBeFound("id.greaterThan=" + id);

        defaultAppraisalReviewShouldBeFound("id.lessThanOrEqual=" + id);
        defaultAppraisalReviewShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByReportingOfficerIsEqualToSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where reportingOfficer equals to DEFAULT_REPORTING_OFFICER
        defaultAppraisalReviewShouldBeFound("reportingOfficer.equals=" + DEFAULT_REPORTING_OFFICER);

        // Get all the appraisalReviewList where reportingOfficer equals to UPDATED_REPORTING_OFFICER
        defaultAppraisalReviewShouldNotBeFound("reportingOfficer.equals=" + UPDATED_REPORTING_OFFICER);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByReportingOfficerIsInShouldWork() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where reportingOfficer in DEFAULT_REPORTING_OFFICER or UPDATED_REPORTING_OFFICER
        defaultAppraisalReviewShouldBeFound("reportingOfficer.in=" + DEFAULT_REPORTING_OFFICER + "," + UPDATED_REPORTING_OFFICER);

        // Get all the appraisalReviewList where reportingOfficer equals to UPDATED_REPORTING_OFFICER
        defaultAppraisalReviewShouldNotBeFound("reportingOfficer.in=" + UPDATED_REPORTING_OFFICER);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByReportingOfficerIsNullOrNotNull() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where reportingOfficer is not null
        defaultAppraisalReviewShouldBeFound("reportingOfficer.specified=true");

        // Get all the appraisalReviewList where reportingOfficer is null
        defaultAppraisalReviewShouldNotBeFound("reportingOfficer.specified=false");
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByReportingOfficerContainsSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where reportingOfficer contains DEFAULT_REPORTING_OFFICER
        defaultAppraisalReviewShouldBeFound("reportingOfficer.contains=" + DEFAULT_REPORTING_OFFICER);

        // Get all the appraisalReviewList where reportingOfficer contains UPDATED_REPORTING_OFFICER
        defaultAppraisalReviewShouldNotBeFound("reportingOfficer.contains=" + UPDATED_REPORTING_OFFICER);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByReportingOfficerNotContainsSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where reportingOfficer does not contain DEFAULT_REPORTING_OFFICER
        defaultAppraisalReviewShouldNotBeFound("reportingOfficer.doesNotContain=" + DEFAULT_REPORTING_OFFICER);

        // Get all the appraisalReviewList where reportingOfficer does not contain UPDATED_REPORTING_OFFICER
        defaultAppraisalReviewShouldBeFound("reportingOfficer.doesNotContain=" + UPDATED_REPORTING_OFFICER);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByRoDesignationIsEqualToSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where roDesignation equals to DEFAULT_RO_DESIGNATION
        defaultAppraisalReviewShouldBeFound("roDesignation.equals=" + DEFAULT_RO_DESIGNATION);

        // Get all the appraisalReviewList where roDesignation equals to UPDATED_RO_DESIGNATION
        defaultAppraisalReviewShouldNotBeFound("roDesignation.equals=" + UPDATED_RO_DESIGNATION);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByRoDesignationIsInShouldWork() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where roDesignation in DEFAULT_RO_DESIGNATION or UPDATED_RO_DESIGNATION
        defaultAppraisalReviewShouldBeFound("roDesignation.in=" + DEFAULT_RO_DESIGNATION + "," + UPDATED_RO_DESIGNATION);

        // Get all the appraisalReviewList where roDesignation equals to UPDATED_RO_DESIGNATION
        defaultAppraisalReviewShouldNotBeFound("roDesignation.in=" + UPDATED_RO_DESIGNATION);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByRoDesignationIsNullOrNotNull() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where roDesignation is not null
        defaultAppraisalReviewShouldBeFound("roDesignation.specified=true");

        // Get all the appraisalReviewList where roDesignation is null
        defaultAppraisalReviewShouldNotBeFound("roDesignation.specified=false");
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByRoDesignationContainsSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where roDesignation contains DEFAULT_RO_DESIGNATION
        defaultAppraisalReviewShouldBeFound("roDesignation.contains=" + DEFAULT_RO_DESIGNATION);

        // Get all the appraisalReviewList where roDesignation contains UPDATED_RO_DESIGNATION
        defaultAppraisalReviewShouldNotBeFound("roDesignation.contains=" + UPDATED_RO_DESIGNATION);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByRoDesignationNotContainsSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where roDesignation does not contain DEFAULT_RO_DESIGNATION
        defaultAppraisalReviewShouldNotBeFound("roDesignation.doesNotContain=" + DEFAULT_RO_DESIGNATION);

        // Get all the appraisalReviewList where roDesignation does not contain UPDATED_RO_DESIGNATION
        defaultAppraisalReviewShouldBeFound("roDesignation.doesNotContain=" + UPDATED_RO_DESIGNATION);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByStatusIsEqualToSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where status equals to DEFAULT_STATUS
        defaultAppraisalReviewShouldBeFound("status.equals=" + DEFAULT_STATUS);

        // Get all the appraisalReviewList where status equals to UPDATED_STATUS
        defaultAppraisalReviewShouldNotBeFound("status.equals=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByStatusIsInShouldWork() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where status in DEFAULT_STATUS or UPDATED_STATUS
        defaultAppraisalReviewShouldBeFound("status.in=" + DEFAULT_STATUS + "," + UPDATED_STATUS);

        // Get all the appraisalReviewList where status equals to UPDATED_STATUS
        defaultAppraisalReviewShouldNotBeFound("status.in=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByStatusIsNullOrNotNull() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where status is not null
        defaultAppraisalReviewShouldBeFound("status.specified=true");

        // Get all the appraisalReviewList where status is null
        defaultAppraisalReviewShouldNotBeFound("status.specified=false");
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByStatusContainsSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where status contains DEFAULT_STATUS
        defaultAppraisalReviewShouldBeFound("status.contains=" + DEFAULT_STATUS);

        // Get all the appraisalReviewList where status contains UPDATED_STATUS
        defaultAppraisalReviewShouldNotBeFound("status.contains=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByStatusNotContainsSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where status does not contain DEFAULT_STATUS
        defaultAppraisalReviewShouldNotBeFound("status.doesNotContain=" + DEFAULT_STATUS);

        // Get all the appraisalReviewList where status does not contain UPDATED_STATUS
        defaultAppraisalReviewShouldBeFound("status.doesNotContain=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByCompanyIdIsEqualToSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where companyId equals to DEFAULT_COMPANY_ID
        defaultAppraisalReviewShouldBeFound("companyId.equals=" + DEFAULT_COMPANY_ID);

        // Get all the appraisalReviewList where companyId equals to UPDATED_COMPANY_ID
        defaultAppraisalReviewShouldNotBeFound("companyId.equals=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByCompanyIdIsInShouldWork() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where companyId in DEFAULT_COMPANY_ID or UPDATED_COMPANY_ID
        defaultAppraisalReviewShouldBeFound("companyId.in=" + DEFAULT_COMPANY_ID + "," + UPDATED_COMPANY_ID);

        // Get all the appraisalReviewList where companyId equals to UPDATED_COMPANY_ID
        defaultAppraisalReviewShouldNotBeFound("companyId.in=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByCompanyIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where companyId is not null
        defaultAppraisalReviewShouldBeFound("companyId.specified=true");

        // Get all the appraisalReviewList where companyId is null
        defaultAppraisalReviewShouldNotBeFound("companyId.specified=false");
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByCompanyIdIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where companyId is greater than or equal to DEFAULT_COMPANY_ID
        defaultAppraisalReviewShouldBeFound("companyId.greaterThanOrEqual=" + DEFAULT_COMPANY_ID);

        // Get all the appraisalReviewList where companyId is greater than or equal to UPDATED_COMPANY_ID
        defaultAppraisalReviewShouldNotBeFound("companyId.greaterThanOrEqual=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByCompanyIdIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where companyId is less than or equal to DEFAULT_COMPANY_ID
        defaultAppraisalReviewShouldBeFound("companyId.lessThanOrEqual=" + DEFAULT_COMPANY_ID);

        // Get all the appraisalReviewList where companyId is less than or equal to SMALLER_COMPANY_ID
        defaultAppraisalReviewShouldNotBeFound("companyId.lessThanOrEqual=" + SMALLER_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByCompanyIdIsLessThanSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where companyId is less than DEFAULT_COMPANY_ID
        defaultAppraisalReviewShouldNotBeFound("companyId.lessThan=" + DEFAULT_COMPANY_ID);

        // Get all the appraisalReviewList where companyId is less than UPDATED_COMPANY_ID
        defaultAppraisalReviewShouldBeFound("companyId.lessThan=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByCompanyIdIsGreaterThanSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where companyId is greater than DEFAULT_COMPANY_ID
        defaultAppraisalReviewShouldNotBeFound("companyId.greaterThan=" + DEFAULT_COMPANY_ID);

        // Get all the appraisalReviewList where companyId is greater than SMALLER_COMPANY_ID
        defaultAppraisalReviewShouldBeFound("companyId.greaterThan=" + SMALLER_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByLastModifiedIsEqualToSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where lastModified equals to DEFAULT_LAST_MODIFIED
        defaultAppraisalReviewShouldBeFound("lastModified.equals=" + DEFAULT_LAST_MODIFIED);

        // Get all the appraisalReviewList where lastModified equals to UPDATED_LAST_MODIFIED
        defaultAppraisalReviewShouldNotBeFound("lastModified.equals=" + UPDATED_LAST_MODIFIED);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByLastModifiedIsInShouldWork() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where lastModified in DEFAULT_LAST_MODIFIED or UPDATED_LAST_MODIFIED
        defaultAppraisalReviewShouldBeFound("lastModified.in=" + DEFAULT_LAST_MODIFIED + "," + UPDATED_LAST_MODIFIED);

        // Get all the appraisalReviewList where lastModified equals to UPDATED_LAST_MODIFIED
        defaultAppraisalReviewShouldNotBeFound("lastModified.in=" + UPDATED_LAST_MODIFIED);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByLastModifiedIsNullOrNotNull() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where lastModified is not null
        defaultAppraisalReviewShouldBeFound("lastModified.specified=true");

        // Get all the appraisalReviewList where lastModified is null
        defaultAppraisalReviewShouldNotBeFound("lastModified.specified=false");
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByLastModifiedByIsEqualToSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where lastModifiedBy equals to DEFAULT_LAST_MODIFIED_BY
        defaultAppraisalReviewShouldBeFound("lastModifiedBy.equals=" + DEFAULT_LAST_MODIFIED_BY);

        // Get all the appraisalReviewList where lastModifiedBy equals to UPDATED_LAST_MODIFIED_BY
        defaultAppraisalReviewShouldNotBeFound("lastModifiedBy.equals=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByLastModifiedByIsInShouldWork() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where lastModifiedBy in DEFAULT_LAST_MODIFIED_BY or UPDATED_LAST_MODIFIED_BY
        defaultAppraisalReviewShouldBeFound("lastModifiedBy.in=" + DEFAULT_LAST_MODIFIED_BY + "," + UPDATED_LAST_MODIFIED_BY);

        // Get all the appraisalReviewList where lastModifiedBy equals to UPDATED_LAST_MODIFIED_BY
        defaultAppraisalReviewShouldNotBeFound("lastModifiedBy.in=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByLastModifiedByIsNullOrNotNull() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where lastModifiedBy is not null
        defaultAppraisalReviewShouldBeFound("lastModifiedBy.specified=true");

        // Get all the appraisalReviewList where lastModifiedBy is null
        defaultAppraisalReviewShouldNotBeFound("lastModifiedBy.specified=false");
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByLastModifiedByContainsSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where lastModifiedBy contains DEFAULT_LAST_MODIFIED_BY
        defaultAppraisalReviewShouldBeFound("lastModifiedBy.contains=" + DEFAULT_LAST_MODIFIED_BY);

        // Get all the appraisalReviewList where lastModifiedBy contains UPDATED_LAST_MODIFIED_BY
        defaultAppraisalReviewShouldNotBeFound("lastModifiedBy.contains=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByLastModifiedByNotContainsSomething() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        // Get all the appraisalReviewList where lastModifiedBy does not contain DEFAULT_LAST_MODIFIED_BY
        defaultAppraisalReviewShouldNotBeFound("lastModifiedBy.doesNotContain=" + DEFAULT_LAST_MODIFIED_BY);

        // Get all the appraisalReviewList where lastModifiedBy does not contain UPDATED_LAST_MODIFIED_BY
        defaultAppraisalReviewShouldBeFound("lastModifiedBy.doesNotContain=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllAppraisalReviewsByEmployeeIsEqualToSomething() throws Exception {
        Employee employee;
        if (TestUtil.findAll(em, Employee.class).isEmpty()) {
            appraisalReviewRepository.saveAndFlush(appraisalReview);
            employee = EmployeeResourceIT.createEntity(em);
        } else {
            employee = TestUtil.findAll(em, Employee.class).get(0);
        }
        em.persist(employee);
        em.flush();
        appraisalReview.setEmployee(employee);
        appraisalReviewRepository.saveAndFlush(appraisalReview);
        Long employeeId = employee.getId();

        // Get all the appraisalReviewList where employee equals to employeeId
        defaultAppraisalReviewShouldBeFound("employeeId.equals=" + employeeId);

        // Get all the appraisalReviewList where employee equals to (employeeId + 1)
        defaultAppraisalReviewShouldNotBeFound("employeeId.equals=" + (employeeId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultAppraisalReviewShouldBeFound(String filter) throws Exception {
        restAppraisalReviewMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(appraisalReview.getId().intValue())))
            .andExpect(jsonPath("$.[*].reportingOfficer").value(hasItem(DEFAULT_REPORTING_OFFICER)))
            .andExpect(jsonPath("$.[*].roDesignation").value(hasItem(DEFAULT_RO_DESIGNATION)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].companyId").value(hasItem(DEFAULT_COMPANY_ID.intValue())))
            .andExpect(jsonPath("$.[*].lastModified").value(hasItem(DEFAULT_LAST_MODIFIED.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)));

        // Check, that the count call also returns 1
        restAppraisalReviewMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultAppraisalReviewShouldNotBeFound(String filter) throws Exception {
        restAppraisalReviewMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restAppraisalReviewMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingAppraisalReview() throws Exception {
        // Get the appraisalReview
        restAppraisalReviewMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAppraisalReview() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        int databaseSizeBeforeUpdate = appraisalReviewRepository.findAll().size();

        // Update the appraisalReview
        AppraisalReview updatedAppraisalReview = appraisalReviewRepository.findById(appraisalReview.getId()).get();
        // Disconnect from session so that the updates on updatedAppraisalReview are not directly saved in db
        em.detach(updatedAppraisalReview);
        updatedAppraisalReview
            .reportingOfficer(UPDATED_REPORTING_OFFICER)
            .roDesignation(UPDATED_RO_DESIGNATION)
            .status(UPDATED_STATUS)
            .companyId(UPDATED_COMPANY_ID)
            .lastModified(UPDATED_LAST_MODIFIED)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);
        AppraisalReviewDTO appraisalReviewDTO = appraisalReviewMapper.toDto(updatedAppraisalReview);

        restAppraisalReviewMockMvc
            .perform(
                put(ENTITY_API_URL_ID, appraisalReviewDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(appraisalReviewDTO))
            )
            .andExpect(status().isOk());

        // Validate the AppraisalReview in the database
        List<AppraisalReview> appraisalReviewList = appraisalReviewRepository.findAll();
        assertThat(appraisalReviewList).hasSize(databaseSizeBeforeUpdate);
        AppraisalReview testAppraisalReview = appraisalReviewList.get(appraisalReviewList.size() - 1);
        assertThat(testAppraisalReview.getReportingOfficer()).isEqualTo(UPDATED_REPORTING_OFFICER);
        assertThat(testAppraisalReview.getRoDesignation()).isEqualTo(UPDATED_RO_DESIGNATION);
        assertThat(testAppraisalReview.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testAppraisalReview.getCompanyId()).isEqualTo(UPDATED_COMPANY_ID);
        assertThat(testAppraisalReview.getLastModified()).isEqualTo(UPDATED_LAST_MODIFIED);
        assertThat(testAppraisalReview.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void putNonExistingAppraisalReview() throws Exception {
        int databaseSizeBeforeUpdate = appraisalReviewRepository.findAll().size();
        appraisalReview.setId(count.incrementAndGet());

        // Create the AppraisalReview
        AppraisalReviewDTO appraisalReviewDTO = appraisalReviewMapper.toDto(appraisalReview);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAppraisalReviewMockMvc
            .perform(
                put(ENTITY_API_URL_ID, appraisalReviewDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(appraisalReviewDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AppraisalReview in the database
        List<AppraisalReview> appraisalReviewList = appraisalReviewRepository.findAll();
        assertThat(appraisalReviewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAppraisalReview() throws Exception {
        int databaseSizeBeforeUpdate = appraisalReviewRepository.findAll().size();
        appraisalReview.setId(count.incrementAndGet());

        // Create the AppraisalReview
        AppraisalReviewDTO appraisalReviewDTO = appraisalReviewMapper.toDto(appraisalReview);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAppraisalReviewMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(appraisalReviewDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AppraisalReview in the database
        List<AppraisalReview> appraisalReviewList = appraisalReviewRepository.findAll();
        assertThat(appraisalReviewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAppraisalReview() throws Exception {
        int databaseSizeBeforeUpdate = appraisalReviewRepository.findAll().size();
        appraisalReview.setId(count.incrementAndGet());

        // Create the AppraisalReview
        AppraisalReviewDTO appraisalReviewDTO = appraisalReviewMapper.toDto(appraisalReview);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAppraisalReviewMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(appraisalReviewDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AppraisalReview in the database
        List<AppraisalReview> appraisalReviewList = appraisalReviewRepository.findAll();
        assertThat(appraisalReviewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAppraisalReviewWithPatch() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        int databaseSizeBeforeUpdate = appraisalReviewRepository.findAll().size();

        // Update the appraisalReview using partial update
        AppraisalReview partialUpdatedAppraisalReview = new AppraisalReview();
        partialUpdatedAppraisalReview.setId(appraisalReview.getId());

        partialUpdatedAppraisalReview.companyId(UPDATED_COMPANY_ID).lastModified(UPDATED_LAST_MODIFIED);

        restAppraisalReviewMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAppraisalReview.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAppraisalReview))
            )
            .andExpect(status().isOk());

        // Validate the AppraisalReview in the database
        List<AppraisalReview> appraisalReviewList = appraisalReviewRepository.findAll();
        assertThat(appraisalReviewList).hasSize(databaseSizeBeforeUpdate);
        AppraisalReview testAppraisalReview = appraisalReviewList.get(appraisalReviewList.size() - 1);
        assertThat(testAppraisalReview.getReportingOfficer()).isEqualTo(DEFAULT_REPORTING_OFFICER);
        assertThat(testAppraisalReview.getRoDesignation()).isEqualTo(DEFAULT_RO_DESIGNATION);
        assertThat(testAppraisalReview.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testAppraisalReview.getCompanyId()).isEqualTo(UPDATED_COMPANY_ID);
        assertThat(testAppraisalReview.getLastModified()).isEqualTo(UPDATED_LAST_MODIFIED);
        assertThat(testAppraisalReview.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void fullUpdateAppraisalReviewWithPatch() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        int databaseSizeBeforeUpdate = appraisalReviewRepository.findAll().size();

        // Update the appraisalReview using partial update
        AppraisalReview partialUpdatedAppraisalReview = new AppraisalReview();
        partialUpdatedAppraisalReview.setId(appraisalReview.getId());

        partialUpdatedAppraisalReview
            .reportingOfficer(UPDATED_REPORTING_OFFICER)
            .roDesignation(UPDATED_RO_DESIGNATION)
            .status(UPDATED_STATUS)
            .companyId(UPDATED_COMPANY_ID)
            .lastModified(UPDATED_LAST_MODIFIED)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restAppraisalReviewMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAppraisalReview.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAppraisalReview))
            )
            .andExpect(status().isOk());

        // Validate the AppraisalReview in the database
        List<AppraisalReview> appraisalReviewList = appraisalReviewRepository.findAll();
        assertThat(appraisalReviewList).hasSize(databaseSizeBeforeUpdate);
        AppraisalReview testAppraisalReview = appraisalReviewList.get(appraisalReviewList.size() - 1);
        assertThat(testAppraisalReview.getReportingOfficer()).isEqualTo(UPDATED_REPORTING_OFFICER);
        assertThat(testAppraisalReview.getRoDesignation()).isEqualTo(UPDATED_RO_DESIGNATION);
        assertThat(testAppraisalReview.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testAppraisalReview.getCompanyId()).isEqualTo(UPDATED_COMPANY_ID);
        assertThat(testAppraisalReview.getLastModified()).isEqualTo(UPDATED_LAST_MODIFIED);
        assertThat(testAppraisalReview.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void patchNonExistingAppraisalReview() throws Exception {
        int databaseSizeBeforeUpdate = appraisalReviewRepository.findAll().size();
        appraisalReview.setId(count.incrementAndGet());

        // Create the AppraisalReview
        AppraisalReviewDTO appraisalReviewDTO = appraisalReviewMapper.toDto(appraisalReview);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAppraisalReviewMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, appraisalReviewDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(appraisalReviewDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AppraisalReview in the database
        List<AppraisalReview> appraisalReviewList = appraisalReviewRepository.findAll();
        assertThat(appraisalReviewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAppraisalReview() throws Exception {
        int databaseSizeBeforeUpdate = appraisalReviewRepository.findAll().size();
        appraisalReview.setId(count.incrementAndGet());

        // Create the AppraisalReview
        AppraisalReviewDTO appraisalReviewDTO = appraisalReviewMapper.toDto(appraisalReview);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAppraisalReviewMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(appraisalReviewDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AppraisalReview in the database
        List<AppraisalReview> appraisalReviewList = appraisalReviewRepository.findAll();
        assertThat(appraisalReviewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAppraisalReview() throws Exception {
        int databaseSizeBeforeUpdate = appraisalReviewRepository.findAll().size();
        appraisalReview.setId(count.incrementAndGet());

        // Create the AppraisalReview
        AppraisalReviewDTO appraisalReviewDTO = appraisalReviewMapper.toDto(appraisalReview);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAppraisalReviewMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(appraisalReviewDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AppraisalReview in the database
        List<AppraisalReview> appraisalReviewList = appraisalReviewRepository.findAll();
        assertThat(appraisalReviewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAppraisalReview() throws Exception {
        // Initialize the database
        appraisalReviewRepository.saveAndFlush(appraisalReview);

        int databaseSizeBeforeDelete = appraisalReviewRepository.findAll().size();

        // Delete the appraisalReview
        restAppraisalReviewMockMvc
            .perform(delete(ENTITY_API_URL_ID, appraisalReview.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AppraisalReview> appraisalReviewList = appraisalReviewRepository.findAll();
        assertThat(appraisalReviewList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
