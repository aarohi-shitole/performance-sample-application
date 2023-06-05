import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPerformanceAppraisal } from '../performance-appraisal.model';
import { PerformanceAppraisalService } from '../service/performance-appraisal.service';

@Injectable({ providedIn: 'root' })
export class PerformanceAppraisalRoutingResolveService implements Resolve<IPerformanceAppraisal | null> {
  constructor(protected service: PerformanceAppraisalService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPerformanceAppraisal | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((performanceAppraisal: HttpResponse<IPerformanceAppraisal>) => {
          if (performanceAppraisal.body) {
            return of(performanceAppraisal.body);
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
