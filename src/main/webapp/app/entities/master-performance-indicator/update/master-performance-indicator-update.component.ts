import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { MasterPerformanceIndicatorFormService, MasterPerformanceIndicatorFormGroup } from './master-performance-indicator-form.service';
import { IMasterPerformanceIndicator } from '../master-performance-indicator.model';
import { MasterPerformanceIndicatorService } from '../service/master-performance-indicator.service';

@Component({
  selector: 'jhi-master-performance-indicator-update',
  templateUrl: './master-performance-indicator-update.component.html',
})
export class MasterPerformanceIndicatorUpdateComponent implements OnInit {
  isSaving = false;
  masterPerformanceIndicator: IMasterPerformanceIndicator | null = null;

  editForm: MasterPerformanceIndicatorFormGroup = this.masterPerformanceIndicatorFormService.createMasterPerformanceIndicatorFormGroup();

  constructor(
    protected masterPerformanceIndicatorService: MasterPerformanceIndicatorService,
    protected masterPerformanceIndicatorFormService: MasterPerformanceIndicatorFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ masterPerformanceIndicator }) => {
      this.masterPerformanceIndicator = masterPerformanceIndicator;
      if (masterPerformanceIndicator) {
        this.updateForm(masterPerformanceIndicator);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const masterPerformanceIndicator = this.masterPerformanceIndicatorFormService.getMasterPerformanceIndicator(this.editForm);
    if (masterPerformanceIndicator.id !== null) {
      this.subscribeToSaveResponse(this.masterPerformanceIndicatorService.update(masterPerformanceIndicator));
    } else {
      this.subscribeToSaveResponse(this.masterPerformanceIndicatorService.create(masterPerformanceIndicator));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMasterPerformanceIndicator>>): void {
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

  protected updateForm(masterPerformanceIndicator: IMasterPerformanceIndicator): void {
    this.masterPerformanceIndicator = masterPerformanceIndicator;
    this.masterPerformanceIndicatorFormService.resetForm(this.editForm, masterPerformanceIndicator);
  }
}
