import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EmployeeGoalsReviewFormService, EmployeeGoalsReviewFormGroup } from './employee-goals-review-form.service';
import { IEmployeeGoalsReview } from '../employee-goals-review.model';
import { EmployeeGoalsReviewService } from '../service/employee-goals-review.service';

@Component({
  selector: 'jhi-employee-goals-review-update',
  templateUrl: './employee-goals-review-update.component.html',
})
export class EmployeeGoalsReviewUpdateComponent implements OnInit {
  isSaving = false;
  employeeGoalsReview: IEmployeeGoalsReview | null = null;

  editForm: EmployeeGoalsReviewFormGroup = this.employeeGoalsReviewFormService.createEmployeeGoalsReviewFormGroup();

  constructor(
    protected employeeGoalsReviewService: EmployeeGoalsReviewService,
    protected employeeGoalsReviewFormService: EmployeeGoalsReviewFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employeeGoalsReview }) => {
      this.employeeGoalsReview = employeeGoalsReview;
      if (employeeGoalsReview) {
        this.updateForm(employeeGoalsReview);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employeeGoalsReview = this.employeeGoalsReviewFormService.getEmployeeGoalsReview(this.editForm);
    if (employeeGoalsReview.id !== null) {
      this.subscribeToSaveResponse(this.employeeGoalsReviewService.update(employeeGoalsReview));
    } else {
      this.subscribeToSaveResponse(this.employeeGoalsReviewService.create(employeeGoalsReview));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeGoalsReview>>): void {
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

  protected updateForm(employeeGoalsReview: IEmployeeGoalsReview): void {
    this.employeeGoalsReview = employeeGoalsReview;
    this.employeeGoalsReviewFormService.resetForm(this.editForm, employeeGoalsReview);
  }
}
