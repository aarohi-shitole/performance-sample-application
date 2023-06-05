import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AppraisalEvaluationComponent } from './list/appraisal-evaluation.component';
import { AppraisalEvaluationDetailComponent } from './detail/appraisal-evaluation-detail.component';
import { AppraisalEvaluationUpdateComponent } from './update/appraisal-evaluation-update.component';
import { AppraisalEvaluationDeleteDialogComponent } from './delete/appraisal-evaluation-delete-dialog.component';
import { AppraisalEvaluationRoutingModule } from './route/appraisal-evaluation-routing.module';

@NgModule({
  imports: [SharedModule, AppraisalEvaluationRoutingModule],
  declarations: [
    AppraisalEvaluationComponent,
    AppraisalEvaluationDetailComponent,
    AppraisalEvaluationUpdateComponent,
    AppraisalEvaluationDeleteDialogComponent,
  ],
})
export class AppraisalEvaluationModule {}
