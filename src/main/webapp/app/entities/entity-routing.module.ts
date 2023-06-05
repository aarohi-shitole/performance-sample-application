import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'employee',
        data: { pageTitle: 'performanceSampleApplicationApp.employee.home.title' },
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
      },
      {
        path: 'master-performance-indicator',
        data: { pageTitle: 'performanceSampleApplicationApp.masterPerformanceIndicator.home.title' },
        loadChildren: () =>
          import('./master-performance-indicator/master-performance-indicator.module').then(m => m.MasterPerformanceIndicatorModule),
      },
      {
        path: 'performance-indicator',
        data: { pageTitle: 'performanceSampleApplicationApp.performanceIndicator.home.title' },
        loadChildren: () => import('./performance-indicator/performance-indicator.module').then(m => m.PerformanceIndicatorModule),
      },
      {
        path: 'performance-appraisal',
        data: { pageTitle: 'performanceSampleApplicationApp.performanceAppraisal.home.title' },
        loadChildren: () => import('./performance-appraisal/performance-appraisal.module').then(m => m.PerformanceAppraisalModule),
      },
      {
        path: 'appraisal-review',
        data: { pageTitle: 'performanceSampleApplicationApp.appraisalReview.home.title' },
        loadChildren: () => import('./appraisal-review/appraisal-review.module').then(m => m.AppraisalReviewModule),
      },
      {
        path: 'performance-review',
        data: { pageTitle: 'performanceSampleApplicationApp.performanceReview.home.title' },
        loadChildren: () => import('./performance-review/performance-review.module').then(m => m.PerformanceReviewModule),
      },
      {
        path: 'appraisal-comments-review',
        data: { pageTitle: 'performanceSampleApplicationApp.appraisalCommentsReview.home.title' },
        loadChildren: () =>
          import('./appraisal-comments-review/appraisal-comments-review.module').then(m => m.AppraisalCommentsReviewModule),
      },
      {
        path: 'employee-goals-review',
        data: { pageTitle: 'performanceSampleApplicationApp.employeeGoalsReview.home.title' },
        loadChildren: () => import('./employee-goals-review/employee-goals-review.module').then(m => m.EmployeeGoalsReviewModule),
      },
      {
        path: 'appraisal-evaluation-parameter',
        data: { pageTitle: 'performanceSampleApplicationApp.appraisalEvaluationParameter.home.title' },
        loadChildren: () =>
          import('./appraisal-evaluation-parameter/appraisal-evaluation-parameter.module').then(m => m.AppraisalEvaluationParameterModule),
      },
      {
        path: 'appraisal-evaluation',
        data: { pageTitle: 'performanceSampleApplicationApp.appraisalEvaluation.home.title' },
        loadChildren: () => import('./appraisal-evaluation/appraisal-evaluation.module').then(m => m.AppraisalEvaluationModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
