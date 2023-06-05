import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../appraisal-evaluation.test-samples';

import { AppraisalEvaluationFormService } from './appraisal-evaluation-form.service';

describe('AppraisalEvaluation Form Service', () => {
  let service: AppraisalEvaluationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppraisalEvaluationFormService);
  });

  describe('Service methods', () => {
    describe('createAppraisalEvaluationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAppraisalEvaluationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            answerFlag: expect.any(Object),
            description: expect.any(Object),
            employeeId: expect.any(Object),
            appraisalReviewId: expect.any(Object),
            availablePoints: expect.any(Object),
            scoredPoints: expect.any(Object),
            remark: expect.any(Object),
            status: expect.any(Object),
            companyId: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            appraisalEvaluationParameter: expect.any(Object),
          })
        );
      });

      it('passing IAppraisalEvaluation should create a new form with FormGroup', () => {
        const formGroup = service.createAppraisalEvaluationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            answerFlag: expect.any(Object),
            description: expect.any(Object),
            employeeId: expect.any(Object),
            appraisalReviewId: expect.any(Object),
            availablePoints: expect.any(Object),
            scoredPoints: expect.any(Object),
            remark: expect.any(Object),
            status: expect.any(Object),
            companyId: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            appraisalEvaluationParameter: expect.any(Object),
          })
        );
      });
    });

    describe('getAppraisalEvaluation', () => {
      it('should return NewAppraisalEvaluation for default AppraisalEvaluation initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAppraisalEvaluationFormGroup(sampleWithNewData);

        const appraisalEvaluation = service.getAppraisalEvaluation(formGroup) as any;

        expect(appraisalEvaluation).toMatchObject(sampleWithNewData);
      });

      it('should return NewAppraisalEvaluation for empty AppraisalEvaluation initial value', () => {
        const formGroup = service.createAppraisalEvaluationFormGroup();

        const appraisalEvaluation = service.getAppraisalEvaluation(formGroup) as any;

        expect(appraisalEvaluation).toMatchObject({});
      });

      it('should return IAppraisalEvaluation', () => {
        const formGroup = service.createAppraisalEvaluationFormGroup(sampleWithRequiredData);

        const appraisalEvaluation = service.getAppraisalEvaluation(formGroup) as any;

        expect(appraisalEvaluation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAppraisalEvaluation should not enable id FormControl', () => {
        const formGroup = service.createAppraisalEvaluationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAppraisalEvaluation should disable id FormControl', () => {
        const formGroup = service.createAppraisalEvaluationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
