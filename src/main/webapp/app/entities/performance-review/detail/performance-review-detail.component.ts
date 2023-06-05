import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPerformanceReview } from '../performance-review.model';

@Component({
  selector: 'jhi-performance-review-detail',
  templateUrl: './performance-review-detail.component.html',
})
export class PerformanceReviewDetailComponent implements OnInit {
  performanceReview: IPerformanceReview | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ performanceReview }) => {
      this.performanceReview = performanceReview;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
