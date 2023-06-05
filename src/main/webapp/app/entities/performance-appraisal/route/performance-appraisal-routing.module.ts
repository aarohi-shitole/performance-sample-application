import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PerformanceAppraisalComponent } from '../list/performance-appraisal.component';
import { PerformanceAppraisalDetailComponent } from '../detail/performance-appraisal-detail.component';
import { PerformanceAppraisalUpdateComponent } from '../update/performance-appraisal-update.component';
import { PerformanceAppraisalRoutingResolveService } from './performance-appraisal-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const performanceAppraisalRoute: Routes = [
  {
    path: '',
    component: PerformanceAppraisalComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PerformanceAppraisalDetailComponent,
    resolve: {
      performanceAppraisal: PerformanceAppraisalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PerformanceAppraisalUpdateComponent,
    resolve: {
      performanceAppraisal: PerformanceAppraisalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PerformanceAppraisalUpdateComponent,
    resolve: {
      performanceAppraisal: PerformanceAppraisalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(performanceAppraisalRoute)],
  exports: [RouterModule],
})
export class PerformanceAppraisalRoutingModule {}
