import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PerformanceIndicatorComponent } from './list/performance-indicator.component';
import { PerformanceIndicatorDetailComponent } from './detail/performance-indicator-detail.component';
import { PerformanceIndicatorUpdateComponent } from './update/performance-indicator-update.component';
import { PerformanceIndicatorDeleteDialogComponent } from './delete/performance-indicator-delete-dialog.component';
import { PerformanceIndicatorRoutingModule } from './route/performance-indicator-routing.module';

@NgModule({
  imports: [SharedModule, PerformanceIndicatorRoutingModule],
  declarations: [
    PerformanceIndicatorComponent,
    PerformanceIndicatorDetailComponent,
    PerformanceIndicatorUpdateComponent,
    PerformanceIndicatorDeleteDialogComponent,
  ],
})
export class PerformanceIndicatorModule {}
