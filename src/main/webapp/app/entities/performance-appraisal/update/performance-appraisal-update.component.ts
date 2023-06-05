import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PerformanceAppraisalFormService, PerformanceAppraisalFormGroup } from './performance-appraisal-form.service';
import { IPerformanceAppraisal } from '../performance-appraisal.model';
import { PerformanceAppraisalService } from '../service/performance-appraisal.service';
import { IAppraisalReview } from 'app/entities/appraisal-review/appraisal-review.model';
import { AppraisalReviewService } from 'app/entities/appraisal-review/service/appraisal-review.service';

@Component({
  selector: 'jhi-performance-appraisal-update',
  templateUrl: './performance-appraisal-update.component.html',
})
export class PerformanceAppraisalUpdateComponent implements OnInit {
  isSaving = false;
  performanceAppraisal: IPerformanceAppraisal | null = null;

  appraisalReviewsSharedCollection: IAppraisalReview[] = [];

  editForm: PerformanceAppraisalFormGroup = this.performanceAppraisalFormService.createPerformanceAppraisalFormGroup();

  constructor(
    protected performanceAppraisalService: PerformanceAppraisalService,
    protected performanceAppraisalFormService: PerformanceAppraisalFormService,
    protected appraisalReviewService: AppraisalReviewService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareAppraisalReview = (o1: IAppraisalReview | null, o2: IAppraisalReview | null): boolean =>
    this.appraisalReviewService.compareAppraisalReview(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ performanceAppraisal }) => {
      this.performanceAppraisal = performanceAppraisal;
      if (performanceAppraisal) {
        this.updateForm(performanceAppraisal);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const performanceAppraisal = this.performanceAppraisalFormService.getPerformanceAppraisal(this.editForm);
    if (performanceAppraisal.id !== null) {
      this.subscribeToSaveResponse(this.performanceAppraisalService.update(performanceAppraisal));
    } else {
      this.subscribeToSaveResponse(this.performanceAppraisalService.create(performanceAppraisal));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPerformanceAppraisal>>): void {
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

  protected updateForm(performanceAppraisal: IPerformanceAppraisal): void {
    this.performanceAppraisal = performanceAppraisal;
    this.performanceAppraisalFormService.resetForm(this.editForm, performanceAppraisal);

    this.appraisalReviewsSharedCollection = this.appraisalReviewService.addAppraisalReviewToCollectionIfMissing<IAppraisalReview>(
      this.appraisalReviewsSharedCollection,
      performanceAppraisal.appraisalReview
    );
  }

  protected loadRelationshipsOptions(): void {
    this.appraisalReviewService
      .query()
      .pipe(map((res: HttpResponse<IAppraisalReview[]>) => res.body ?? []))
      .pipe(
        map((appraisalReviews: IAppraisalReview[]) =>
          this.appraisalReviewService.addAppraisalReviewToCollectionIfMissing<IAppraisalReview>(
            appraisalReviews,
            this.performanceAppraisal?.appraisalReview
          )
        )
      )
      .subscribe((appraisalReviews: IAppraisalReview[]) => (this.appraisalReviewsSharedCollection = appraisalReviews));
  }
}
