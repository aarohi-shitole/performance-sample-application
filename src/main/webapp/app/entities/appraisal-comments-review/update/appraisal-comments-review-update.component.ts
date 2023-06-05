import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AppraisalCommentsReviewFormService, AppraisalCommentsReviewFormGroup } from './appraisal-comments-review-form.service';
import { IAppraisalCommentsReview } from '../appraisal-comments-review.model';
import { AppraisalCommentsReviewService } from '../service/appraisal-comments-review.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';

@Component({
  selector: 'jhi-appraisal-comments-review-update',
  templateUrl: './appraisal-comments-review-update.component.html',
})
export class AppraisalCommentsReviewUpdateComponent implements OnInit {
  isSaving = false;
  appraisalCommentsReview: IAppraisalCommentsReview | null = null;

  employeesSharedCollection: IEmployee[] = [];

  editForm: AppraisalCommentsReviewFormGroup = this.appraisalCommentsReviewFormService.createAppraisalCommentsReviewFormGroup();

  constructor(
    protected appraisalCommentsReviewService: AppraisalCommentsReviewService,
    protected appraisalCommentsReviewFormService: AppraisalCommentsReviewFormService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEmployee = (o1: IEmployee | null, o2: IEmployee | null): boolean => this.employeeService.compareEmployee(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appraisalCommentsReview }) => {
      this.appraisalCommentsReview = appraisalCommentsReview;
      if (appraisalCommentsReview) {
        this.updateForm(appraisalCommentsReview);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const appraisalCommentsReview = this.appraisalCommentsReviewFormService.getAppraisalCommentsReview(this.editForm);
    if (appraisalCommentsReview.id !== null) {
      this.subscribeToSaveResponse(this.appraisalCommentsReviewService.update(appraisalCommentsReview));
    } else {
      this.subscribeToSaveResponse(this.appraisalCommentsReviewService.create(appraisalCommentsReview));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppraisalCommentsReview>>): void {
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

  protected updateForm(appraisalCommentsReview: IAppraisalCommentsReview): void {
    this.appraisalCommentsReview = appraisalCommentsReview;
    this.appraisalCommentsReviewFormService.resetForm(this.editForm, appraisalCommentsReview);

    this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
      this.employeesSharedCollection,
      appraisalCommentsReview.employee
    );
  }

  protected loadRelationshipsOptions(): void {
    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(employees, this.appraisalCommentsReview?.employee)
        )
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));
  }
}
