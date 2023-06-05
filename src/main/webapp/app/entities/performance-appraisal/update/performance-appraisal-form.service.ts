import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPerformanceAppraisal, NewPerformanceAppraisal } from '../performance-appraisal.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPerformanceAppraisal for edit and NewPerformanceAppraisalFormGroupInput for create.
 */
type PerformanceAppraisalFormGroupInput = IPerformanceAppraisal | PartialWithRequiredKeyOf<NewPerformanceAppraisal>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPerformanceAppraisal | NewPerformanceAppraisal> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type PerformanceAppraisalFormRawValue = FormValueOf<IPerformanceAppraisal>;

type NewPerformanceAppraisalFormRawValue = FormValueOf<NewPerformanceAppraisal>;

type PerformanceAppraisalFormDefaults = Pick<NewPerformanceAppraisal, 'id' | 'lastModified'>;

type PerformanceAppraisalFormGroupContent = {
  id: FormControl<PerformanceAppraisalFormRawValue['id'] | NewPerformanceAppraisal['id']>;
  employeeId: FormControl<PerformanceAppraisalFormRawValue['employeeId']>;
  status: FormControl<PerformanceAppraisalFormRawValue['status']>;
  companyId: FormControl<PerformanceAppraisalFormRawValue['companyId']>;
  lastModified: FormControl<PerformanceAppraisalFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<PerformanceAppraisalFormRawValue['lastModifiedBy']>;
  appraisalReview: FormControl<PerformanceAppraisalFormRawValue['appraisalReview']>;
};

export type PerformanceAppraisalFormGroup = FormGroup<PerformanceAppraisalFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PerformanceAppraisalFormService {
  createPerformanceAppraisalFormGroup(
    performanceAppraisal: PerformanceAppraisalFormGroupInput = { id: null }
  ): PerformanceAppraisalFormGroup {
    const performanceAppraisalRawValue = this.convertPerformanceAppraisalToPerformanceAppraisalRawValue({
      ...this.getFormDefaults(),
      ...performanceAppraisal,
    });
    return new FormGroup<PerformanceAppraisalFormGroupContent>({
      id: new FormControl(
        { value: performanceAppraisalRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      employeeId: new FormControl(performanceAppraisalRawValue.employeeId),
      status: new FormControl(performanceAppraisalRawValue.status),
      companyId: new FormControl(performanceAppraisalRawValue.companyId),
      lastModified: new FormControl(performanceAppraisalRawValue.lastModified),
      lastModifiedBy: new FormControl(performanceAppraisalRawValue.lastModifiedBy),
      appraisalReview: new FormControl(performanceAppraisalRawValue.appraisalReview),
    });
  }

  getPerformanceAppraisal(form: PerformanceAppraisalFormGroup): IPerformanceAppraisal | NewPerformanceAppraisal {
    return this.convertPerformanceAppraisalRawValueToPerformanceAppraisal(
      form.getRawValue() as PerformanceAppraisalFormRawValue | NewPerformanceAppraisalFormRawValue
    );
  }

  resetForm(form: PerformanceAppraisalFormGroup, performanceAppraisal: PerformanceAppraisalFormGroupInput): void {
    const performanceAppraisalRawValue = this.convertPerformanceAppraisalToPerformanceAppraisalRawValue({
      ...this.getFormDefaults(),
      ...performanceAppraisal,
    });
    form.reset(
      {
        ...performanceAppraisalRawValue,
        id: { value: performanceAppraisalRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PerformanceAppraisalFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertPerformanceAppraisalRawValueToPerformanceAppraisal(
    rawPerformanceAppraisal: PerformanceAppraisalFormRawValue | NewPerformanceAppraisalFormRawValue
  ): IPerformanceAppraisal | NewPerformanceAppraisal {
    return {
      ...rawPerformanceAppraisal,
      lastModified: dayjs(rawPerformanceAppraisal.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertPerformanceAppraisalToPerformanceAppraisalRawValue(
    performanceAppraisal: IPerformanceAppraisal | (Partial<NewPerformanceAppraisal> & PerformanceAppraisalFormDefaults)
  ): PerformanceAppraisalFormRawValue | PartialWithRequiredKeyOf<NewPerformanceAppraisalFormRawValue> {
    return {
      ...performanceAppraisal,
      lastModified: performanceAppraisal.lastModified ? performanceAppraisal.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
