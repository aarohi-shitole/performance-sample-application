import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMasterPerformanceIndicator } from '../master-performance-indicator.model';
import { MasterPerformanceIndicatorService } from '../service/master-performance-indicator.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './master-performance-indicator-delete-dialog.component.html',
})
export class MasterPerformanceIndicatorDeleteDialogComponent {
  masterPerformanceIndicator?: IMasterPerformanceIndicator;

  constructor(protected masterPerformanceIndicatorService: MasterPerformanceIndicatorService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.masterPerformanceIndicatorService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
