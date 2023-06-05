import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {
  AppraisalEvaluationParameterFormService,
  AppraisalEvaluationParameterFormGroup,
} from './appraisal-evaluation-parameter-form.service';
import { IAppraisalEvaluationParameter } from '../appraisal-evaluation-parameter.model';
import { AppraisalEvaluationParameterService } from '../service/appraisal-evaluation-parameter.service';

@Component({
  selector: 'jhi-appraisal-evaluation-parameter-update',
  templateUrl: './appraisal-evaluation-parameter-update.component.html',
})
export class AppraisalEvaluationParameterUpdateComponent implements OnInit {
  isSaving = false;
  appraisalEvaluationParameter: IAppraisalEvaluationParameter | null = null;

  editForm: AppraisalEvaluationParameterFormGroup =
    this.appraisalEvaluationParameterFormService.createAppraisalEvaluationParameterFormGroup();

  constructor(
    protected appraisalEvaluationParameterService: AppraisalEvaluationParameterService,
    protected appraisalEvaluationParameterFormService: AppraisalEvaluationParameterFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appraisalEvaluationParameter }) => {
      this.appraisalEvaluationParameter = appraisalEvaluationParameter;
      if (appraisalEvaluationParameter) {
        this.updateForm(appraisalEvaluationParameter);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const appraisalEvaluationParameter = this.appraisalEvaluationParameterFormService.getAppraisalEvaluationParameter(this.editForm);
    if (appraisalEvaluationParameter.id !== null) {
      this.subscribeToSaveResponse(this.appraisalEvaluationParameterService.update(appraisalEvaluationParameter));
    } else {
      this.subscribeToSaveResponse(this.appraisalEvaluationParameterService.create(appraisalEvaluationParameter));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppraisalEvaluationParameter>>): void {
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

  protected updateForm(appraisalEvaluationParameter: IAppraisalEvaluationParameter): void {
    this.appraisalEvaluationParameter = appraisalEvaluationParameter;
    this.appraisalEvaluationParameterFormService.resetForm(this.editForm, appraisalEvaluationParameter);
  }
}
