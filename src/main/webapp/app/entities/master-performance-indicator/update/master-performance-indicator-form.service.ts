import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IMasterPerformanceIndicator, NewMasterPerformanceIndicator } from '../master-performance-indicator.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMasterPerformanceIndicator for edit and NewMasterPerformanceIndicatorFormGroupInput for create.
 */
type MasterPerformanceIndicatorFormGroupInput = IMasterPerformanceIndicator | PartialWithRequiredKeyOf<NewMasterPerformanceIndicator>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IMasterPerformanceIndicator | NewMasterPerformanceIndicator> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type MasterPerformanceIndicatorFormRawValue = FormValueOf<IMasterPerformanceIndicator>;

type NewMasterPerformanceIndicatorFormRawValue = FormValueOf<NewMasterPerformanceIndicator>;

type MasterPerformanceIndicatorFormDefaults = Pick<NewMasterPerformanceIndicator, 'id' | 'lastModified'>;

type MasterPerformanceIndicatorFormGroupContent = {
  id: FormControl<MasterPerformanceIndicatorFormRawValue['id'] | NewMasterPerformanceIndicator['id']>;
  category: FormControl<MasterPerformanceIndicatorFormRawValue['category']>;
  type: FormControl<MasterPerformanceIndicatorFormRawValue['type']>;
  name: FormControl<MasterPerformanceIndicatorFormRawValue['name']>;
  description: FormControl<MasterPerformanceIndicatorFormRawValue['description']>;
  weightage: FormControl<MasterPerformanceIndicatorFormRawValue['weightage']>;
  status: FormControl<MasterPerformanceIndicatorFormRawValue['status']>;
  companyId: FormControl<MasterPerformanceIndicatorFormRawValue['companyId']>;
  lastModified: FormControl<MasterPerformanceIndicatorFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<MasterPerformanceIndicatorFormRawValue['lastModifiedBy']>;
};

export type MasterPerformanceIndicatorFormGroup = FormGroup<MasterPerformanceIndicatorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MasterPerformanceIndicatorFormService {
  createMasterPerformanceIndicatorFormGroup(
    masterPerformanceIndicator: MasterPerformanceIndicatorFormGroupInput = { id: null }
  ): MasterPerformanceIndicatorFormGroup {
    const masterPerformanceIndicatorRawValue = this.convertMasterPerformanceIndicatorToMasterPerformanceIndicatorRawValue({
      ...this.getFormDefaults(),
      ...masterPerformanceIndicator,
    });
    return new FormGroup<MasterPerformanceIndicatorFormGroupContent>({
      id: new FormControl(
        { value: masterPerformanceIndicatorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      category: new FormControl(masterPerformanceIndicatorRawValue.category),
      type: new FormControl(masterPerformanceIndicatorRawValue.type),
      name: new FormControl(masterPerformanceIndicatorRawValue.name),
      description: new FormControl(masterPerformanceIndicatorRawValue.description),
      weightage: new FormControl(masterPerformanceIndicatorRawValue.weightage),
      status: new FormControl(masterPerformanceIndicatorRawValue.status),
      companyId: new FormControl(masterPerformanceIndicatorRawValue.companyId),
      lastModified: new FormControl(masterPerformanceIndicatorRawValue.lastModified),
      lastModifiedBy: new FormControl(masterPerformanceIndicatorRawValue.lastModifiedBy),
    });
  }

  getMasterPerformanceIndicator(form: MasterPerformanceIndicatorFormGroup): IMasterPerformanceIndicator | NewMasterPerformanceIndicator {
    return this.convertMasterPerformanceIndicatorRawValueToMasterPerformanceIndicator(
      form.getRawValue() as MasterPerformanceIndicatorFormRawValue | NewMasterPerformanceIndicatorFormRawValue
    );
  }

  resetForm(form: MasterPerformanceIndicatorFormGroup, masterPerformanceIndicator: MasterPerformanceIndicatorFormGroupInput): void {
    const masterPerformanceIndicatorRawValue = this.convertMasterPerformanceIndicatorToMasterPerformanceIndicatorRawValue({
      ...this.getFormDefaults(),
      ...masterPerformanceIndicator,
    });
    form.reset(
      {
        ...masterPerformanceIndicatorRawValue,
        id: { value: masterPerformanceIndicatorRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MasterPerformanceIndicatorFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertMasterPerformanceIndicatorRawValueToMasterPerformanceIndicator(
    rawMasterPerformanceIndicator: MasterPerformanceIndicatorFormRawValue | NewMasterPerformanceIndicatorFormRawValue
  ): IMasterPerformanceIndicator | NewMasterPerformanceIndicator {
    return {
      ...rawMasterPerformanceIndicator,
      lastModified: dayjs(rawMasterPerformanceIndicator.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertMasterPerformanceIndicatorToMasterPerformanceIndicatorRawValue(
    masterPerformanceIndicator:
      | IMasterPerformanceIndicator
      | (Partial<NewMasterPerformanceIndicator> & MasterPerformanceIndicatorFormDefaults)
  ): MasterPerformanceIndicatorFormRawValue | PartialWithRequiredKeyOf<NewMasterPerformanceIndicatorFormRawValue> {
    return {
      ...masterPerformanceIndicator,
      lastModified: masterPerformanceIndicator.lastModified ? masterPerformanceIndicator.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
