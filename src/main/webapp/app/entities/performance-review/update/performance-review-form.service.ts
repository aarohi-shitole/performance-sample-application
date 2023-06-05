import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPerformanceReview, NewPerformanceReview } from '../performance-review.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPerformanceReview for edit and NewPerformanceReviewFormGroupInput for create.
 */
type PerformanceReviewFormGroupInput = IPerformanceReview | PartialWithRequiredKeyOf<NewPerformanceReview>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPerformanceReview | NewPerformanceReview> = Omit<
  T,
  'submissionDate' | 'appraisalDate' | 'reviewDate' | 'lastModified'
> & {
  submissionDate?: string | null;
  appraisalDate?: string | null;
  reviewDate?: string | null;
  lastModified?: string | null;
};

type PerformanceReviewFormRawValue = FormValueOf<IPerformanceReview>;

type NewPerformanceReviewFormRawValue = FormValueOf<NewPerformanceReview>;

type PerformanceReviewFormDefaults = Pick<NewPerformanceReview, 'id' | 'submissionDate' | 'appraisalDate' | 'reviewDate' | 'lastModified'>;

type PerformanceReviewFormGroupContent = {
  id: FormControl<PerformanceReviewFormRawValue['id'] | NewPerformanceReview['id']>;
  appraisalReviewId: FormControl<PerformanceReviewFormRawValue['appraisalReviewId']>;
  employeeRemark: FormControl<PerformanceReviewFormRawValue['employeeRemark']>;
  appraiserRemark: FormControl<PerformanceReviewFormRawValue['appraiserRemark']>;
  reviewerRemark: FormControl<PerformanceReviewFormRawValue['reviewerRemark']>;
  selfScored: FormControl<PerformanceReviewFormRawValue['selfScored']>;
  scoredByAppraiser: FormControl<PerformanceReviewFormRawValue['scoredByAppraiser']>;
  scoredByReviewer: FormControl<PerformanceReviewFormRawValue['scoredByReviewer']>;
  appraisalStatus: FormControl<PerformanceReviewFormRawValue['appraisalStatus']>;
  submissionDate: FormControl<PerformanceReviewFormRawValue['submissionDate']>;
  appraisalDate: FormControl<PerformanceReviewFormRawValue['appraisalDate']>;
  reviewDate: FormControl<PerformanceReviewFormRawValue['reviewDate']>;
  status: FormControl<PerformanceReviewFormRawValue['status']>;
  companyId: FormControl<PerformanceReviewFormRawValue['companyId']>;
  lastModified: FormControl<PerformanceReviewFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<PerformanceReviewFormRawValue['lastModifiedBy']>;
  target: FormControl<PerformanceReviewFormRawValue['target']>;
  targetAchived: FormControl<PerformanceReviewFormRawValue['targetAchived']>;
  performanceIndicator: FormControl<PerformanceReviewFormRawValue['performanceIndicator']>;
};

export type PerformanceReviewFormGroup = FormGroup<PerformanceReviewFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PerformanceReviewFormService {
  createPerformanceReviewFormGroup(performanceReview: PerformanceReviewFormGroupInput = { id: null }): PerformanceReviewFormGroup {
    const performanceReviewRawValue = this.convertPerformanceReviewToPerformanceReviewRawValue({
      ...this.getFormDefaults(),
      ...performanceReview,
    });
    return new FormGroup<PerformanceReviewFormGroupContent>({
      id: new FormControl(
        { value: performanceReviewRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      appraisalReviewId: new FormControl(performanceReviewRawValue.appraisalReviewId),
      employeeRemark: new FormControl(performanceReviewRawValue.employeeRemark),
      appraiserRemark: new FormControl(performanceReviewRawValue.appraiserRemark),
      reviewerRemark: new FormControl(performanceReviewRawValue.reviewerRemark),
      selfScored: new FormControl(performanceReviewRawValue.selfScored),
      scoredByAppraiser: new FormControl(performanceReviewRawValue.scoredByAppraiser),
      scoredByReviewer: new FormControl(performanceReviewRawValue.scoredByReviewer),
      appraisalStatus: new FormControl(performanceReviewRawValue.appraisalStatus),
      submissionDate: new FormControl(performanceReviewRawValue.submissionDate),
      appraisalDate: new FormControl(performanceReviewRawValue.appraisalDate),
      reviewDate: new FormControl(performanceReviewRawValue.reviewDate),
      status: new FormControl(performanceReviewRawValue.status),
      companyId: new FormControl(performanceReviewRawValue.companyId),
      lastModified: new FormControl(performanceReviewRawValue.lastModified),
      lastModifiedBy: new FormControl(performanceReviewRawValue.lastModifiedBy),
      target: new FormControl(performanceReviewRawValue.target),
      targetAchived: new FormControl(performanceReviewRawValue.targetAchived),
      performanceIndicator: new FormControl(performanceReviewRawValue.performanceIndicator),
    });
  }

  getPerformanceReview(form: PerformanceReviewFormGroup): IPerformanceReview | NewPerformanceReview {
    return this.convertPerformanceReviewRawValueToPerformanceReview(
      form.getRawValue() as PerformanceReviewFormRawValue | NewPerformanceReviewFormRawValue
    );
  }

  resetForm(form: PerformanceReviewFormGroup, performanceReview: PerformanceReviewFormGroupInput): void {
    const performanceReviewRawValue = this.convertPerformanceReviewToPerformanceReviewRawValue({
      ...this.getFormDefaults(),
      ...performanceReview,
    });
    form.reset(
      {
        ...performanceReviewRawValue,
        id: { value: performanceReviewRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PerformanceReviewFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      submissionDate: currentTime,
      appraisalDate: currentTime,
      reviewDate: currentTime,
      lastModified: currentTime,
    };
  }

  private convertPerformanceReviewRawValueToPerformanceReview(
    rawPerformanceReview: PerformanceReviewFormRawValue | NewPerformanceReviewFormRawValue
  ): IPerformanceReview | NewPerformanceReview {
    return {
      ...rawPerformanceReview,
      submissionDate: dayjs(rawPerformanceReview.submissionDate, DATE_TIME_FORMAT),
      appraisalDate: dayjs(rawPerformanceReview.appraisalDate, DATE_TIME_FORMAT),
      reviewDate: dayjs(rawPerformanceReview.reviewDate, DATE_TIME_FORMAT),
      lastModified: dayjs(rawPerformanceReview.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertPerformanceReviewToPerformanceReviewRawValue(
    performanceReview: IPerformanceReview | (Partial<NewPerformanceReview> & PerformanceReviewFormDefaults)
  ): PerformanceReviewFormRawValue | PartialWithRequiredKeyOf<NewPerformanceReviewFormRawValue> {
    return {
      ...performanceReview,
      submissionDate: performanceReview.submissionDate ? performanceReview.submissionDate.format(DATE_TIME_FORMAT) : undefined,
      appraisalDate: performanceReview.appraisalDate ? performanceReview.appraisalDate.format(DATE_TIME_FORMAT) : undefined,
      reviewDate: performanceReview.reviewDate ? performanceReview.reviewDate.format(DATE_TIME_FORMAT) : undefined,
      lastModified: performanceReview.lastModified ? performanceReview.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
