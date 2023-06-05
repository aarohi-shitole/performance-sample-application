import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PerformanceIndicatorFormService, PerformanceIndicatorFormGroup } from './performance-indicator-form.service';
import { IPerformanceIndicator } from '../performance-indicator.model';
import { PerformanceIndicatorService } from '../service/performance-indicator.service';
import { IMasterPerformanceIndicator } from 'app/entities/master-performance-indicator/master-performance-indicator.model';
import { MasterPerformanceIndicatorService } from 'app/entities/master-performance-indicator/service/master-performance-indicator.service';

@Component({
  selector: 'jhi-performance-indicator-update',
  templateUrl: './performance-indicator-update.component.html',
})
export class PerformanceIndicatorUpdateComponent implements OnInit {
  isSaving = false;
  performanceIndicator: IPerformanceIndicator | null = null;

  masterPerformanceIndicatorsSharedCollection: IMasterPerformanceIndicator[] = [];

  editForm: PerformanceIndicatorFormGroup = this.performanceIndicatorFormService.createPerformanceIndicatorFormGroup();

  constructor(
    protected performanceIndicatorService: PerformanceIndicatorService,
    protected performanceIndicatorFormService: PerformanceIndicatorFormService,
    protected masterPerformanceIndicatorService: MasterPerformanceIndicatorService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareMasterPerformanceIndicator = (o1: IMasterPerformanceIndicator | null, o2: IMasterPerformanceIndicator | null): boolean =>
    this.masterPerformanceIndicatorService.compareMasterPerformanceIndicator(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ performanceIndicator }) => {
      this.performanceIndicator = performanceIndicator;
      if (performanceIndicator) {
        this.updateForm(performanceIndicator);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const performanceIndicator = this.performanceIndicatorFormService.getPerformanceIndicator(this.editForm);
    if (performanceIndicator.id !== null) {
      this.subscribeToSaveResponse(this.performanceIndicatorService.update(performanceIndicator));
    } else {
      this.subscribeToSaveResponse(this.performanceIndicatorService.create(performanceIndicator));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPerformanceIndicator>>): void {
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

  protected updateForm(performanceIndicator: IPerformanceIndicator): void {
    this.performanceIndicator = performanceIndicator;
    this.performanceIndicatorFormService.resetForm(this.editForm, performanceIndicator);

    this.masterPerformanceIndicatorsSharedCollection =
      this.masterPerformanceIndicatorService.addMasterPerformanceIndicatorToCollectionIfMissing<IMasterPerformanceIndicator>(
        this.masterPerformanceIndicatorsSharedCollection,
        performanceIndicator.masterPerformanceIndicator
      );
  }

  protected loadRelationshipsOptions(): void {
    this.masterPerformanceIndicatorService
      .query()
      .pipe(map((res: HttpResponse<IMasterPerformanceIndicator[]>) => res.body ?? []))
      .pipe(
        map((masterPerformanceIndicators: IMasterPerformanceIndicator[]) =>
          this.masterPerformanceIndicatorService.addMasterPerformanceIndicatorToCollectionIfMissing<IMasterPerformanceIndicator>(
            masterPerformanceIndicators,
            this.performanceIndicator?.masterPerformanceIndicator
          )
        )
      )
      .subscribe(
        (masterPerformanceIndicators: IMasterPerformanceIndicator[]) =>
          (this.masterPerformanceIndicatorsSharedCollection = masterPerformanceIndicators)
      );
  }
}
