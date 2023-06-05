import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPerformanceReview } from '../performance-review.model';
import { PerformanceReviewService } from '../service/performance-review.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './performance-review-delete-dialog.component.html',
})
export class PerformanceReviewDeleteDialogComponent {
  performanceReview?: IPerformanceReview;

  constructor(protected performanceReviewService: PerformanceReviewService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.performanceReviewService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
