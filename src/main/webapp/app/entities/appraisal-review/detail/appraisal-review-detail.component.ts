import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAppraisalReview } from '../appraisal-review.model';

@Component({
  selector: 'jhi-appraisal-review-detail',
  templateUrl: './appraisal-review-detail.component.html',
})
export class AppraisalReviewDetailComponent implements OnInit {
  appraisalReview: IAppraisalReview | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appraisalReview }) => {
      this.appraisalReview = appraisalReview;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
