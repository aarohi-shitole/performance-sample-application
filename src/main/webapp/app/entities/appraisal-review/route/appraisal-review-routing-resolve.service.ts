import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAppraisalReview } from '../appraisal-review.model';
import { AppraisalReviewService } from '../service/appraisal-review.service';

@Injectable({ providedIn: 'root' })
export class AppraisalReviewRoutingResolveService implements Resolve<IAppraisalReview | null> {
  constructor(protected service: AppraisalReviewService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAppraisalReview | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((appraisalReview: HttpResponse<IAppraisalReview>) => {
          if (appraisalReview.body) {
            return of(appraisalReview.body);
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
