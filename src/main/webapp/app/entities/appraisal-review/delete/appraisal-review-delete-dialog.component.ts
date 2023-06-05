import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppraisalReview } from '../appraisal-review.model';
import { AppraisalReviewService } from '../service/appraisal-review.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './appraisal-review-delete-dialog.component.html',
})
export class AppraisalReviewDeleteDialogComponent {
  appraisalReview?: IAppraisalReview;

  constructor(protected appraisalReviewService: AppraisalReviewService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.appraisalReviewService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
