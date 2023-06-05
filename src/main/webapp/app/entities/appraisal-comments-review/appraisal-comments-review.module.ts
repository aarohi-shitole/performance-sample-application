import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AppraisalCommentsReviewComponent } from './list/appraisal-comments-review.component';
import { AppraisalCommentsReviewDetailComponent } from './detail/appraisal-comments-review-detail.component';
import { AppraisalCommentsReviewUpdateComponent } from './update/appraisal-comments-review-update.component';
import { AppraisalCommentsReviewDeleteDialogComponent } from './delete/appraisal-comments-review-delete-dialog.component';
import { AppraisalCommentsReviewRoutingModule } from './route/appraisal-comments-review-routing.module';

@NgModule({
  imports: [SharedModule, AppraisalCommentsReviewRoutingModule],
  declarations: [
    AppraisalCommentsReviewComponent,
    AppraisalCommentsReviewDetailComponent,
    AppraisalCommentsReviewUpdateComponent,
    AppraisalCommentsReviewDeleteDialogComponent,
  ],
})
export class AppraisalCommentsReviewModule {}
