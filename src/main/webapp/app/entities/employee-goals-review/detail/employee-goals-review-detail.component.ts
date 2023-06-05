import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeeGoalsReview } from '../employee-goals-review.model';

@Component({
  selector: 'jhi-employee-goals-review-detail',
  templateUrl: './employee-goals-review-detail.component.html',
})
export class EmployeeGoalsReviewDetailComponent implements OnInit {
  employeeGoalsReview: IEmployeeGoalsReview | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employeeGoalsReview }) => {
      this.employeeGoalsReview = employeeGoalsReview;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
