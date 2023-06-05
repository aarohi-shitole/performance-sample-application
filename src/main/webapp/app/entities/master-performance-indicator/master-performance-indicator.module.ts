import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MasterPerformanceIndicatorComponent } from './list/master-performance-indicator.component';
import { MasterPerformanceIndicatorDetailComponent } from './detail/master-performance-indicator-detail.component';
import { MasterPerformanceIndicatorUpdateComponent } from './update/master-performance-indicator-update.component';
import { MasterPerformanceIndicatorDeleteDialogComponent } from './delete/master-performance-indicator-delete-dialog.component';
import { MasterPerformanceIndicatorRoutingModule } from './route/master-performance-indicator-routing.module';

@NgModule({
  imports: [SharedModule, MasterPerformanceIndicatorRoutingModule],
  declarations: [
    MasterPerformanceIndicatorComponent,
    MasterPerformanceIndicatorDetailComponent,
    MasterPerformanceIndicatorUpdateComponent,
    MasterPerformanceIndicatorDeleteDialogComponent,
  ],
})
export class MasterPerformanceIndicatorModule {}
