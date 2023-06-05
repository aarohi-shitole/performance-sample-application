import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPerformanceReview } from '../performance-review.model';
import { PerformanceReviewService } from '../service/performance-review.service';

@Injectable({ providedIn: 'root' })
export class PerformanceReviewRoutingResolveService implements Resolve<IPerformanceReview | null> {
  constructor(protected service: PerformanceReviewService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPerformanceReview | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((performanceReview: HttpResponse<IPerformanceReview>) => {
          if (performanceReview.body) {
            return of(performanceReview.body);
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
