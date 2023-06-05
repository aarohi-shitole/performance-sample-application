import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AppraisalEvaluationParameterComponent } from './list/appraisal-evaluation-parameter.component';
import { AppraisalEvaluationParameterDetailComponent } from './detail/appraisal-evaluation-parameter-detail.component';
import { AppraisalEvaluationParameterUpdateComponent } from './update/appraisal-evaluation-parameter-update.component';
import { AppraisalEvaluationParameterDeleteDialogComponent } from './delete/appraisal-evaluation-parameter-delete-dialog.component';
import { AppraisalEvaluationParameterRoutingModule } from './route/appraisal-evaluation-parameter-routing.module';

@NgModule({
  imports: [SharedModule, AppraisalEvaluationParameterRoutingModule],
  declarations: [
    AppraisalEvaluationParameterComponent,
    AppraisalEvaluationParameterDetailComponent,
    AppraisalEvaluationParameterUpdateComponent,
    AppraisalEvaluationParameterDeleteDialogComponent,
  ],
})
export class AppraisalEvaluationParameterModule {}
