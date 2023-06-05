import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPerformanceIndicator } from '../performance-indicator.model';
import { PerformanceIndicatorService } from '../service/performance-indicator.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './performance-indicator-delete-dialog.component.html',
})
export class PerformanceIndicatorDeleteDialogComponent {
  performanceIndicator?: IPerformanceIndicator;

  constructor(protected performanceIndicatorService: PerformanceIndicatorService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.performanceIndicatorService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
