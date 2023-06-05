import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAppraisalEvaluationParameter } from '../appraisal-evaluation-parameter.model';

@Component({
  selector: 'jhi-appraisal-evaluation-parameter-detail',
  templateUrl: './appraisal-evaluation-parameter-detail.component.html',
})
export class AppraisalEvaluationParameterDetailComponent implements OnInit {
  appraisalEvaluationParameter: IAppraisalEvaluationParameter | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appraisalEvaluationParameter }) => {
      this.appraisalEvaluationParameter = appraisalEvaluationParameter;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
