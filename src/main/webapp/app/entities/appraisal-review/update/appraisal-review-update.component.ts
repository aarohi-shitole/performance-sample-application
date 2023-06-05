import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AppraisalReviewFormService, AppraisalReviewFormGroup } from './appraisal-review-form.service';
import { IAppraisalReview } from '../appraisal-review.model';
import { AppraisalReviewService } from '../service/appraisal-review.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';

@Component({
  selector: 'jhi-appraisal-review-update',
  templateUrl: './appraisal-review-update.component.html',
})
export class AppraisalReviewUpdateComponent implements OnInit {
  isSaving = false;
  appraisalReview: IAppraisalReview | null = null;

  employeesSharedCollection: IEmployee[] = [];

  editForm: AppraisalReviewFormGroup = this.appraisalReviewFormService.createAppraisalReviewFormGroup();

  constructor(
    protected appraisalReviewService: AppraisalReviewService,
    protected appraisalReviewFormService: AppraisalReviewFormService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEmployee = (o1: IEmployee | null, o2: IEmployee | null): boolean => this.employeeService.compareEmployee(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appraisalReview }) => {
      this.appraisalReview = appraisalReview;
      if (appraisalReview) {
        this.updateForm(appraisalReview);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const appraisalReview = this.appraisalReviewFormService.getAppraisalReview(this.editForm);
    if (appraisalReview.id !== null) {
      this.subscribeToSaveResponse(this.appraisalReviewService.update(appraisalReview));
    } else {
      this.subscribeToSaveResponse(this.appraisalReviewService.create(appraisalReview));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppraisalReview>>): void {
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

  protected updateForm(appraisalReview: IAppraisalReview): void {
    this.appraisalReview = appraisalReview;
    this.appraisalReviewFormService.resetForm(this.editForm, appraisalReview);

    this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
      this.employeesSharedCollection,
      appraisalReview.employee
    );
  }

  protected loadRelationshipsOptions(): void {
    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(employees, this.appraisalReview?.employee)
        )
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));
  }
}
