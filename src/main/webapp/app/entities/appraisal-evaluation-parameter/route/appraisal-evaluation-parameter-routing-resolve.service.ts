import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAppraisalEvaluationParameter } from '../appraisal-evaluation-parameter.model';
import { AppraisalEvaluationParameterService } from '../service/appraisal-evaluation-parameter.service';

@Injectable({ providedIn: 'root' })
export class AppraisalEvaluationParameterRoutingResolveService implements Resolve<IAppraisalEvaluationParameter | null> {
  constructor(protected service: AppraisalEvaluationParameterService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAppraisalEvaluationParameter | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((appraisalEvaluationParameter: HttpResponse<IAppraisalEvaluationParameter>) => {
          if (appraisalEvaluationParameter.body) {
            return of(appraisalEvaluationParameter.body);
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
