import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../appraisal-evaluation-parameter.test-samples';

import { AppraisalEvaluationParameterFormService } from './appraisal-evaluation-parameter-form.service';

describe('AppraisalEvaluationParameter Form Service', () => {
  let service: AppraisalEvaluationParameterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppraisalEvaluationParameterFormService);
  });

  describe('Service methods', () => {
    describe('createAppraisalEvaluationParameterFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAppraisalEvaluationParameterFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            type: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });

      it('passing IAppraisalEvaluationParameter should create a new form with FormGroup', () => {
        const formGroup = service.createAppraisalEvaluationParameterFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
            type: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getAppraisalEvaluationParameter', () => {
      it('should return NewAppraisalEvaluationParameter for default AppraisalEvaluationParameter initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAppraisalEvaluationParameterFormGroup(sampleWithNewData);

        const appraisalEvaluationParameter = service.getAppraisalEvaluationParameter(formGroup) as any;

        expect(appraisalEvaluationParameter).toMatchObject(sampleWithNewData);
      });

      it('should return NewAppraisalEvaluationParameter for empty AppraisalEvaluationParameter initial value', () => {
        const formGroup = service.createAppraisalEvaluationParameterFormGroup();

        const appraisalEvaluationParameter = service.getAppraisalEvaluationParameter(formGroup) as any;

        expect(appraisalEvaluationParameter).toMatchObject({});
      });

      it('should return IAppraisalEvaluationParameter', () => {
        const formGroup = service.createAppraisalEvaluationParameterFormGroup(sampleWithRequiredData);

        const appraisalEvaluationParameter = service.getAppraisalEvaluationParameter(formGroup) as any;

        expect(appraisalEvaluationParameter).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAppraisalEvaluationParameter should not enable id FormControl', () => {
        const formGroup = service.createAppraisalEvaluationParameterFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAppraisalEvaluationParameter should disable id FormControl', () => {
        const formGroup = service.createAppraisalEvaluationParameterFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
