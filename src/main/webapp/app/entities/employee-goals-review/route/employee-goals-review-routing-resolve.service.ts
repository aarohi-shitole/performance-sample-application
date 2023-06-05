import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmployeeGoalsReview } from '../employee-goals-review.model';
import { EmployeeGoalsReviewService } from '../service/employee-goals-review.service';

@Injectable({ providedIn: 'root' })
export class EmployeeGoalsReviewRoutingResolveService implements Resolve<IEmployeeGoalsReview | null> {
  constructor(protected service: EmployeeGoalsReviewService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployeeGoalsReview | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((employeeGoalsReview: HttpResponse<IEmployeeGoalsReview>) => {
          if (employeeGoalsReview.body) {
            return of(employeeGoalsReview.body);
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
