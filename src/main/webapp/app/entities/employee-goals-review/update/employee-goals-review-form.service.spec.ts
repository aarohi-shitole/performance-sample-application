import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../employee-goals-review.test-samples';

import { EmployeeGoalsReviewFormService } from './employee-goals-review-form.service';

describe('EmployeeGoalsReview Form Service', () => {
  let service: EmployeeGoalsReviewFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeGoalsReviewFormService);
  });

  describe('Service methods', () => {
    describe('createEmployeeGoalsReviewFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEmployeeGoalsReviewFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            goalDescription: expect.any(Object),
            goalCategory: expect.any(Object),
            goaltype: expect.any(Object),
            goalSetBy: expect.any(Object),
            employeeId: expect.any(Object),
            appraisalReviewId: expect.any(Object),
            status: expect.any(Object),
            companyId: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });

      it('passing IEmployeeGoalsReview should create a new form with FormGroup', () => {
        const formGroup = service.createEmployeeGoalsReviewFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            goalDescription: expect.any(Object),
            goalCategory: expect.any(Object),
            goaltype: expect.any(Object),
            goalSetBy: expect.any(Object),
            employeeId: expect.any(Object),
            appraisalReviewId: expect.any(Object),
            status: expect.any(Object),
            companyId: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getEmployeeGoalsReview', () => {
      it('should return NewEmployeeGoalsReview for default EmployeeGoalsReview initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEmployeeGoalsReviewFormGroup(sampleWithNewData);

        const employeeGoalsReview = service.getEmployeeGoalsReview(formGroup) as any;

        expect(employeeGoalsReview).toMatchObject(sampleWithNewData);
      });

      it('should return NewEmployeeGoalsReview for empty EmployeeGoalsReview initial value', () => {
        const formGroup = service.createEmployeeGoalsReviewFormGroup();

        const employeeGoalsReview = service.getEmployeeGoalsReview(formGroup) as any;

        expect(employeeGoalsReview).toMatchObject({});
      });

      it('should return IEmployeeGoalsReview', () => {
        const formGroup = service.createEmployeeGoalsReviewFormGroup(sampleWithRequiredData);

        const employeeGoalsReview = service.getEmployeeGoalsReview(formGroup) as any;

        expect(employeeGoalsReview).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEmployeeGoalsReview should not enable id FormControl', () => {
        const formGroup = service.createEmployeeGoalsReviewFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEmployeeGoalsReview should disable id FormControl', () => {
        const formGroup = service.createEmployeeGoalsReviewFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
