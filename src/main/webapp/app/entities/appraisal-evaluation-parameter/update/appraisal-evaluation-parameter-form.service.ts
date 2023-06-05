import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAppraisalEvaluationParameter, NewAppraisalEvaluationParameter } from '../appraisal-evaluation-parameter.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAppraisalEvaluationParameter for edit and NewAppraisalEvaluationParameterFormGroupInput for create.
 */
type AppraisalEvaluationParameterFormGroupInput = IAppraisalEvaluationParameter | PartialWithRequiredKeyOf<NewAppraisalEvaluationParameter>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAppraisalEvaluationParameter | NewAppraisalEvaluationParameter> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type AppraisalEvaluationParameterFormRawValue = FormValueOf<IAppraisalEvaluationParameter>;

type NewAppraisalEvaluationParameterFormRawValue = FormValueOf<NewAppraisalEvaluationParameter>;

type AppraisalEvaluationParameterFormDefaults = Pick<NewAppraisalEvaluationParameter, 'id' | 'lastModified'>;

type AppraisalEvaluationParameterFormGroupContent = {
  id: FormControl<AppraisalEvaluationParameterFormRawValue['id'] | NewAppraisalEvaluationParameter['id']>;
  name: FormControl<AppraisalEvaluationParameterFormRawValue['name']>;
  description: FormControl<AppraisalEvaluationParameterFormRawValue['description']>;
  type: FormControl<AppraisalEvaluationParameterFormRawValue['type']>;
  companyId: FormControl<AppraisalEvaluationParameterFormRawValue['companyId']>;
  status: FormControl<AppraisalEvaluationParameterFormRawValue['status']>;
  lastModified: FormControl<AppraisalEvaluationParameterFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<AppraisalEvaluationParameterFormRawValue['lastModifiedBy']>;
};

export type AppraisalEvaluationParameterFormGroup = FormGroup<AppraisalEvaluationParameterFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AppraisalEvaluationParameterFormService {
  createAppraisalEvaluationParameterFormGroup(
    appraisalEvaluationParameter: AppraisalEvaluationParameterFormGroupInput = { id: null }
  ): AppraisalEvaluationParameterFormGroup {
    const appraisalEvaluationParameterRawValue = this.convertAppraisalEvaluationParameterToAppraisalEvaluationParameterRawValue({
      ...this.getFormDefaults(),
      ...appraisalEvaluationParameter,
    });
    return new FormGroup<AppraisalEvaluationParameterFormGroupContent>({
      id: new FormControl(
        { value: appraisalEvaluationParameterRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(appraisalEvaluationParameterRawValue.name),
      description: new FormControl(appraisalEvaluationParameterRawValue.description),
      type: new FormControl(appraisalEvaluationParameterRawValue.type),
      companyId: new FormControl(appraisalEvaluationParameterRawValue.companyId),
      status: new FormControl(appraisalEvaluationParameterRawValue.status),
      lastModified: new FormControl(appraisalEvaluationParameterRawValue.lastModified),
      lastModifiedBy: new FormControl(appraisalEvaluationParameterRawValue.lastModifiedBy),
    });
  }

  getAppraisalEvaluationParameter(
    form: AppraisalEvaluationParameterFormGroup
  ): IAppraisalEvaluationParameter | NewAppraisalEvaluationParameter {
    return this.convertAppraisalEvaluationParameterRawValueToAppraisalEvaluationParameter(
      form.getRawValue() as AppraisalEvaluationParameterFormRawValue | NewAppraisalEvaluationParameterFormRawValue
    );
  }

  resetForm(form: AppraisalEvaluationParameterFormGroup, appraisalEvaluationParameter: AppraisalEvaluationParameterFormGroupInput): void {
    const appraisalEvaluationParameterRawValue = this.convertAppraisalEvaluationParameterToAppraisalEvaluationParameterRawValue({
      ...this.getFormDefaults(),
      ...appraisalEvaluationParameter,
    });
    form.reset(
      {
        ...appraisalEvaluationParameterRawValue,
        id: { value: appraisalEvaluationParameterRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AppraisalEvaluationParameterFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertAppraisalEvaluationParameterRawValueToAppraisalEvaluationParameter(
    rawAppraisalEvaluationParameter: AppraisalEvaluationParameterFormRawValue | NewAppraisalEvaluationParameterFormRawValue
  ): IAppraisalEvaluationParameter | NewAppraisalEvaluationParameter {
    return {
      ...rawAppraisalEvaluationParameter,
      lastModified: dayjs(rawAppraisalEvaluationParameter.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertAppraisalEvaluationParameterToAppraisalEvaluationParameterRawValue(
    appraisalEvaluationParameter:
      | IAppraisalEvaluationParameter
      | (Partial<NewAppraisalEvaluationParameter> & AppraisalEvaluationParameterFormDefaults)
  ): AppraisalEvaluationParameterFormRawValue | PartialWithRequiredKeyOf<NewAppraisalEvaluationParameterFormRawValue> {
    return {
      ...appraisalEvaluationParameter,
      lastModified: appraisalEvaluationParameter.lastModified
        ? appraisalEvaluationParameter.lastModified.format(DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
