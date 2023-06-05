import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EmployeeGoalsReviewComponent } from './list/employee-goals-review.component';
import { EmployeeGoalsReviewDetailComponent } from './detail/employee-goals-review-detail.component';
import { EmployeeGoalsReviewUpdateComponent } from './update/employee-goals-review-update.component';
import { EmployeeGoalsReviewDeleteDialogComponent } from './delete/employee-goals-review-delete-dialog.component';
import { EmployeeGoalsReviewRoutingModule } from './route/employee-goals-review-routing.module';

@NgModule({
  imports: [SharedModule, EmployeeGoalsReviewRoutingModule],
  declarations: [
    EmployeeGoalsReviewComponent,
    EmployeeGoalsReviewDetailComponent,
    EmployeeGoalsReviewUpdateComponent,
    EmployeeGoalsReviewDeleteDialogComponent,
  ],
})
export class EmployeeGoalsReviewModule {}
