import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMasterPerformanceIndicator } from '../master-performance-indicator.model';

@Component({
  selector: 'jhi-master-performance-indicator-detail',
  templateUrl: './master-performance-indicator-detail.component.html',
})
export class MasterPerformanceIndicatorDetailComponent implements OnInit {
  masterPerformanceIndicator: IMasterPerformanceIndicator | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ masterPerformanceIndicator }) => {
      this.masterPerformanceIndicator = masterPerformanceIndicator;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
