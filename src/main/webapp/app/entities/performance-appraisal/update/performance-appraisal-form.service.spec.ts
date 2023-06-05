import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../performance-appraisal.test-samples';

import { PerformanceAppraisalFormService } from './performance-appraisal-form.service';

describe('PerformanceAppraisal Form Service', () => {
  let service: PerformanceAppraisalFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceAppraisalFormService);
  });

  describe('Service methods', () => {
    describe('createPerformanceAppraisalFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPerformanceAppraisalFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            employeeId: expect.any(Object),
            status: expect.any(Object),
            companyId: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            appraisalReview: expect.any(Object),
          })
        );
      });

      it('passing IPerformanceAppraisal should create a new form with FormGroup', () => {
        const formGroup = service.createPerformanceAppraisalFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            employeeId: expect.any(Object),
            status: expect.any(Object),
            companyId: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            appraisalReview: expect.any(Object),
          })
        );
      });
    });

    describe('getPerformanceAppraisal', () => {
      it('should return NewPerformanceAppraisal for default PerformanceAppraisal initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPerformanceAppraisalFormGroup(sampleWithNewData);

        const performanceAppraisal = service.getPerformanceAppraisal(formGroup) as any;

        expect(performanceAppraisal).toMatchObject(sampleWithNewData);
      });

      it('should return NewPerformanceAppraisal for empty PerformanceAppraisal initial value', () => {
        const formGroup = service.createPerformanceAppraisalFormGroup();

        const performanceAppraisal = service.getPerformanceAppraisal(formGroup) as any;

        expect(performanceAppraisal).toMatchObject({});
      });

      it('should return IPerformanceAppraisal', () => {
        const formGroup = service.createPerformanceAppraisalFormGroup(sampleWithRequiredData);

        const performanceAppraisal = service.getPerformanceAppraisal(formGroup) as any;

        expect(performanceAppraisal).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPerformanceAppraisal should not enable id FormControl', () => {
        const formGroup = service.createPerformanceAppraisalFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPerformanceAppraisal should disable id FormControl', () => {
        const formGroup = service.createPerformanceAppraisalFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
