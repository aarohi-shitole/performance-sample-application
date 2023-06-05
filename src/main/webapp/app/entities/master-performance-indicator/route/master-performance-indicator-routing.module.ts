import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MasterPerformanceIndicatorComponent } from '../list/master-performance-indicator.component';
import { MasterPerformanceIndicatorDetailComponent } from '../detail/master-performance-indicator-detail.component';
import { MasterPerformanceIndicatorUpdateComponent } from '../update/master-performance-indicator-update.component';
import { MasterPerformanceIndicatorRoutingResolveService } from './master-performance-indicator-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const masterPerformanceIndicatorRoute: Routes = [
  {
    path: '',
    component: MasterPerformanceIndicatorComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MasterPerformanceIndicatorDetailComponent,
    resolve: {
      masterPerformanceIndicator: MasterPerformanceIndicatorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MasterPerformanceIndicatorUpdateComponent,
    resolve: {
      masterPerformanceIndicator: MasterPerformanceIndicatorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MasterPerformanceIndicatorUpdateComponent,
    resolve: {
      masterPerformanceIndicator: MasterPerformanceIndicatorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(masterPerformanceIndicatorRoute)],
  exports: [RouterModule],
})
export class MasterPerformanceIndicatorRoutingModule {}
