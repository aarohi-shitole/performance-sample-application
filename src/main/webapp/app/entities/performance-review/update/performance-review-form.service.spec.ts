import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../performance-review.test-samples';

import { PerformanceReviewFormService } from './performance-review-form.service';

describe('PerformanceReview Form Service', () => {
  let service: PerformanceReviewFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceReviewFormService);
  });

  describe('Service methods', () => {
    describe('createPerformanceReviewFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPerformanceReviewFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            appraisalReviewId: expect.any(Object),
            employeeRemark: expect.any(Object),
            appraiserRemark: expect.any(Object),
            reviewerRemark: expect.any(Object),
            selfScored: expect.any(Object),
            scoredByAppraiser: expect.any(Object),
            scoredByReviewer: expect.any(Object),
            appraisalStatus: expect.any(Object),
            submissionDate: expect.any(Object),
            appraisalDate: expect.any(Object),
            reviewDate: expect.any(Object),
            status: expect.any(Object),
            companyId: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            target: expect.any(Object),
            targetAchived: expect.any(Object),
            performanceIndicator: expect.any(Object),
          })
        );
      });

      it('passing IPerformanceReview should create a new form with FormGroup', () => {
        const formGroup = service.createPerformanceReviewFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            appraisalReviewId: expect.any(Object),
            employeeRemark: expect.any(Object),
            appraiserRemark: expect.any(Object),
            reviewerRemark: expect.any(Object),
            selfScored: expect.any(Object),
            scoredByAppraiser: expect.any(Object),
            scoredByReviewer: expect.any(Object),
            appraisalStatus: expect.any(Object),
            submissionDate: expect.any(Object),
            appraisalDate: expect.any(Object),
            reviewDate: expect.any(Object),
            status: expect.any(Object),
            companyId: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            target: expect.any(Object),
            targetAchived: expect.any(Object),
            performanceIndicator: expect.any(Object),
          })
        );
      });
    });

    describe('getPerformanceReview', () => {
      it('should return NewPerformanceReview for default PerformanceReview initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPerformanceReviewFormGroup(sampleWithNewData);

        const performanceReview = service.getPerformanceReview(formGroup) as any;

        expect(performanceReview).toMatchObject(sampleWithNewData);
      });

      it('should return NewPerformanceReview for empty PerformanceReview initial value', () => {
        const formGroup = service.createPerformanceReviewFormGroup();

        const performanceReview = service.getPerformanceReview(formGroup) as any;

        expect(performanceReview).toMatchObject({});
      });

      it('should return IPerformanceReview', () => {
        const formGroup = service.createPerformanceReviewFormGroup(sampleWithRequiredData);

        const performanceReview = service.getPerformanceReview(formGroup) as any;

        expect(performanceReview).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPerformanceReview should not enable id FormControl', () => {
        const formGroup = service.createPerformanceReviewFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPerformanceReview should disable id FormControl', () => {
        const formGroup = service.createPerformanceReviewFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
