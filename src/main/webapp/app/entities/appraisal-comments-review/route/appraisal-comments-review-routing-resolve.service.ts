import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAppraisalCommentsReview } from '../appraisal-comments-review.model';
import { AppraisalCommentsReviewService } from '../service/appraisal-comments-review.service';

@Injectable({ providedIn: 'root' })
export class AppraisalCommentsReviewRoutingResolveService implements Resolve<IAppraisalCommentsReview | null> {
  constructor(protected service: AppraisalCommentsReviewService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAppraisalCommentsReview | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((appraisalCommentsReview: HttpResponse<IAppraisalCommentsReview>) => {
          if (appraisalCommentsReview.body) {
            return of(appraisalCommentsReview.body);
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
