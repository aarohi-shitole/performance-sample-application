import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAppraisalEvaluation } from '../appraisal-evaluation.model';

@Component({
  selector: 'jhi-appraisal-evaluation-detail',
  templateUrl: './appraisal-evaluation-detail.component.html',
})
export class AppraisalEvaluationDetailComponent implements OnInit {
  appraisalEvaluation: IAppraisalEvaluation | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appraisalEvaluation }) => {
      this.appraisalEvaluation = appraisalEvaluation;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
