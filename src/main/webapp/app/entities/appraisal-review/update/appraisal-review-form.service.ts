import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAppraisalReview, NewAppraisalReview } from '../appraisal-review.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAppraisalReview for edit and NewAppraisalReviewFormGroupInput for create.
 */
type AppraisalReviewFormGroupInput = IAppraisalReview | PartialWithRequiredKeyOf<NewAppraisalReview>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAppraisalReview | NewAppraisalReview> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type AppraisalReviewFormRawValue = FormValueOf<IAppraisalReview>;

type NewAppraisalReviewFormRawValue = FormValueOf<NewAppraisalReview>;

type AppraisalReviewFormDefaults = Pick<NewAppraisalReview, 'id' | 'lastModified'>;

type AppraisalReviewFormGroupContent = {
  id: FormControl<AppraisalReviewFormRawValue['id'] | NewAppraisalReview['id']>;
  reportingOfficer: FormControl<AppraisalReviewFormRawValue['reportingOfficer']>;
  roDesignation: FormControl<AppraisalReviewFormRawValue['roDesignation']>;
  status: FormControl<AppraisalReviewFormRawValue['status']>;
  companyId: FormControl<AppraisalReviewFormRawValue['companyId']>;
  lastModified: FormControl<AppraisalReviewFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<AppraisalReviewFormRawValue['lastModifiedBy']>;
  employee: FormControl<AppraisalReviewFormRawValue['employee']>;
};

export type AppraisalReviewFormGroup = FormGroup<AppraisalReviewFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AppraisalReviewFormService {
  createAppraisalReviewFormGroup(appraisalReview: AppraisalReviewFormGroupInput = { id: null }): AppraisalReviewFormGroup {
    const appraisalReviewRawValue = this.convertAppraisalReviewToAppraisalReviewRawValue({
      ...this.getFormDefaults(),
      ...appraisalReview,
    });
    return new FormGroup<AppraisalReviewFormGroupContent>({
      id: new FormControl(
        { value: appraisalReviewRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportingOfficer: new FormControl(appraisalReviewRawValue.reportingOfficer),
      roDesignation: new FormControl(appraisalReviewRawValue.roDesignation),
      status: new FormControl(appraisalReviewRawValue.status),
      companyId: new FormControl(appraisalReviewRawValue.companyId),
      lastModified: new FormControl(appraisalReviewRawValue.lastModified),
      lastModifiedBy: new FormControl(appraisalReviewRawValue.lastModifiedBy),
      employee: new FormControl(appraisalReviewRawValue.employee),
    });
  }

  getAppraisalReview(form: AppraisalReviewFormGroup): IAppraisalReview | NewAppraisalReview {
    return this.convertAppraisalReviewRawValueToAppraisalReview(
      form.getRawValue() as AppraisalReviewFormRawValue | NewAppraisalReviewFormRawValue
    );
  }

  resetForm(form: AppraisalReviewFormGroup, appraisalReview: AppraisalReviewFormGroupInput): void {
    const appraisalReviewRawValue = this.convertAppraisalReviewToAppraisalReviewRawValue({ ...this.getFormDefaults(), ...appraisalReview });
    form.reset(
      {
        ...appraisalReviewRawValue,
        id: { value: appraisalReviewRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AppraisalReviewFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertAppraisalReviewRawValueToAppraisalReview(
    rawAppraisalReview: AppraisalReviewFormRawValue | NewAppraisalReviewFormRawValue
  ): IAppraisalReview | NewAppraisalReview {
    return {
      ...rawAppraisalReview,
      lastModified: dayjs(rawAppraisalReview.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertAppraisalReviewToAppraisalReviewRawValue(
    appraisalReview: IAppraisalReview | (Partial<NewAppraisalReview> & AppraisalReviewFormDefaults)
  ): AppraisalReviewFormRawValue | PartialWithRequiredKeyOf<NewAppraisalReviewFormRawValue> {
    return {
      ...appraisalReview,
      lastModified: appraisalReview.lastModified ? appraisalReview.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
