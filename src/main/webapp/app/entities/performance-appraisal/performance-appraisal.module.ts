import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PerformanceAppraisalComponent } from './list/performance-appraisal.component';
import { PerformanceAppraisalDetailComponent } from './detail/performance-appraisal-detail.component';
import { PerformanceAppraisalUpdateComponent } from './update/performance-appraisal-update.component';
import { PerformanceAppraisalDeleteDialogComponent } from './delete/performance-appraisal-delete-dialog.component';
import { PerformanceAppraisalRoutingModule } from './route/performance-appraisal-routing.module';

@NgModule({
  imports: [SharedModule, PerformanceAppraisalRoutingModule],
  declarations: [
    PerformanceAppraisalComponent,
    PerformanceAppraisalDetailComponent,
    PerformanceAppraisalUpdateComponent,
    PerformanceAppraisalDeleteDialogComponent,
  ],
})
export class PerformanceAppraisalModule {}
