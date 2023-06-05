import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAppraisalEvaluationParameter, NewAppraisalEvaluationParameter } from '../appraisal-evaluation-parameter.model';

export type PartialUpdateAppraisalEvaluationParameter = Partial<IAppraisalEvaluationParameter> & Pick<IAppraisalEvaluationParameter, 'id'>;

type RestOf<T extends IAppraisalEvaluationParameter | NewAppraisalEvaluationParameter> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestAppraisalEvaluationParameter = RestOf<IAppraisalEvaluationParameter>;

export type NewRestAppraisalEvaluationParameter = RestOf<NewAppraisalEvaluationParameter>;

export type PartialUpdateRestAppraisalEvaluationParameter = RestOf<PartialUpdateAppraisalEvaluationParameter>;

export type EntityResponseType = HttpResponse<IAppraisalEvaluationParameter>;
export type EntityArrayResponseType = HttpResponse<IAppraisalEvaluationParameter[]>;

@Injectable({ providedIn: 'root' })
export class AppraisalEvaluationParameterService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/appraisal-evaluation-parameters');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(appraisalEvaluationParameter: NewAppraisalEvaluationParameter): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appraisalEvaluationParameter);
    return this.http
      .post<RestAppraisalEvaluationParameter>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(appraisalEvaluationParameter: IAppraisalEvaluationParameter): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appraisalEvaluationParameter);
    return this.http
      .put<RestAppraisalEvaluationParameter>(
        `${this.resourceUrl}/${this.getAppraisalEvaluationParameterIdentifier(appraisalEvaluationParameter)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(appraisalEvaluationParameter: PartialUpdateAppraisalEvaluationParameter): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appraisalEvaluationParameter);
    return this.http
      .patch<RestAppraisalEvaluationParameter>(
        `${this.resourceUrl}/${this.getAppraisalEvaluationParameterIdentifier(appraisalEvaluationParameter)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAppraisalEvaluationParameter>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAppraisalEvaluationParameter[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAppraisalEvaluationParameterIdentifier(appraisalEvaluationParameter: Pick<IAppraisalEvaluationParameter, 'id'>): number {
    return appraisalEvaluationParameter.id;
  }

  compareAppraisalEvaluationParameter(
    o1: Pick<IAppraisalEvaluationParameter, 'id'> | null,
    o2: Pick<IAppraisalEvaluationParameter, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getAppraisalEvaluationParameterIdentifier(o1) === this.getAppraisalEvaluationParameterIdentifier(o2) : o1 === o2;
  }

  addAppraisalEvaluationParameterToCollectionIfMissing<Type extends Pick<IAppraisalEvaluationParameter, 'id'>>(
    appraisalEvaluationParameterCollection: Type[],
    ...appraisalEvaluationParametersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const appraisalEvaluationParameters: Type[] = appraisalEvaluationParametersToCheck.filter(isPresent);
    if (appraisalEvaluationParameters.length > 0) {
      const appraisalEvaluationParameterCollectionIdentifiers = appraisalEvaluationParameterCollection.map(
        appraisalEvaluationParameterItem => this.getAppraisalEvaluationParameterIdentifier(appraisalEvaluationParameterItem)!
      );
      const appraisalEvaluationParametersToAdd = appraisalEvaluationParameters.filter(appraisalEvaluationParameterItem => {
        const appraisalEvaluationParameterIdentifier = this.getAppraisalEvaluationParameterIdentifier(appraisalEvaluationParameterItem);
        if (appraisalEvaluationParameterCollectionIdentifiers.includes(appraisalEvaluationParameterIdentifier)) {
          return false;
        }
        appraisalEvaluationParameterCollectionIdentifiers.push(appraisalEvaluationParameterIdentifier);
        return true;
      });
      return [...appraisalEvaluationParametersToAdd, ...appraisalEvaluationParameterCollection];
    }
    return appraisalEvaluationParameterCollection;
  }

  protected convertDateFromClient<
    T extends IAppraisalEvaluationParameter | NewAppraisalEvaluationParameter | PartialUpdateAppraisalEvaluationParameter
  >(appraisalEvaluationParameter: T): RestOf<T> {
    return {
      ...appraisalEvaluationParameter,
      lastModified: appraisalEvaluationParameter.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restAppraisalEvaluationParameter: RestAppraisalEvaluationParameter): IAppraisalEvaluationParameter {
    return {
      ...restAppraisalEvaluationParameter,
      lastModified: restAppraisalEvaluationParameter.lastModified ? dayjs(restAppraisalEvaluationParameter.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAppraisalEvaluationParameter>): HttpResponse<IAppraisalEvaluationParameter> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(
    res: HttpResponse<RestAppraisalEvaluationParameter[]>
  ): HttpResponse<IAppraisalEvaluationParameter[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
