import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AppraisalEvaluationComponent } from '../list/appraisal-evaluation.component';
import { AppraisalEvaluationDetailComponent } from '../detail/appraisal-evaluation-detail.component';
import { AppraisalEvaluationUpdateComponent } from '../update/appraisal-evaluation-update.component';
import { AppraisalEvaluationRoutingResolveService } from './appraisal-evaluation-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const appraisalEvaluationRoute: Routes = [
  {
    path: '',
    component: AppraisalEvaluationComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AppraisalEvaluationDetailComponent,
    resolve: {
      appraisalEvaluation: AppraisalEvaluationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AppraisalEvaluationUpdateComponent,
    resolve: {
      appraisalEvaluation: AppraisalEvaluationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AppraisalEvaluationUpdateComponent,
    resolve: {
      appraisalEvaluation: AppraisalEvaluationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(appraisalEvaluationRoute)],
  exports: [RouterModule],
})
export class AppraisalEvaluationRoutingModule {}
