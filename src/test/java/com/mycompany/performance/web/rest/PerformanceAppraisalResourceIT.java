package com.mycompany.performance.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.performance.IntegrationTest;
import com.mycompany.performance.domain.AppraisalReview;
import com.mycompany.performance.domain.PerformanceAppraisal;
import com.mycompany.performance.repository.PerformanceAppraisalRepository;
import com.mycompany.performance.service.criteria.PerformanceAppraisalCriteria;
import com.mycompany.performance.service.dto.PerformanceAppraisalDTO;
import com.mycompany.performance.service.mapper.PerformanceAppraisalMapper;
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
 * Integration tests for the {@link PerformanceAppraisalResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PerformanceAppraisalResourceIT {

    private static final Long DEFAULT_EMPLOYEE_ID = 1L;
    private static final Long UPDATED_EMPLOYEE_ID = 2L;
    private static final Long SMALLER_EMPLOYEE_ID = 1L - 1L;

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Long DEFAULT_COMPANY_ID = 1L;
    private static final Long UPDATED_COMPANY_ID = 2L;
    private static final Long SMALLER_COMPANY_ID = 1L - 1L;

    private static final Instant DEFAULT_LAST_MODIFIED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/performance-appraisals";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PerformanceAppraisalRepository performanceAppraisalRepository;

    @Autowired
    private PerformanceAppraisalMapper performanceAppraisalMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPerformanceAppraisalMockMvc;

    private PerformanceAppraisal performanceAppraisal;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PerformanceAppraisal createEntity(EntityManager em) {
        PerformanceAppraisal performanceAppraisal = new PerformanceAppraisal()
            .employeeId(DEFAULT_EMPLOYEE_ID)
            .status(DEFAULT_STATUS)
            .companyId(DEFAULT_COMPANY_ID)
            .lastModified(DEFAULT_LAST_MODIFIED)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY);
        return performanceAppraisal;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PerformanceAppraisal createUpdatedEntity(EntityManager em) {
        PerformanceAppraisal performanceAppraisal = new PerformanceAppraisal()
            .employeeId(UPDATED_EMPLOYEE_ID)
            .status(UPDATED_STATUS)
            .companyId(UPDATED_COMPANY_ID)
            .lastModified(UPDATED_LAST_MODIFIED)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);
        return performanceAppraisal;
    }

    @BeforeEach
    public void initTest() {
        performanceAppraisal = createEntity(em);
    }

    @Test
    @Transactional
    void createPerformanceAppraisal() throws Exception {
        int databaseSizeBeforeCreate = performanceAppraisalRepository.findAll().size();
        // Create the PerformanceAppraisal
        PerformanceAppraisalDTO performanceAppraisalDTO = performanceAppraisalMapper.toDto(performanceAppraisal);
        restPerformanceAppraisalMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(performanceAppraisalDTO))
            )
            .andExpect(status().isCreated());

        // Validate the PerformanceAppraisal in the database
        List<PerformanceAppraisal> performanceAppraisalList = performanceAppraisalRepository.findAll();
        assertThat(performanceAppraisalList).hasSize(databaseSizeBeforeCreate + 1);
        PerformanceAppraisal testPerformanceAppraisal = performanceAppraisalList.get(performanceAppraisalList.size() - 1);
        assertThat(testPerformanceAppraisal.getEmployeeId()).isEqualTo(DEFAULT_EMPLOYEE_ID);
        assertThat(testPerformanceAppraisal.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testPerformanceAppraisal.getCompanyId()).isEqualTo(DEFAULT_COMPANY_ID);
        assertThat(testPerformanceAppraisal.getLastModified()).isEqualTo(DEFAULT_LAST_MODIFIED);
        assertThat(testPerformanceAppraisal.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void createPerformanceAppraisalWithExistingId() throws Exception {
        // Create the PerformanceAppraisal with an existing ID
        performanceAppraisal.setId(1L);
        PerformanceAppraisalDTO performanceAppraisalDTO = performanceAppraisalMapper.toDto(performanceAppraisal);

        int databaseSizeBeforeCreate = performanceAppraisalRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPerformanceAppraisalMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(performanceAppraisalDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PerformanceAppraisal in the database
        List<PerformanceAppraisal> performanceAppraisalList = performanceAppraisalRepository.findAll();
        assertThat(performanceAppraisalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisals() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList
        restPerformanceAppraisalMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(performanceAppraisal.getId().intValue())))
            .andExpect(jsonPath("$.[*].employeeId").value(hasItem(DEFAULT_EMPLOYEE_ID.intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].companyId").value(hasItem(DEFAULT_COMPANY_ID.intValue())))
            .andExpect(jsonPath("$.[*].lastModified").value(hasItem(DEFAULT_LAST_MODIFIED.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)));
    }

    @Test
    @Transactional
    void getPerformanceAppraisal() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get the performanceAppraisal
        restPerformanceAppraisalMockMvc
            .perform(get(ENTITY_API_URL_ID, performanceAppraisal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(performanceAppraisal.getId().intValue()))
            .andExpect(jsonPath("$.employeeId").value(DEFAULT_EMPLOYEE_ID.intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.companyId").value(DEFAULT_COMPANY_ID.intValue()))
            .andExpect(jsonPath("$.lastModified").value(DEFAULT_LAST_MODIFIED.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY));
    }

    @Test
    @Transactional
    void getPerformanceAppraisalsByIdFiltering() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        Long id = performanceAppraisal.getId();

        defaultPerformanceAppraisalShouldBeFound("id.equals=" + id);
        defaultPerformanceAppraisalShouldNotBeFound("id.notEquals=" + id);

        defaultPerformanceAppraisalShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultPerformanceAppraisalShouldNotBeFound("id.greaterThan=" + id);

        defaultPerformanceAppraisalShouldBeFound("id.lessThanOrEqual=" + id);
        defaultPerformanceAppraisalShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByEmployeeIdIsEqualToSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where employeeId equals to DEFAULT_EMPLOYEE_ID
        defaultPerformanceAppraisalShouldBeFound("employeeId.equals=" + DEFAULT_EMPLOYEE_ID);

        // Get all the performanceAppraisalList where employeeId equals to UPDATED_EMPLOYEE_ID
        defaultPerformanceAppraisalShouldNotBeFound("employeeId.equals=" + UPDATED_EMPLOYEE_ID);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByEmployeeIdIsInShouldWork() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where employeeId in DEFAULT_EMPLOYEE_ID or UPDATED_EMPLOYEE_ID
        defaultPerformanceAppraisalShouldBeFound("employeeId.in=" + DEFAULT_EMPLOYEE_ID + "," + UPDATED_EMPLOYEE_ID);

        // Get all the performanceAppraisalList where employeeId equals to UPDATED_EMPLOYEE_ID
        defaultPerformanceAppraisalShouldNotBeFound("employeeId.in=" + UPDATED_EMPLOYEE_ID);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByEmployeeIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where employeeId is not null
        defaultPerformanceAppraisalShouldBeFound("employeeId.specified=true");

        // Get all the performanceAppraisalList where employeeId is null
        defaultPerformanceAppraisalShouldNotBeFound("employeeId.specified=false");
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByEmployeeIdIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where employeeId is greater than or equal to DEFAULT_EMPLOYEE_ID
        defaultPerformanceAppraisalShouldBeFound("employeeId.greaterThanOrEqual=" + DEFAULT_EMPLOYEE_ID);

        // Get all the performanceAppraisalList where employeeId is greater than or equal to UPDATED_EMPLOYEE_ID
        defaultPerformanceAppraisalShouldNotBeFound("employeeId.greaterThanOrEqual=" + UPDATED_EMPLOYEE_ID);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByEmployeeIdIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where employeeId is less than or equal to DEFAULT_EMPLOYEE_ID
        defaultPerformanceAppraisalShouldBeFound("employeeId.lessThanOrEqual=" + DEFAULT_EMPLOYEE_ID);

        // Get all the performanceAppraisalList where employeeId is less than or equal to SMALLER_EMPLOYEE_ID
        defaultPerformanceAppraisalShouldNotBeFound("employeeId.lessThanOrEqual=" + SMALLER_EMPLOYEE_ID);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByEmployeeIdIsLessThanSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where employeeId is less than DEFAULT_EMPLOYEE_ID
        defaultPerformanceAppraisalShouldNotBeFound("employeeId.lessThan=" + DEFAULT_EMPLOYEE_ID);

        // Get all the performanceAppraisalList where employeeId is less than UPDATED_EMPLOYEE_ID
        defaultPerformanceAppraisalShouldBeFound("employeeId.lessThan=" + UPDATED_EMPLOYEE_ID);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByEmployeeIdIsGreaterThanSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where employeeId is greater than DEFAULT_EMPLOYEE_ID
        defaultPerformanceAppraisalShouldNotBeFound("employeeId.greaterThan=" + DEFAULT_EMPLOYEE_ID);

        // Get all the performanceAppraisalList where employeeId is greater than SMALLER_EMPLOYEE_ID
        defaultPerformanceAppraisalShouldBeFound("employeeId.greaterThan=" + SMALLER_EMPLOYEE_ID);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByStatusIsEqualToSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where status equals to DEFAULT_STATUS
        defaultPerformanceAppraisalShouldBeFound("status.equals=" + DEFAULT_STATUS);

        // Get all the performanceAppraisalList where status equals to UPDATED_STATUS
        defaultPerformanceAppraisalShouldNotBeFound("status.equals=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByStatusIsInShouldWork() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where status in DEFAULT_STATUS or UPDATED_STATUS
        defaultPerformanceAppraisalShouldBeFound("status.in=" + DEFAULT_STATUS + "," + UPDATED_STATUS);

        // Get all the performanceAppraisalList where status equals to UPDATED_STATUS
        defaultPerformanceAppraisalShouldNotBeFound("status.in=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByStatusIsNullOrNotNull() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where status is not null
        defaultPerformanceAppraisalShouldBeFound("status.specified=true");

        // Get all the performanceAppraisalList where status is null
        defaultPerformanceAppraisalShouldNotBeFound("status.specified=false");
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByStatusContainsSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where status contains DEFAULT_STATUS
        defaultPerformanceAppraisalShouldBeFound("status.contains=" + DEFAULT_STATUS);

        // Get all the performanceAppraisalList where status contains UPDATED_STATUS
        defaultPerformanceAppraisalShouldNotBeFound("status.contains=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByStatusNotContainsSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where status does not contain DEFAULT_STATUS
        defaultPerformanceAppraisalShouldNotBeFound("status.doesNotContain=" + DEFAULT_STATUS);

        // Get all the performanceAppraisalList where status does not contain UPDATED_STATUS
        defaultPerformanceAppraisalShouldBeFound("status.doesNotContain=" + UPDATED_STATUS);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByCompanyIdIsEqualToSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where companyId equals to DEFAULT_COMPANY_ID
        defaultPerformanceAppraisalShouldBeFound("companyId.equals=" + DEFAULT_COMPANY_ID);

        // Get all the performanceAppraisalList where companyId equals to UPDATED_COMPANY_ID
        defaultPerformanceAppraisalShouldNotBeFound("companyId.equals=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByCompanyIdIsInShouldWork() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where companyId in DEFAULT_COMPANY_ID or UPDATED_COMPANY_ID
        defaultPerformanceAppraisalShouldBeFound("companyId.in=" + DEFAULT_COMPANY_ID + "," + UPDATED_COMPANY_ID);

        // Get all the performanceAppraisalList where companyId equals to UPDATED_COMPANY_ID
        defaultPerformanceAppraisalShouldNotBeFound("companyId.in=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByCompanyIdIsNullOrNotNull() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where companyId is not null
        defaultPerformanceAppraisalShouldBeFound("companyId.specified=true");

        // Get all the performanceAppraisalList where companyId is null
        defaultPerformanceAppraisalShouldNotBeFound("companyId.specified=false");
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByCompanyIdIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where companyId is greater than or equal to DEFAULT_COMPANY_ID
        defaultPerformanceAppraisalShouldBeFound("companyId.greaterThanOrEqual=" + DEFAULT_COMPANY_ID);

        // Get all the performanceAppraisalList where companyId is greater than or equal to UPDATED_COMPANY_ID
        defaultPerformanceAppraisalShouldNotBeFound("companyId.greaterThanOrEqual=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByCompanyIdIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where companyId is less than or equal to DEFAULT_COMPANY_ID
        defaultPerformanceAppraisalShouldBeFound("companyId.lessThanOrEqual=" + DEFAULT_COMPANY_ID);

        // Get all the performanceAppraisalList where companyId is less than or equal to SMALLER_COMPANY_ID
        defaultPerformanceAppraisalShouldNotBeFound("companyId.lessThanOrEqual=" + SMALLER_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByCompanyIdIsLessThanSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where companyId is less than DEFAULT_COMPANY_ID
        defaultPerformanceAppraisalShouldNotBeFound("companyId.lessThan=" + DEFAULT_COMPANY_ID);

        // Get all the performanceAppraisalList where companyId is less than UPDATED_COMPANY_ID
        defaultPerformanceAppraisalShouldBeFound("companyId.lessThan=" + UPDATED_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByCompanyIdIsGreaterThanSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where companyId is greater than DEFAULT_COMPANY_ID
        defaultPerformanceAppraisalShouldNotBeFound("companyId.greaterThan=" + DEFAULT_COMPANY_ID);

        // Get all the performanceAppraisalList where companyId is greater than SMALLER_COMPANY_ID
        defaultPerformanceAppraisalShouldBeFound("companyId.greaterThan=" + SMALLER_COMPANY_ID);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByLastModifiedIsEqualToSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where lastModified equals to DEFAULT_LAST_MODIFIED
        defaultPerformanceAppraisalShouldBeFound("lastModified.equals=" + DEFAULT_LAST_MODIFIED);

        // Get all the performanceAppraisalList where lastModified equals to UPDATED_LAST_MODIFIED
        defaultPerformanceAppraisalShouldNotBeFound("lastModified.equals=" + UPDATED_LAST_MODIFIED);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByLastModifiedIsInShouldWork() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where lastModified in DEFAULT_LAST_MODIFIED or UPDATED_LAST_MODIFIED
        defaultPerformanceAppraisalShouldBeFound("lastModified.in=" + DEFAULT_LAST_MODIFIED + "," + UPDATED_LAST_MODIFIED);

        // Get all the performanceAppraisalList where lastModified equals to UPDATED_LAST_MODIFIED
        defaultPerformanceAppraisalShouldNotBeFound("lastModified.in=" + UPDATED_LAST_MODIFIED);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByLastModifiedIsNullOrNotNull() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where lastModified is not null
        defaultPerformanceAppraisalShouldBeFound("lastModified.specified=true");

        // Get all the performanceAppraisalList where lastModified is null
        defaultPerformanceAppraisalShouldNotBeFound("lastModified.specified=false");
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByLastModifiedByIsEqualToSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where lastModifiedBy equals to DEFAULT_LAST_MODIFIED_BY
        defaultPerformanceAppraisalShouldBeFound("lastModifiedBy.equals=" + DEFAULT_LAST_MODIFIED_BY);

        // Get all the performanceAppraisalList where lastModifiedBy equals to UPDATED_LAST_MODIFIED_BY
        defaultPerformanceAppraisalShouldNotBeFound("lastModifiedBy.equals=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByLastModifiedByIsInShouldWork() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where lastModifiedBy in DEFAULT_LAST_MODIFIED_BY or UPDATED_LAST_MODIFIED_BY
        defaultPerformanceAppraisalShouldBeFound("lastModifiedBy.in=" + DEFAULT_LAST_MODIFIED_BY + "," + UPDATED_LAST_MODIFIED_BY);

        // Get all the performanceAppraisalList where lastModifiedBy equals to UPDATED_LAST_MODIFIED_BY
        defaultPerformanceAppraisalShouldNotBeFound("lastModifiedBy.in=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByLastModifiedByIsNullOrNotNull() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where lastModifiedBy is not null
        defaultPerformanceAppraisalShouldBeFound("lastModifiedBy.specified=true");

        // Get all the performanceAppraisalList where lastModifiedBy is null
        defaultPerformanceAppraisalShouldNotBeFound("lastModifiedBy.specified=false");
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByLastModifiedByContainsSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where lastModifiedBy contains DEFAULT_LAST_MODIFIED_BY
        defaultPerformanceAppraisalShouldBeFound("lastModifiedBy.contains=" + DEFAULT_LAST_MODIFIED_BY);

        // Get all the performanceAppraisalList where lastModifiedBy contains UPDATED_LAST_MODIFIED_BY
        defaultPerformanceAppraisalShouldNotBeFound("lastModifiedBy.contains=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByLastModifiedByNotContainsSomething() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        // Get all the performanceAppraisalList where lastModifiedBy does not contain DEFAULT_LAST_MODIFIED_BY
        defaultPerformanceAppraisalShouldNotBeFound("lastModifiedBy.doesNotContain=" + DEFAULT_LAST_MODIFIED_BY);

        // Get all the performanceAppraisalList where lastModifiedBy does not contain UPDATED_LAST_MODIFIED_BY
        defaultPerformanceAppraisalShouldBeFound("lastModifiedBy.doesNotContain=" + UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void getAllPerformanceAppraisalsByAppraisalReviewIsEqualToSomething() throws Exception {
        AppraisalReview appraisalReview;
        if (TestUtil.findAll(em, AppraisalReview.class).isEmpty()) {
            performanceAppraisalRepository.saveAndFlush(performanceAppraisal);
            appraisalReview = AppraisalReviewResourceIT.createEntity(em);
        } else {
            appraisalReview = TestUtil.findAll(em, AppraisalReview.class).get(0);
        }
        em.persist(appraisalReview);
        em.flush();
        performanceAppraisal.setAppraisalReview(appraisalReview);
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);
        Long appraisalReviewId = appraisalReview.getId();

        // Get all the performanceAppraisalList where appraisalReview equals to appraisalReviewId
        defaultPerformanceAppraisalShouldBeFound("appraisalReviewId.equals=" + appraisalReviewId);

        // Get all the performanceAppraisalList where appraisalReview equals to (appraisalReviewId + 1)
        defaultPerformanceAppraisalShouldNotBeFound("appraisalReviewId.equals=" + (appraisalReviewId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultPerformanceAppraisalShouldBeFound(String filter) throws Exception {
        restPerformanceAppraisalMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(performanceAppraisal.getId().intValue())))
            .andExpect(jsonPath("$.[*].employeeId").value(hasItem(DEFAULT_EMPLOYEE_ID.intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].companyId").value(hasItem(DEFAULT_COMPANY_ID.intValue())))
            .andExpect(jsonPath("$.[*].lastModified").value(hasItem(DEFAULT_LAST_MODIFIED.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)));

        // Check, that the count call also returns 1
        restPerformanceAppraisalMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultPerformanceAppraisalShouldNotBeFound(String filter) throws Exception {
        restPerformanceAppraisalMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restPerformanceAppraisalMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingPerformanceAppraisal() throws Exception {
        // Get the performanceAppraisal
        restPerformanceAppraisalMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPerformanceAppraisal() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        int databaseSizeBeforeUpdate = performanceAppraisalRepository.findAll().size();

        // Update the performanceAppraisal
        PerformanceAppraisal updatedPerformanceAppraisal = performanceAppraisalRepository.findById(performanceAppraisal.getId()).get();
        // Disconnect from session so that the updates on updatedPerformanceAppraisal are not directly saved in db
        em.detach(updatedPerformanceAppraisal);
        updatedPerformanceAppraisal
            .employeeId(UPDATED_EMPLOYEE_ID)
            .status(UPDATED_STATUS)
            .companyId(UPDATED_COMPANY_ID)
            .lastModified(UPDATED_LAST_MODIFIED)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);
        PerformanceAppraisalDTO performanceAppraisalDTO = performanceAppraisalMapper.toDto(updatedPerformanceAppraisal);

        restPerformanceAppraisalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, performanceAppraisalDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(performanceAppraisalDTO))
            )
            .andExpect(status().isOk());

        // Validate the PerformanceAppraisal in the database
        List<PerformanceAppraisal> performanceAppraisalList = performanceAppraisalRepository.findAll();
        assertThat(performanceAppraisalList).hasSize(databaseSizeBeforeUpdate);
        PerformanceAppraisal testPerformanceAppraisal = performanceAppraisalList.get(performanceAppraisalList.size() - 1);
        assertThat(testPerformanceAppraisal.getEmployeeId()).isEqualTo(UPDATED_EMPLOYEE_ID);
        assertThat(testPerformanceAppraisal.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testPerformanceAppraisal.getCompanyId()).isEqualTo(UPDATED_COMPANY_ID);
        assertThat(testPerformanceAppraisal.getLastModified()).isEqualTo(UPDATED_LAST_MODIFIED);
        assertThat(testPerformanceAppraisal.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void putNonExistingPerformanceAppraisal() throws Exception {
        int databaseSizeBeforeUpdate = performanceAppraisalRepository.findAll().size();
        performanceAppraisal.setId(count.incrementAndGet());

        // Create the PerformanceAppraisal
        PerformanceAppraisalDTO performanceAppraisalDTO = performanceAppraisalMapper.toDto(performanceAppraisal);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPerformanceAppraisalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, performanceAppraisalDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(performanceAppraisalDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PerformanceAppraisal in the database
        List<PerformanceAppraisal> performanceAppraisalList = performanceAppraisalRepository.findAll();
        assertThat(performanceAppraisalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPerformanceAppraisal() throws Exception {
        int databaseSizeBeforeUpdate = performanceAppraisalRepository.findAll().size();
        performanceAppraisal.setId(count.incrementAndGet());

        // Create the PerformanceAppraisal
        PerformanceAppraisalDTO performanceAppraisalDTO = performanceAppraisalMapper.toDto(performanceAppraisal);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPerformanceAppraisalMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(performanceAppraisalDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PerformanceAppraisal in the database
        List<PerformanceAppraisal> performanceAppraisalList = performanceAppraisalRepository.findAll();
        assertThat(performanceAppraisalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPerformanceAppraisal() throws Exception {
        int databaseSizeBeforeUpdate = performanceAppraisalRepository.findAll().size();
        performanceAppraisal.setId(count.incrementAndGet());

        // Create the PerformanceAppraisal
        PerformanceAppraisalDTO performanceAppraisalDTO = performanceAppraisalMapper.toDto(performanceAppraisal);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPerformanceAppraisalMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(performanceAppraisalDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PerformanceAppraisal in the database
        List<PerformanceAppraisal> performanceAppraisalList = performanceAppraisalRepository.findAll();
        assertThat(performanceAppraisalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePerformanceAppraisalWithPatch() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        int databaseSizeBeforeUpdate = performanceAppraisalRepository.findAll().size();

        // Update the performanceAppraisal using partial update
        PerformanceAppraisal partialUpdatedPerformanceAppraisal = new PerformanceAppraisal();
        partialUpdatedPerformanceAppraisal.setId(performanceAppraisal.getId());

        partialUpdatedPerformanceAppraisal.employeeId(UPDATED_EMPLOYEE_ID);

        restPerformanceAppraisalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPerformanceAppraisal.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPerformanceAppraisal))
            )
            .andExpect(status().isOk());

        // Validate the PerformanceAppraisal in the database
        List<PerformanceAppraisal> performanceAppraisalList = performanceAppraisalRepository.findAll();
        assertThat(performanceAppraisalList).hasSize(databaseSizeBeforeUpdate);
        PerformanceAppraisal testPerformanceAppraisal = performanceAppraisalList.get(performanceAppraisalList.size() - 1);
        assertThat(testPerformanceAppraisal.getEmployeeId()).isEqualTo(UPDATED_EMPLOYEE_ID);
        assertThat(testPerformanceAppraisal.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testPerformanceAppraisal.getCompanyId()).isEqualTo(DEFAULT_COMPANY_ID);
        assertThat(testPerformanceAppraisal.getLastModified()).isEqualTo(DEFAULT_LAST_MODIFIED);
        assertThat(testPerformanceAppraisal.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void fullUpdatePerformanceAppraisalWithPatch() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        int databaseSizeBeforeUpdate = performanceAppraisalRepository.findAll().size();

        // Update the performanceAppraisal using partial update
        PerformanceAppraisal partialUpdatedPerformanceAppraisal = new PerformanceAppraisal();
        partialUpdatedPerformanceAppraisal.setId(performanceAppraisal.getId());

        partialUpdatedPerformanceAppraisal
            .employeeId(UPDATED_EMPLOYEE_ID)
            .status(UPDATED_STATUS)
            .companyId(UPDATED_COMPANY_ID)
            .lastModified(UPDATED_LAST_MODIFIED)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restPerformanceAppraisalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPerformanceAppraisal.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPerformanceAppraisal))
            )
            .andExpect(status().isOk());

        // Validate the PerformanceAppraisal in the database
        List<PerformanceAppraisal> performanceAppraisalList = performanceAppraisalRepository.findAll();
        assertThat(performanceAppraisalList).hasSize(databaseSizeBeforeUpdate);
        PerformanceAppraisal testPerformanceAppraisal = performanceAppraisalList.get(performanceAppraisalList.size() - 1);
        assertThat(testPerformanceAppraisal.getEmployeeId()).isEqualTo(UPDATED_EMPLOYEE_ID);
        assertThat(testPerformanceAppraisal.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testPerformanceAppraisal.getCompanyId()).isEqualTo(UPDATED_COMPANY_ID);
        assertThat(testPerformanceAppraisal.getLastModified()).isEqualTo(UPDATED_LAST_MODIFIED);
        assertThat(testPerformanceAppraisal.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    void patchNonExistingPerformanceAppraisal() throws Exception {
        int databaseSizeBeforeUpdate = performanceAppraisalRepository.findAll().size();
        performanceAppraisal.setId(count.incrementAndGet());

        // Create the PerformanceAppraisal
        PerformanceAppraisalDTO performanceAppraisalDTO = performanceAppraisalMapper.toDto(performanceAppraisal);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPerformanceAppraisalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, performanceAppraisalDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(performanceAppraisalDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PerformanceAppraisal in the database
        List<PerformanceAppraisal> performanceAppraisalList = performanceAppraisalRepository.findAll();
        assertThat(performanceAppraisalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPerformanceAppraisal() throws Exception {
        int databaseSizeBeforeUpdate = performanceAppraisalRepository.findAll().size();
        performanceAppraisal.setId(count.incrementAndGet());

        // Create the PerformanceAppraisal
        PerformanceAppraisalDTO performanceAppraisalDTO = performanceAppraisalMapper.toDto(performanceAppraisal);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPerformanceAppraisalMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(performanceAppraisalDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PerformanceAppraisal in the database
        List<PerformanceAppraisal> performanceAppraisalList = performanceAppraisalRepository.findAll();
        assertThat(performanceAppraisalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPerformanceAppraisal() throws Exception {
        int databaseSizeBeforeUpdate = performanceAppraisalRepository.findAll().size();
        performanceAppraisal.setId(count.incrementAndGet());

        // Create the PerformanceAppraisal
        PerformanceAppraisalDTO performanceAppraisalDTO = performanceAppraisalMapper.toDto(performanceAppraisal);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPerformanceAppraisalMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(performanceAppraisalDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PerformanceAppraisal in the database
        List<PerformanceAppraisal> performanceAppraisalList = performanceAppraisalRepository.findAll();
        assertThat(performanceAppraisalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePerformanceAppraisal() throws Exception {
        // Initialize the database
        performanceAppraisalRepository.saveAndFlush(performanceAppraisal);

        int databaseSizeBeforeDelete = performanceAppraisalRepository.findAll().size();

        // Delete the performanceAppraisal
        restPerformanceAppraisalMockMvc
            .perform(delete(ENTITY_API_URL_ID, performanceAppraisal.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PerformanceAppraisal> performanceAppraisalList = performanceAppraisalRepository.findAll();
        assertThat(performanceAppraisalList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
