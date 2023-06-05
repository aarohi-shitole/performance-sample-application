import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPerformanceIndicator, NewPerformanceIndicator } from '../performance-indicator.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPerformanceIndicator for edit and NewPerformanceIndicatorFormGroupInput for create.
 */
type PerformanceIndicatorFormGroupInput = IPerformanceIndicator | PartialWithRequiredKeyOf<NewPerformanceIndicator>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPerformanceIndicator | NewPerformanceIndicator> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type PerformanceIndicatorFormRawValue = FormValueOf<IPerformanceIndicator>;

type NewPerformanceIndicatorFormRawValue = FormValueOf<NewPerformanceIndicator>;

type PerformanceIndicatorFormDefaults = Pick<NewPerformanceIndicator, 'id' | 'lastModified'>;

type PerformanceIndicatorFormGroupContent = {
  id: FormControl<PerformanceIndicatorFormRawValue['id'] | NewPerformanceIndicator['id']>;
  designationId: FormControl<PerformanceIndicatorFormRawValue['designationId']>;
  indicatorValue: FormControl<PerformanceIndicatorFormRawValue['indicatorValue']>;
  status: FormControl<PerformanceIndicatorFormRawValue['status']>;
  companyId: FormControl<PerformanceIndicatorFormRawValue['companyId']>;
  lastModified: FormControl<PerformanceIndicatorFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<PerformanceIndicatorFormRawValue['lastModifiedBy']>;
  masterPerformanceIndicator: FormControl<PerformanceIndicatorFormRawValue['masterPerformanceIndicator']>;
};

export type PerformanceIndicatorFormGroup = FormGroup<PerformanceIndicatorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PerformanceIndicatorFormService {
  createPerformanceIndicatorFormGroup(
    performanceIndicator: PerformanceIndicatorFormGroupInput = { id: null }
  ): PerformanceIndicatorFormGroup {
    const performanceIndicatorRawValue = this.convertPerformanceIndicatorToPerformanceIndicatorRawValue({
      ...this.getFormDefaults(),
      ...performanceIndicator,
    });
    return new FormGroup<PerformanceIndicatorFormGroupContent>({
      id: new FormControl(
        { value: performanceIndicatorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      designationId: new FormControl(performanceIndicatorRawValue.designationId),
      indicatorValue: new FormControl(performanceIndicatorRawValue.indicatorValue),
      status: new FormControl(performanceIndicatorRawValue.status),
      companyId: new FormControl(performanceIndicatorRawValue.companyId),
      lastModified: new FormControl(performanceIndicatorRawValue.lastModified),
      lastModifiedBy: new FormControl(performanceIndicatorRawValue.lastModifiedBy),
      masterPerformanceIndicator: new FormControl(performanceIndicatorRawValue.masterPerformanceIndicator),
    });
  }

  getPerformanceIndicator(form: PerformanceIndicatorFormGroup): IPerformanceIndicator | NewPerformanceIndicator {
    return this.convertPerformanceIndicatorRawValueToPerformanceIndicator(
      form.getRawValue() as PerformanceIndicatorFormRawValue | NewPerformanceIndicatorFormRawValue
    );
  }

  resetForm(form: PerformanceIndicatorFormGroup, performanceIndicator: PerformanceIndicatorFormGroupInput): void {
    const performanceIndicatorRawValue = this.convertPerformanceIndicatorToPerformanceIndicatorRawValue({
      ...this.getFormDefaults(),
      ...performanceIndicator,
    });
    form.reset(
      {
        ...performanceIndicatorRawValue,
        id: { value: performanceIndicatorRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PerformanceIndicatorFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertPerformanceIndicatorRawValueToPerformanceIndicator(
    rawPerformanceIndicator: PerformanceIndicatorFormRawValue | NewPerformanceIndicatorFormRawValue
  ): IPerformanceIndicator | NewPerformanceIndicator {
    return {
      ...rawPerformanceIndicator,
      lastModified: dayjs(rawPerformanceIndicator.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertPerformanceIndicatorToPerformanceIndicatorRawValue(
    performanceIndicator: IPerformanceIndicator | (Partial<NewPerformanceIndicator> & PerformanceIndicatorFormDefaults)
  ): PerformanceIndicatorFormRawValue | PartialWithRequiredKeyOf<NewPerformanceIndicatorFormRawValue> {
    return {
      ...performanceIndicator,
      lastModified: performanceIndicator.lastModified ? performanceIndicator.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
