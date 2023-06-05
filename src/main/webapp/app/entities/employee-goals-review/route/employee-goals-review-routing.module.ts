import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmployeeGoalsReviewComponent } from '../list/employee-goals-review.component';
import { EmployeeGoalsReviewDetailComponent } from '../detail/employee-goals-review-detail.component';
import { EmployeeGoalsReviewUpdateComponent } from '../update/employee-goals-review-update.component';
import { EmployeeGoalsReviewRoutingResolveService } from './employee-goals-review-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const employeeGoalsReviewRoute: Routes = [
  {
    path: '',
    component: EmployeeGoalsReviewComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmployeeGoalsReviewDetailComponent,
    resolve: {
      employeeGoalsReview: EmployeeGoalsReviewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmployeeGoalsReviewUpdateComponent,
    resolve: {
      employeeGoalsReview: EmployeeGoalsReviewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmployeeGoalsReviewUpdateComponent,
    resolve: {
      employeeGoalsReview: EmployeeGoalsReviewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(employeeGoalsReviewRoute)],
  exports: [RouterModule],
})
export class EmployeeGoalsReviewRoutingModule {}
