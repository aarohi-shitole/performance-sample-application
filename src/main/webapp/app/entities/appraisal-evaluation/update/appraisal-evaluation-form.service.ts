import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAppraisalEvaluation, NewAppraisalEvaluation } from '../appraisal-evaluation.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAppraisalEvaluation for edit and NewAppraisalEvaluationFormGroupInput for create.
 */
type AppraisalEvaluationFormGroupInput = IAppraisalEvaluation | PartialWithRequiredKeyOf<NewAppraisalEvaluation>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAppraisalEvaluation | NewAppraisalEvaluation> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type AppraisalEvaluationFormRawValue = FormValueOf<IAppraisalEvaluation>;

type NewAppraisalEvaluationFormRawValue = FormValueOf<NewAppraisalEvaluation>;

type AppraisalEvaluationFormDefaults = Pick<NewAppraisalEvaluation, 'id' | 'answerFlag' | 'lastModified'>;

type AppraisalEvaluationFormGroupContent = {
  id: FormControl<AppraisalEvaluationFormRawValue['id'] | NewAppraisalEvaluation['id']>;
  answerFlag: FormControl<AppraisalEvaluationFormRawValue['answerFlag']>;
  description: FormControl<AppraisalEvaluationFormRawValue['description']>;
  employeeId: FormControl<AppraisalEvaluationFormRawValue['employeeId']>;
  appraisalReviewId: FormControl<AppraisalEvaluationFormRawValue['appraisalReviewId']>;
  availablePoints: FormControl<AppraisalEvaluationFormRawValue['availablePoints']>;
  scoredPoints: FormControl<AppraisalEvaluationFormRawValue['scoredPoints']>;
  remark: FormControl<AppraisalEvaluationFormRawValue['remark']>;
  status: FormControl<AppraisalEvaluationFormRawValue['status']>;
  companyId: FormControl<AppraisalEvaluationFormRawValue['companyId']>;
  lastModified: FormControl<AppraisalEvaluationFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<AppraisalEvaluationFormRawValue['lastModifiedBy']>;
  appraisalEvaluationParameter: FormControl<AppraisalEvaluationFormRawValue['appraisalEvaluationParameter']>;
};

export type AppraisalEvaluationFormGroup = FormGroup<AppraisalEvaluationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AppraisalEvaluationFormService {
  createAppraisalEvaluationFormGroup(appraisalEvaluation: AppraisalEvaluationFormGroupInput = { id: null }): AppraisalEvaluationFormGroup {
    const appraisalEvaluationRawValue = this.convertAppraisalEvaluationToAppraisalEvaluationRawValue({
      ...this.getFormDefaults(),
      ...appraisalEvaluation,
    });
    return new FormGroup<AppraisalEvaluationFormGroupContent>({
      id: new FormControl(
        { value: appraisalEvaluationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      answerFlag: new FormControl(appraisalEvaluationRawValue.answerFlag),
      description: new FormControl(appraisalEvaluationRawValue.description),
      employeeId: new FormControl(appraisalEvaluationRawValue.employeeId),
      appraisalReviewId: new FormControl(appraisalEvaluationRawValue.appraisalReviewId),
      availablePoints: new FormControl(appraisalEvaluationRawValue.availablePoints),
      scoredPoints: new FormControl(appraisalEvaluationRawValue.scoredPoints),
      remark: new FormControl(appraisalEvaluationRawValue.remark),
      status: new FormControl(appraisalEvaluationRawValue.status),
      companyId: new FormControl(appraisalEvaluationRawValue.companyId),
      lastModified: new FormControl(appraisalEvaluationRawValue.lastModified),
      lastModifiedBy: new FormControl(appraisalEvaluationRawValue.lastModifiedBy),
      appraisalEvaluationParameter: new FormControl(appraisalEvaluationRawValue.appraisalEvaluationParameter),
    });
  }

  getAppraisalEvaluation(form: AppraisalEvaluationFormGroup): IAppraisalEvaluation | NewAppraisalEvaluation {
    return this.convertAppraisalEvaluationRawValueToAppraisalEvaluation(
      form.getRawValue() as AppraisalEvaluationFormRawValue | NewAppraisalEvaluationFormRawValue
    );
  }

  resetForm(form: AppraisalEvaluationFormGroup, appraisalEvaluation: AppraisalEvaluationFormGroupInput): void {
    const appraisalEvaluationRawValue = this.convertAppraisalEvaluationToAppraisalEvaluationRawValue({
      ...this.getFormDefaults(),
      ...appraisalEvaluation,
    });
    form.reset(
      {
        ...appraisalEvaluationRawValue,
        id: { value: appraisalEvaluationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AppraisalEvaluationFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      answerFlag: false,
      lastModified: currentTime,
    };
  }

  private convertAppraisalEvaluationRawValueToAppraisalEvaluation(
    rawAppraisalEvaluation: AppraisalEvaluationFormRawValue | NewAppraisalEvaluationFormRawValue
  ): IAppraisalEvaluation | NewAppraisalEvaluation {
    return {
      ...rawAppraisalEvaluation,
      lastModified: dayjs(rawAppraisalEvaluation.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertAppraisalEvaluationToAppraisalEvaluationRawValue(
    appraisalEvaluation: IAppraisalEvaluation | (Partial<NewAppraisalEvaluation> & AppraisalEvaluationFormDefaults)
  ): AppraisalEvaluationFormRawValue | PartialWithRequiredKeyOf<NewAppraisalEvaluationFormRawValue> {
    return {
      ...appraisalEvaluation,
      lastModified: appraisalEvaluation.lastModified ? appraisalEvaluation.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
