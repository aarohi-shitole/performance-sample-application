import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../appraisal-review.test-samples';

import { AppraisalReviewFormService } from './appraisal-review-form.service';

describe('AppraisalReview Form Service', () => {
  let service: AppraisalReviewFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppraisalReviewFormService);
  });

  describe('Service methods', () => {
    describe('createAppraisalReviewFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAppraisalReviewFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingOfficer: expect.any(Object),
            roDesignation: expect.any(Object),
            status: expect.any(Object),
            companyId: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            employee: expect.any(Object),
          })
        );
      });

      it('passing IAppraisalReview should create a new form with FormGroup', () => {
        const formGroup = service.createAppraisalReviewFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            reportingOfficer: expect.any(Object),
            roDesignation: expect.any(Object),
            status: expect.any(Object),
            companyId: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            employee: expect.any(Object),
          })
        );
      });
    });

    describe('getAppraisalReview', () => {
      it('should return NewAppraisalReview for default AppraisalReview initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAppraisalReviewFormGroup(sampleWithNewData);

        const appraisalReview = service.getAppraisalReview(formGroup) as any;

        expect(appraisalReview).toMatchObject(sampleWithNewData);
      });

      it('should return NewAppraisalReview for empty AppraisalReview initial value', () => {
        const formGroup = service.createAppraisalReviewFormGroup();

        const appraisalReview = service.getAppraisalReview(formGroup) as any;

        expect(appraisalReview).toMatchObject({});
      });

      it('should return IAppraisalReview', () => {
        const formGroup = service.createAppraisalReviewFormGroup(sampleWithRequiredData);

        const appraisalReview = service.getAppraisalReview(formGroup) as any;

        expect(appraisalReview).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAppraisalReview should not enable id FormControl', () => {
        const formGroup = service.createAppraisalReviewFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAppraisalReview should disable id FormControl', () => {
        const formGroup = service.createAppraisalReviewFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
