import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAppraisalEvaluation } from '../appraisal-evaluation.model';
import { AppraisalEvaluationService } from '../service/appraisal-evaluation.service';

@Injectable({ providedIn: 'root' })
export class AppraisalEvaluationRoutingResolveService implements Resolve<IAppraisalEvaluation | null> {
  constructor(protected service: AppraisalEvaluationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAppraisalEvaluation | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((appraisalEvaluation: HttpResponse<IAppraisalEvaluation>) => {
          if (appraisalEvaluation.body) {
            return of(appraisalEvaluation.body);
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
