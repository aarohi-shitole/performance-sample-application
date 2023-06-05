import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../master-performance-indicator.test-samples';

import { MasterPerformanceIndicatorFormService } from './master-performance-indicator-form.service';

describe('MasterPerformanceIndicator Form Service', () => {
  let service: MasterPerformanceIndicatorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterPerformanceIndicatorFormService);
  });

  describe('Service methods', () => {
    describe('createMasterPerformanceIndicatorFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMasterPerformanceIndicatorFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            category: expect.any(Object),
            type: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            weightage: expect.any(Object),
            status: expect.any(Object),
            companyId: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });

      it('passing IMasterPerformanceIndicator should create a new form with FormGroup', () => {
        const formGroup = service.createMasterPerformanceIndicatorFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            category: expect.any(Object),
            type: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            weightage: expect.any(Object),
            status: expect.any(Object),
            companyId: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getMasterPerformanceIndicator', () => {
      it('should return NewMasterPerformanceIndicator for default MasterPerformanceIndicator initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createMasterPerformanceIndicatorFormGroup(sampleWithNewData);

        const masterPerformanceIndicator = service.getMasterPerformanceIndicator(formGroup) as any;

        expect(masterPerformanceIndicator).toMatchObject(sampleWithNewData);
      });

      it('should return NewMasterPerformanceIndicator for empty MasterPerformanceIndicator initial value', () => {
        const formGroup = service.createMasterPerformanceIndicatorFormGroup();

        const masterPerformanceIndicator = service.getMasterPerformanceIndicator(formGroup) as any;

        expect(masterPerformanceIndicator).toMatchObject({});
      });

      it('should return IMasterPerformanceIndicator', () => {
        const formGroup = service.createMasterPerformanceIndicatorFormGroup(sampleWithRequiredData);

        const masterPerformanceIndicator = service.getMasterPerformanceIndicator(formGroup) as any;

        expect(masterPerformanceIndicator).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMasterPerformanceIndicator should not enable id FormControl', () => {
        const formGroup = service.createMasterPerformanceIndicatorFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMasterPerformanceIndicator should disable id FormControl', () => {
        const formGroup = service.createMasterPerformanceIndicatorFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
