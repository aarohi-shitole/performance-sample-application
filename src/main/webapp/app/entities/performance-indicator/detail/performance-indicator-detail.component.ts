import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPerformanceIndicator } from '../performance-indicator.model';

@Component({
  selector: 'jhi-performance-indicator-detail',
  templateUrl: './performance-indicator-detail.component.html',
})
export class PerformanceIndicatorDetailComponent implements OnInit {
  performanceIndicator: IPerformanceIndicator | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ performanceIndicator }) => {
      this.performanceIndicator = performanceIndicator;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
