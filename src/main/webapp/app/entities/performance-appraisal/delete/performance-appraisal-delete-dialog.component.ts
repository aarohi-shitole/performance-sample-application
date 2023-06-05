import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPerformanceAppraisal } from '../performance-appraisal.model';
import { PerformanceAppraisalService } from '../service/performance-appraisal.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './performance-appraisal-delete-dialog.component.html',
})
export class PerformanceAppraisalDeleteDialogComponent {
  performanceAppraisal?: IPerformanceAppraisal;

  constructor(protected performanceAppraisalService: PerformanceAppraisalService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.performanceAppraisalService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
