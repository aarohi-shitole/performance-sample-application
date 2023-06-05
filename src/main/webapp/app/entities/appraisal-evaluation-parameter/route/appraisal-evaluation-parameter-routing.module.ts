import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AppraisalEvaluationParameterComponent } from '../list/appraisal-evaluation-parameter.component';
import { AppraisalEvaluationParameterDetailComponent } from '../detail/appraisal-evaluation-parameter-detail.component';
import { AppraisalEvaluationParameterUpdateComponent } from '../update/appraisal-evaluation-parameter-update.component';
import { AppraisalEvaluationParameterRoutingResolveService } from './appraisal-evaluation-parameter-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const appraisalEvaluationParameterRoute: Routes = [
  {
    path: '',
    component: AppraisalEvaluationParameterComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AppraisalEvaluationParameterDetailComponent,
    resolve: {
      appraisalEvaluationParameter: AppraisalEvaluationParameterRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AppraisalEvaluationParameterUpdateComponent,
    resolve: {
      appraisalEvaluationParameter: AppraisalEvaluationParameterRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AppraisalEvaluationParameterUpdateComponent,
    resolve: {
      appraisalEvaluationParameter: AppraisalEvaluationParameterRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(appraisalEvaluationParameterRoute)],
  exports: [RouterModule],
})
export class AppraisalEvaluationParameterRoutingModule {}
