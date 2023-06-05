import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../appraisal-comments-review.test-samples';

import { AppraisalCommentsReviewFormService } from './appraisal-comments-review-form.service';

describe('AppraisalCommentsReview Form Service', () => {
  let service: AppraisalCommentsReviewFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppraisalCommentsReviewFormService);
  });

  describe('Service methods', () => {
    describe('createAppraisalCommentsReviewFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAppraisalCommentsReviewFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            comment: expect.any(Object),
            commentType: expect.any(Object),
            appraisalReviewId: expect.any(Object),
            refFormName: expect.any(Object),
            status: expect.any(Object),
            companyId: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            employee: expect.any(Object),
          })
        );
      });

      it('passing IAppraisalCommentsReview should create a new form with FormGroup', () => {
        const formGroup = service.createAppraisalCommentsReviewFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            comment: expect.any(Object),
            commentType: expect.any(Object),
            appraisalReviewId: expect.any(Object),
            refFormName: expect.any(Object),
            status: expect.any(Object),
            companyId: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            employee: expect.any(Object),
          })
        );
      });
    });

    describe('getAppraisalCommentsReview', () => {
      it('should return NewAppraisalCommentsReview for default AppraisalCommentsReview initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAppraisalCommentsReviewFormGroup(sampleWithNewData);

        const appraisalCommentsReview = service.getAppraisalCommentsReview(formGroup) as any;

        expect(appraisalCommentsReview).toMatchObject(sampleWithNewData);
      });

      it('should return NewAppraisalCommentsReview for empty AppraisalCommentsReview initial value', () => {
        const formGroup = service.createAppraisalCommentsReviewFormGroup();

        const appraisalCommentsReview = service.getAppraisalCommentsReview(formGroup) as any;

        expect(appraisalCommentsReview).toMatchObject({});
      });

      it('should return IAppraisalCommentsReview', () => {
        const formGroup = service.createAppraisalCommentsReviewFormGroup(sampleWithRequiredData);

        const appraisalCommentsReview = service.getAppraisalCommentsReview(formGroup) as any;

        expect(appraisalCommentsReview).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAppraisalCommentsReview should not enable id FormControl', () => {
        const formGroup = service.createAppraisalCommentsReviewFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAppraisalCommentsReview should disable id FormControl', () => {
        const formGroup = service.createAppraisalCommentsReviewFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
