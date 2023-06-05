import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PerformanceReviewComponent } from './list/performance-review.component';
import { PerformanceReviewDetailComponent } from './detail/performance-review-detail.component';
import { PerformanceReviewUpdateComponent } from './update/performance-review-update.component';
import { PerformanceReviewDeleteDialogComponent } from './delete/performance-review-delete-dialog.component';
import { PerformanceReviewRoutingModule } from './route/performance-review-routing.module';

@NgModule({
  imports: [SharedModule, PerformanceReviewRoutingModule],
  declarations: [
    PerformanceReviewComponent,
    PerformanceReviewDetailComponent,
    PerformanceReviewUpdateComponent,
    PerformanceReviewDeleteDialogComponent,
  ],
})
export class PerformanceReviewModule {}
