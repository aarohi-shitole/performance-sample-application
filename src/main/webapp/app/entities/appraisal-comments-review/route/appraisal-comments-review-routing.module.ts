import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AppraisalCommentsReviewComponent } from '../list/appraisal-comments-review.component';
import { AppraisalCommentsReviewDetailComponent } from '../detail/appraisal-comments-review-detail.component';
import { AppraisalCommentsReviewUpdateComponent } from '../update/appraisal-comments-review-update.component';
import { AppraisalCommentsReviewRoutingResolveService } from './appraisal-comments-review-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const appraisalCommentsReviewRoute: Routes = [
  {
    path: '',
    component: AppraisalCommentsReviewComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AppraisalCommentsReviewDetailComponent,
    resolve: {
      appraisalCommentsReview: AppraisalCommentsReviewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AppraisalCommentsReviewUpdateComponent,
    resolve: {
      appraisalCommentsReview: AppraisalCommentsReviewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AppraisalCommentsReviewUpdateComponent,
    resolve: {
      appraisalCommentsReview: AppraisalCommentsReviewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(appraisalCommentsReviewRoute)],
  exports: [RouterModule],
})
export class AppraisalCommentsReviewRoutingModule {}
