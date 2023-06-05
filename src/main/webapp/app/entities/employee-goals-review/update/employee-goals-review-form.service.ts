import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IEmployeeGoalsReview, NewEmployeeGoalsReview } from '../employee-goals-review.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEmployeeGoalsReview for edit and NewEmployeeGoalsReviewFormGroupInput for create.
 */
type EmployeeGoalsReviewFormGroupInput = IEmployeeGoalsReview | PartialWithRequiredKeyOf<NewEmployeeGoalsReview>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IEmployeeGoalsReview | NewEmployeeGoalsReview> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type EmployeeGoalsReviewFormRawValue = FormValueOf<IEmployeeGoalsReview>;

type NewEmployeeGoalsReviewFormRawValue = FormValueOf<NewEmployeeGoalsReview>;

type EmployeeGoalsReviewFormDefaults = Pick<NewEmployeeGoalsReview, 'id' | 'lastModified'>;

type EmployeeGoalsReviewFormGroupContent = {
  id: FormControl<EmployeeGoalsReviewFormRawValue['id'] | NewEmployeeGoalsReview['id']>;
  goalDescription: FormControl<EmployeeGoalsReviewFormRawValue['goalDescription']>;
  goalCategory: FormControl<EmployeeGoalsReviewFormRawValue['goalCategory']>;
  goaltype: FormControl<EmployeeGoalsReviewFormRawValue['goaltype']>;
  goalSetBy: FormControl<EmployeeGoalsReviewFormRawValue['goalSetBy']>;
  employeeId: FormControl<EmployeeGoalsReviewFormRawValue['employeeId']>;
  appraisalReviewId: FormControl<EmployeeGoalsReviewFormRawValue['appraisalReviewId']>;
  status: FormControl<EmployeeGoalsReviewFormRawValue['status']>;
  companyId: FormControl<EmployeeGoalsReviewFormRawValue['companyId']>;
  lastModified: FormControl<EmployeeGoalsReviewFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<EmployeeGoalsReviewFormRawValue['lastModifiedBy']>;
};

export type EmployeeGoalsReviewFormGroup = FormGroup<EmployeeGoalsReviewFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EmployeeGoalsReviewFormService {
  createEmployeeGoalsReviewFormGroup(employeeGoalsReview: EmployeeGoalsReviewFormGroupInput = { id: null }): EmployeeGoalsReviewFormGroup {
    const employeeGoalsReviewRawValue = this.convertEmployeeGoalsReviewToEmployeeGoalsReviewRawValue({
      ...this.getFormDefaults(),
      ...employeeGoalsReview,
    });
    return new FormGroup<EmployeeGoalsReviewFormGroupContent>({
      id: new FormControl(
        { value: employeeGoalsReviewRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      goalDescription: new FormControl(employeeGoalsReviewRawValue.goalDescription),
      goalCategory: new FormControl(employeeGoalsReviewRawValue.goalCategory),
      goaltype: new FormControl(employeeGoalsReviewRawValue.goaltype),
      goalSetBy: new FormControl(employeeGoalsReviewRawValue.goalSetBy),
      employeeId: new FormControl(employeeGoalsReviewRawValue.employeeId),
      appraisalReviewId: new FormControl(employeeGoalsReviewRawValue.appraisalReviewId),
      status: new FormControl(employeeGoalsReviewRawValue.status),
      companyId: new FormControl(employeeGoalsReviewRawValue.companyId),
      lastModified: new FormControl(employeeGoalsReviewRawValue.lastModified),
      lastModifiedBy: new FormControl(employeeGoalsReviewRawValue.lastModifiedBy),
    });
  }

  getEmployeeGoalsReview(form: EmployeeGoalsReviewFormGroup): IEmployeeGoalsReview | NewEmployeeGoalsReview {
    return this.convertEmployeeGoalsReviewRawValueToEmployeeGoalsReview(
      form.getRawValue() as EmployeeGoalsReviewFormRawValue | NewEmployeeGoalsReviewFormRawValue
    );
  }

  resetForm(form: EmployeeGoalsReviewFormGroup, employeeGoalsReview: EmployeeGoalsReviewFormGroupInput): void {
    const employeeGoalsReviewRawValue = this.convertEmployeeGoalsReviewToEmployeeGoalsReviewRawValue({
      ...this.getFormDefaults(),
      ...employeeGoalsReview,
    });
    form.reset(
      {
        ...employeeGoalsReviewRawValue,
        id: { value: employeeGoalsReviewRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EmployeeGoalsReviewFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertEmployeeGoalsReviewRawValueToEmployeeGoalsReview(
    rawEmployeeGoalsReview: EmployeeGoalsReviewFormRawValue | NewEmployeeGoalsReviewFormRawValue
  ): IEmployeeGoalsReview | NewEmployeeGoalsReview {
    return {
      ...rawEmployeeGoalsReview,
      lastModified: dayjs(rawEmployeeGoalsReview.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertEmployeeGoalsReviewToEmployeeGoalsReviewRawValue(
    employeeGoalsReview: IEmployeeGoalsReview | (Partial<NewEmployeeGoalsReview> & EmployeeGoalsReviewFormDefaults)
  ): EmployeeGoalsReviewFormRawValue | PartialWithRequiredKeyOf<NewEmployeeGoalsReviewFormRawValue> {
    return {
      ...employeeGoalsReview,
      lastModified: employeeGoalsReview.lastModified ? employeeGoalsReview.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
