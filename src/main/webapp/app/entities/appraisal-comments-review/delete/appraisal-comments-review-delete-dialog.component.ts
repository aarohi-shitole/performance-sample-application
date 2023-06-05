import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppraisalCommentsReview } from '../appraisal-comments-review.model';
import { AppraisalCommentsReviewService } from '../service/appraisal-comments-review.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './appraisal-comments-review-delete-dialog.component.html',
})
export class AppraisalCommentsReviewDeleteDialogComponent {
  appraisalCommentsReview?: IAppraisalCommentsReview;

  constructor(protected appraisalCommentsReviewService: AppraisalCommentsReviewService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.appraisalCommentsReviewService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
