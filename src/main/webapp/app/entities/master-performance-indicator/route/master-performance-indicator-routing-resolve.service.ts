import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMasterPerformanceIndicator } from '../master-performance-indicator.model';
import { MasterPerformanceIndicatorService } from '../service/master-performance-indicator.service';

@Injectable({ providedIn: 'root' })
export class MasterPerformanceIndicatorRoutingResolveService implements Resolve<IMasterPerformanceIndicator | null> {
  constructor(protected service: MasterPerformanceIndicatorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMasterPerformanceIndicator | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((masterPerformanceIndicator: HttpResponse<IMasterPerformanceIndicator>) => {
          if (masterPerformanceIndicator.body) {
            return of(masterPerformanceIndicator.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
