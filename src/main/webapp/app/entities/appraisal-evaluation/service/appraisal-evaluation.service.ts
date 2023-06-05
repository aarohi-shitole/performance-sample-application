import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAppraisalEvaluation, NewAppraisalEvaluation } from '../appraisal-evaluation.model';

export type PartialUpdateAppraisalEvaluation = Partial<IAppraisalEvaluation> & Pick<IAppraisalEvaluation, 'id'>;

type RestOf<T extends IAppraisalEvaluation | NewAppraisalEvaluation> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestAppraisalEvaluation = RestOf<IAppraisalEvaluation>;

export type NewRestAppraisalEvaluation = RestOf<NewAppraisalEvaluation>;

export type PartialUpdateRestAppraisalEvaluation = RestOf<PartialUpdateAppraisalEvaluation>;

export type EntityResponseType = HttpResponse<IAppraisalEvaluation>;
export type EntityArrayResponseType = HttpResponse<IAppraisalEvaluation[]>;

@Injectable({ providedIn: 'root' })
export class AppraisalEvaluationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/appraisal-evaluations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(appraisalEvaluation: NewAppraisalEvaluation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appraisalEvaluation);
    return this.http
      .post<RestAppraisalEvaluation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(appraisalEvaluation: IAppraisalEvaluation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appraisalEvaluation);
    return this.http
      .put<RestAppraisalEvaluation>(`${this.resourceUrl}/${this.getAppraisalEvaluationIdentifier(appraisalEvaluation)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(appraisalEvaluation: PartialUpdateAppraisalEvaluation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appraisalEvaluation);
    return this.http
      .patch<RestAppraisalEvaluation>(`${this.resourceUrl}/${this.getAppraisalEvaluationIdentifier(appraisalEvaluation)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAppraisalEvaluation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAppraisalEvaluation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAppraisalEvaluationIdentifier(appraisalEvaluation: Pick<IAppraisalEvaluation, 'id'>): number {
    return appraisalEvaluation.id;
  }

  compareAppraisalEvaluation(o1: Pick<IAppraisalEvaluation, 'id'> | null, o2: Pick<IAppraisalEvaluation, 'id'> | null): boolean {
    return o1 && o2 ? this.getAppraisalEvaluationIdentifier(o1) === this.getAppraisalEvaluationIdentifier(o2) : o1 === o2;
  }

  addAppraisalEvaluationToCollectionIfMissing<Type extends Pick<IAppraisalEvaluation, 'id'>>(
    appraisalEvaluationCollection: Type[],
    ...appraisalEvaluationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const appraisalEvaluations: Type[] = appraisalEvaluationsToCheck.filter(isPresent);
    if (appraisalEvaluations.length > 0) {
      const appraisalEvaluationCollectionIdentifiers = appraisalEvaluationCollection.map(
        appraisalEvaluationItem => this.getAppraisalEvaluationIdentifier(appraisalEvaluationItem)!
      );
      const appraisalEvaluationsToAdd = appraisalEvaluations.filter(appraisalEvaluationItem => {
        const appraisalEvaluationIdentifier = this.getAppraisalEvaluationIdentifier(appraisalEvaluationItem);
        if (appraisalEvaluationCollectionIdentifiers.includes(appraisalEvaluationIdentifier)) {
          return false;
        }
        appraisalEvaluationCollectionIdentifiers.push(appraisalEvaluationIdentifier);
        return true;
      });
      return [...appraisalEvaluationsToAdd, ...appraisalEvaluationCollection];
    }
    return appraisalEvaluationCollection;
  }

  protected convertDateFromClient<T extends IAppraisalEvaluation | NewAppraisalEvaluation | PartialUpdateAppraisalEvaluation>(
    appraisalEvaluation: T
  ): RestOf<T> {
    return {
      ...appraisalEvaluation,
      lastModified: appraisalEvaluation.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restAppraisalEvaluation: RestAppraisalEvaluation): IAppraisalEvaluation {
    return {
      ...restAppraisalEvaluation,
      lastModified: restAppraisalEvaluation.lastModified ? dayjs(restAppraisalEvaluation.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAppraisalEvaluation>): HttpResponse<IAppraisalEvaluation> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAppraisalEvaluation[]>): HttpResponse<IAppraisalEvaluation[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
