import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AppraisalReviewComponent } from '../list/appraisal-review.component';
import { AppraisalReviewDetailComponent } from '../detail/appraisal-review-detail.component';
import { AppraisalReviewUpdateComponent } from '../update/appraisal-review-update.component';
import { AppraisalReviewRoutingResolveService } from './appraisal-review-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const appraisalReviewRoute: Routes = [
  {
    path: '',
    component: AppraisalReviewComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AppraisalReviewDetailComponent,
    resolve: {
      appraisalReview: AppraisalReviewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AppraisalReviewUpdateComponent,
    resolve: {
      appraisalReview: AppraisalReviewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AppraisalReviewUpdateComponent,
    resolve: {
      appraisalReview: AppraisalReviewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(appraisalReviewRoute)],
  exports: [RouterModule],
})
export class AppraisalReviewRoutingModule {}
