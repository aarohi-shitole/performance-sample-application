import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PerformanceReviewFormService, PerformanceReviewFormGroup } from './performance-review-form.service';
import { IPerformanceReview } from '../performance-review.model';
import { PerformanceReviewService } from '../service/performance-review.service';
import { IPerformanceIndicator } from 'app/entities/performance-indicator/performance-indicator.model';
import { PerformanceIndicatorService } from 'app/entities/performance-indicator/service/performance-indicator.service';

@Component({
  selector: 'jhi-performance-review-update',
  templateUrl: './performance-review-update.component.html',
})
export class PerformanceReviewUpdateComponent implements OnInit {
  isSaving = false;
  performanceReview: IPerformanceReview | null = null;

  performanceIndicatorsSharedCollection: IPerformanceIndicator[] = [];

  editForm: PerformanceReviewFormGroup = this.performanceReviewFormService.createPerformanceReviewFormGroup();

  constructor(
    protected performanceReviewService: PerformanceReviewService,
    protected performanceReviewFormService: PerformanceReviewFormService,
    protected performanceIndicatorService: PerformanceIndicatorService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePerformanceIndicator = (o1: IPerformanceIndicator | null, o2: IPerformanceIndicator | null): boolean =>
    this.performanceIndicatorService.comparePerformanceIndicator(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ performanceReview }) => {
      this.performanceReview = performanceReview;
      if (performanceReview) {
        this.updateForm(performanceReview);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const performanceReview = this.performanceReviewFormService.getPerformanceReview(this.editForm);
    if (performanceReview.id !== null) {
      this.subscribeToSaveResponse(this.performanceReviewService.update(performanceReview));
    } else {
      this.subscribeToSaveResponse(this.performanceReviewService.create(performanceReview));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPerformanceReview>>): void {
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

  protected updateForm(performanceReview: IPerformanceReview): void {
    this.performanceReview = performanceReview;
    this.performanceReviewFormService.resetForm(this.editForm, performanceReview);

    this.performanceIndicatorsSharedCollection =
      this.performanceIndicatorService.addPerformanceIndicatorToCollectionIfMissing<IPerformanceIndicator>(
        this.performanceIndicatorsSharedCollection,
        performanceReview.performanceIndicator
      );
  }

  protected loadRelationshipsOptions(): void {
    this.performanceIndicatorService
      .query()
      .pipe(map((res: HttpResponse<IPerformanceIndicator[]>) => res.body ?? []))
      .pipe(
        map((performanceIndicators: IPerformanceIndicator[]) =>
          this.performanceIndicatorService.addPerformanceIndicatorToCollectionIfMissing<IPerformanceIndicator>(
            performanceIndicators,
            this.performanceReview?.performanceIndicator
          )
        )
      )
      .subscribe((performanceIndicators: IPerformanceIndicator[]) => (this.performanceIndicatorsSharedCollection = performanceIndicators));
  }
}
