import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPerformanceIndicator } from '../performance-indicator.model';
import { PerformanceIndicatorService } from '../service/performance-indicator.service';

@Injectable({ providedIn: 'root' })
export class PerformanceIndicatorRoutingResolveService implements Resolve<IPerformanceIndicator | null> {
  constructor(protected service: PerformanceIndicatorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPerformanceIndicator | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((performanceIndicator: HttpResponse<IPerformanceIndicator>) => {
          if (performanceIndicator.body) {
            return of(performanceIndicator.body);
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
