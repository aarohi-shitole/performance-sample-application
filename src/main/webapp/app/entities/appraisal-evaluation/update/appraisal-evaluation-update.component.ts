import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AppraisalEvaluationFormService, AppraisalEvaluationFormGroup } from './appraisal-evaluation-form.service';
import { IAppraisalEvaluation } from '../appraisal-evaluation.model';
import { AppraisalEvaluationService } from '../service/appraisal-evaluation.service';
import { IAppraisalEvaluationParameter } from 'app/entities/appraisal-evaluation-parameter/appraisal-evaluation-parameter.model';
import { AppraisalEvaluationParameterService } from 'app/entities/appraisal-evaluation-parameter/service/appraisal-evaluation-parameter.service';

@Component({
  selector: 'jhi-appraisal-evaluation-update',
  templateUrl: './appraisal-evaluation-update.component.html',
})
export class AppraisalEvaluationUpdateComponent implements OnInit {
  isSaving = false;
  appraisalEvaluation: IAppraisalEvaluation | null = null;

  appraisalEvaluationParametersSharedCollection: IAppraisalEvaluationParameter[] = [];

  editForm: AppraisalEvaluationFormGroup = this.appraisalEvaluationFormService.createAppraisalEvaluationFormGroup();

  constructor(
    protected appraisalEvaluationService: AppraisalEvaluationService,
    protected appraisalEvaluationFormService: AppraisalEvaluationFormService,
    protected appraisalEvaluationParameterService: AppraisalEvaluationParameterService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAppraisalEvaluationParameter = (o1: IAppraisalEvaluationParameter | null, o2: IAppraisalEvaluationParameter | null): boolean =>
    this.appraisalEvaluationParameterService.compareAppraisalEvaluationParameter(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appraisalEvaluation }) => {
      this.appraisalEvaluation = appraisalEvaluation;
      if (appraisalEvaluation) {
        this.updateForm(appraisalEvaluation);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const appraisalEvaluation = this.appraisalEvaluationFormService.getAppraisalEvaluation(this.editForm);
    if (appraisalEvaluation.id !== null) {
      this.subscribeToSaveResponse(this.appraisalEvaluationService.update(appraisalEvaluation));
    } else {
      this.subscribeToSaveResponse(this.appraisalEvaluationService.create(appraisalEvaluation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppraisalEvaluation>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(appraisalEvaluation: IAppraisalEvaluation): void {
    this.appraisalEvaluation = appraisalEvaluation;
    this.appraisalEvaluationFormService.resetForm(this.editForm, appraisalEvaluation);

    this.appraisalEvaluationParametersSharedCollection =
      this.appraisalEvaluationParameterService.addAppraisalEvaluationParameterToCollectionIfMissing<IAppraisalEvaluationParameter>(
        this.appraisalEvaluationParametersSharedCollection,
        appraisalEvaluation.appraisalEvaluationParameter
      );
  }

  protected loadRelationshipsOptions(): void {
    this.appraisalEvaluationParameterService
      .query()
      .pipe(map((res: HttpResponse<IAppraisalEvaluationParameter[]>) => res.body ?? []))
      .pipe(
        map((appraisalEvaluationParameters: IAppraisalEvaluationParameter[]) =>
          this.appraisalEvaluationParameterService.addAppraisalEvaluationParameterToCollectionIfMissing<IAppraisalEvaluationParameter>(
            appraisalEvaluationParameters,
            this.appraisalEvaluation?.appraisalEvaluationParameter
          )
        )
      )
      .subscribe(
        (appraisalEvaluationParameters: IAppraisalEvaluationParameter[]) =>
          (this.appraisalEvaluationParametersSharedCollection = appraisalEvaluationParameters)
      );
  }
}
