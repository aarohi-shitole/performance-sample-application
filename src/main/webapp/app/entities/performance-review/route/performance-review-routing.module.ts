import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PerformanceReviewComponent } from '../list/performance-review.component';
import { PerformanceReviewDetailComponent } from '../detail/performance-review-detail.component';
import { PerformanceReviewUpdateComponent } from '../update/performance-review-update.component';
import { PerformanceReviewRoutingResolveService } from './performance-review-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const performanceReviewRoute: Routes = [
  {
    path: '',
    component: PerformanceReviewComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PerformanceReviewDetailComponent,
    resolve: {
      performanceReview: PerformanceReviewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PerformanceReviewUpdateComponent,
    resolve: {
      performanceReview: PerformanceReviewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PerformanceReviewUpdateComponent,
    resolve: {
      performanceReview: PerformanceReviewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(performanceReviewRoute)],
  exports: [RouterModule],
})
export class PerformanceReviewRoutingModule {}
