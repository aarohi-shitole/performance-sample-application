import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAppraisalCommentsReview, NewAppraisalCommentsReview } from '../appraisal-comments-review.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAppraisalCommentsReview for edit and NewAppraisalCommentsReviewFormGroupInput for create.
 */
type AppraisalCommentsReviewFormGroupInput = IAppraisalCommentsReview | PartialWithRequiredKeyOf<NewAppraisalCommentsReview>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAppraisalCommentsReview | NewAppraisalCommentsReview> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type AppraisalCommentsReviewFormRawValue = FormValueOf<IAppraisalCommentsReview>;

type NewAppraisalCommentsReviewFormRawValue = FormValueOf<NewAppraisalCommentsReview>;

type AppraisalCommentsReviewFormDefaults = Pick<NewAppraisalCommentsReview, 'id' | 'lastModified'>;

type AppraisalCommentsReviewFormGroupContent = {
  id: FormControl<AppraisalCommentsReviewFormRawValue['id'] | NewAppraisalCommentsReview['id']>;
  comment: FormControl<AppraisalCommentsReviewFormRawValue['comment']>;
  commentType: FormControl<AppraisalCommentsReviewFormRawValue['commentType']>;
  appraisalReviewId: FormControl<AppraisalCommentsReviewFormRawValue['appraisalReviewId']>;
  refFormName: FormControl<AppraisalCommentsReviewFormRawValue['refFormName']>;
  status: FormControl<AppraisalCommentsReviewFormRawValue['status']>;
  companyId: FormControl<AppraisalCommentsReviewFormRawValue['companyId']>;
  lastModified: FormControl<AppraisalCommentsReviewFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<AppraisalCommentsReviewFormRawValue['lastModifiedBy']>;
  employee: FormControl<AppraisalCommentsReviewFormRawValue['employee']>;
};

export type AppraisalCommentsReviewFormGroup = FormGroup<AppraisalCommentsReviewFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AppraisalCommentsReviewFormService {
  createAppraisalCommentsReviewFormGroup(
    appraisalCommentsReview: AppraisalCommentsReviewFormGroupInput = { id: null }
  ): AppraisalCommentsReviewFormGroup {
    const appraisalCommentsReviewRawValue = this.convertAppraisalCommentsReviewToAppraisalCommentsReviewRawValue({
      ...this.getFormDefaults(),
      ...appraisalCommentsReview,
    });
    return new FormGroup<AppraisalCommentsReviewFormGroupContent>({
      id: new FormControl(
        { value: appraisalCommentsReviewRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      comment: new FormControl(appraisalCommentsReviewRawValue.comment),
      commentType: new FormControl(appraisalCommentsReviewRawValue.commentType),
      appraisalReviewId: new FormControl(appraisalCommentsReviewRawValue.appraisalReviewId),
      refFormName: new FormControl(appraisalCommentsReviewRawValue.refFormName),
      status: new FormControl(appraisalCommentsReviewRawValue.status),
      companyId: new FormControl(appraisalCommentsReviewRawValue.companyId),
      lastModified: new FormControl(appraisalCommentsReviewRawValue.lastModified),
      lastModifiedBy: new FormControl(appraisalCommentsReviewRawValue.lastModifiedBy),
      employee: new FormControl(appraisalCommentsReviewRawValue.employee),
    });
  }

  getAppraisalCommentsReview(form: AppraisalCommentsReviewFormGroup): IAppraisalCommentsReview | NewAppraisalCommentsReview {
    return this.convertAppraisalCommentsReviewRawValueToAppraisalCommentsReview(
      form.getRawValue() as AppraisalCommentsReviewFormRawValue | NewAppraisalCommentsReviewFormRawValue
    );
  }

  resetForm(form: AppraisalCommentsReviewFormGroup, appraisalCommentsReview: AppraisalCommentsReviewFormGroupInput): void {
    const appraisalCommentsReviewRawValue = this.convertAppraisalCommentsReviewToAppraisalCommentsReviewRawValue({
      ...this.getFormDefaults(),
      ...appraisalCommentsReview,
    });
    form.reset(
      {
        ...appraisalCommentsReviewRawValue,
        id: { value: appraisalCommentsReviewRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AppraisalCommentsReviewFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertAppraisalCommentsReviewRawValueToAppraisalCommentsReview(
    rawAppraisalCommentsReview: AppraisalCommentsReviewFormRawValue | NewAppraisalCommentsReviewFormRawValue
  ): IAppraisalCommentsReview | NewAppraisalCommentsReview {
    return {
      ...rawAppraisalCommentsReview,
      lastModified: dayjs(rawAppraisalCommentsReview.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertAppraisalCommentsReviewToAppraisalCommentsReviewRawValue(
    appraisalCommentsReview: IAppraisalCommentsReview | (Partial<NewAppraisalCommentsReview> & AppraisalCommentsReviewFormDefaults)
  ): AppraisalCommentsReviewFormRawValue | PartialWithRequiredKeyOf<NewAppraisalCommentsReviewFormRawValue> {
    return {
      ...appraisalCommentsReview,
      lastModified: appraisalCommentsReview.lastModified ? appraisalCommentsReview.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
