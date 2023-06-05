import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../performance-indicator.test-samples';

import { PerformanceIndicatorFormService } from './performance-indicator-form.service';

describe('PerformanceIndicator Form Service', () => {
  let service: PerformanceIndicatorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceIndicatorFormService);
  });

  describe('Service methods', () => {
    describe('createPerformanceIndicatorFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPerformanceIndicatorFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            designationId: expect.any(Object),
            indicatorValue: expect.any(Object),
            status: expect.any(Object),
            companyId: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            masterPerformanceIndicator: expect.any(Object),
          })
        );
      });

      it('passing IPerformanceIndicator should create a new form with FormGroup', () => {
        const formGroup = service.createPerformanceIndicatorFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            designationId: expect.any(Object),
            indicatorValue: expect.any(Object),
            status: expect.any(Object),
            companyId: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            masterPerformanceIndicator: expect.any(Object),
          })
        );
      });
    });

    describe('getPerformanceIndicator', () => {
      it('should return NewPerformanceIndicator for default PerformanceIndicator initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPerformanceIndicatorFormGroup(sampleWithNewData);

        const performanceIndicator = service.getPerformanceIndicator(formGroup) as any;

        expect(performanceIndicator).toMatchObject(sampleWithNewData);
      });

      it('should return NewPerformanceIndicator for empty PerformanceIndicator initial value', () => {
        const formGroup = service.createPerformanceIndicatorFormGroup();

        const performanceIndicator = service.getPerformanceIndicator(formGroup) as any;

        expect(performanceIndicator).toMatchObject({});
      });

      it('should return IPerformanceIndicator', () => {
        const formGroup = service.createPerformanceIndicatorFormGroup(sampleWithRequiredData);

        const performanceIndicator = service.getPerformanceIndicator(formGroup) as any;

        expect(performanceIndicator).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPerformanceIndicator should not enable id FormControl', () => {
        const formGroup = service.createPerformanceIndicatorFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPerformanceIndicator should disable id FormControl', () => {
        const formGroup = service.createPerformanceIndicatorFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
