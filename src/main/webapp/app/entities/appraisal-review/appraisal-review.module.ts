import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AppraisalReviewComponent } from './list/appraisal-review.component';
import { AppraisalReviewDetailComponent } from './detail/appraisal-review-detail.component';
import { AppraisalReviewUpdateComponent } from './update/appraisal-review-update.component';
import { AppraisalReviewDeleteDialogComponent } from './delete/appraisal-review-delete-dialog.component';
import { AppraisalReviewRoutingModule } from './route/appraisal-review-routing.module';

@NgModule({
  imports: [SharedModule, AppraisalReviewRoutingModule],
  declarations: [
    AppraisalReviewComponent,
    AppraisalReviewDetailComponent,
    AppraisalReviewUpdateComponent,
    AppraisalReviewDeleteDialogComponent,
  ],
})
export class AppraisalReviewModule {}
