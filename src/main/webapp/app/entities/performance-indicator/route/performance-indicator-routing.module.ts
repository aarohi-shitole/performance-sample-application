import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PerformanceIndicatorComponent } from '../list/performance-indicator.component';
import { PerformanceIndicatorDetailComponent } from '../detail/performance-indicator-detail.component';
import { PerformanceIndicatorUpdateComponent } from '../update/performance-indicator-update.component';
import { PerformanceIndicatorRoutingResolveService } from './performance-indicator-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const performanceIndicatorRoute: Routes = [
  {
    path: '',
    component: PerformanceIndicatorComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PerformanceIndicatorDetailComponent,
    resolve: {
      performanceIndicator: PerformanceIndicatorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PerformanceIndicatorUpdateComponent,
    resolve: {
      performanceIndicator: PerformanceIndicatorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PerformanceIndicatorUpdateComponent,
    resolve: {
      performanceIndicator: PerformanceIndicatorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(performanceIndicatorRoute)],
  exports: [RouterModule],
})
export class PerformanceIndicatorRoutingModule {}
