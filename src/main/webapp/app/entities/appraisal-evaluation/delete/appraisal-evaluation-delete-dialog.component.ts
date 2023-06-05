import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppraisalEvaluation } from '../appraisal-evaluation.model';
import { AppraisalEvaluationService } from '../service/appraisal-evaluation.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './appraisal-evaluation-delete-dialog.component.html',
})
export class AppraisalEvaluationDeleteDialogComponent {
  appraisalEvaluation?: IAppraisalEvaluation;

  constructor(protected appraisalEvaluationService: AppraisalEvaluationService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.appraisalEvaluationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
