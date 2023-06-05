import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPerformanceAppraisal } from '../performance-appraisal.model';

@Component({
  selector: 'jhi-performance-appraisal-detail',
  templateUrl: './performance-appraisal-detail.component.html',
})
export class PerformanceAppraisalDetailComponent implements OnInit {
  performanceAppraisal: IPerformanceAppraisal | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ performanceAppraisal }) => {
      this.performanceAppraisal = performanceAppraisal;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
