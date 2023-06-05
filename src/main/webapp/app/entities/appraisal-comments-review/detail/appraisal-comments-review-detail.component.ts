import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAppraisalCommentsReview } from '../appraisal-comments-review.model';

@Component({
  selector: 'jhi-appraisal-comments-review-detail',
  templateUrl: './appraisal-comments-review-detail.component.html',
})
export class AppraisalCommentsReviewDetailComponent implements OnInit {
  appraisalCommentsReview: IAppraisalCommentsReview | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appraisalCommentsReview }) => {
      this.appraisalCommentsReview = appraisalCommentsReview;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
