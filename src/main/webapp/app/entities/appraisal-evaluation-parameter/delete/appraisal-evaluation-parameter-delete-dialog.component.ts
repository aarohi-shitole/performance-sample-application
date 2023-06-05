import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppraisalEvaluationParameter } from '../appraisal-evaluation-parameter.model';
import { AppraisalEvaluationParameterService } from '../service/appraisal-evaluation-parameter.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './appraisal-evaluation-parameter-delete-dialog.component.html',
})
export class AppraisalEvaluationParameterDeleteDialogComponent {
  appraisalEvaluationParameter?: IAppraisalEvaluationParameter;

  constructor(protected appraisalEvaluationParameterService: AppraisalEvaluationParameterService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.appraisalEvaluationParameterService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
