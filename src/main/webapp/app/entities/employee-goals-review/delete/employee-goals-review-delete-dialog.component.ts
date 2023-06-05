import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmployeeGoalsReview } from '../employee-goals-review.model';
import { EmployeeGoalsReviewService } from '../service/employee-goals-review.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './employee-goals-review-delete-dialog.component.html',
})
export class EmployeeGoalsReviewDeleteDialogComponent {
  employeeGoalsReview?: IEmployeeGoalsReview;

  constructor(protected employeeGoalsReviewService: EmployeeGoalsReviewService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.employeeGoalsReviewService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
