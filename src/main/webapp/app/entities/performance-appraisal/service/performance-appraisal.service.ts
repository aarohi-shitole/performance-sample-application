import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPerformanceAppraisal, NewPerformanceAppraisal } from '../performance-appraisal.model';

export type PartialUpdatePerformanceAppraisal = Partial<IPerformanceAppraisal> & Pick<IPerformanceAppraisal, 'id'>;

type RestOf<T extends IPerformanceAppraisal | NewPerformanceAppraisal> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestPerformanceAppraisal = RestOf<IPerformanceAppraisal>;

export type NewRestPerformanceAppraisal = RestOf<NewPerformanceAppraisal>;

export type PartialUpdateRestPerformanceAppraisal = RestOf<PartialUpdatePerformanceAppraisal>;

export type EntityResponseType = HttpResponse<IPerformanceAppraisal>;
export type EntityArrayResponseType = HttpResponse<IPerformanceAppraisal[]>;

@Injectable({ providedIn: 'root' })
export class PerformanceAppraisalService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/performance-appraisals');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(performanceAppraisal: NewPerformanceAppraisal): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(performanceAppraisal);
    return this.http
      .post<RestPerformanceAppraisal>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(performanceAppraisal: IPerformanceAppraisal): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(performanceAppraisal);
    return this.http
      .put<RestPerformanceAppraisal>(`${this.resourceUrl}/${this.getPerformanceAppraisalIdentifier(performanceAppraisal)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(performanceAppraisal: PartialUpdatePerformanceAppraisal): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(performanceAppraisal);
    return this.http
      .patch<RestPerformanceAppraisal>(`${this.resourceUrl}/${this.getPerformanceAppraisalIdentifier(performanceAppraisal)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPerformanceAppraisal>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPerformanceAppraisal[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPerformanceAppraisalIdentifier(performanceAppraisal: Pick<IPerformanceAppraisal, 'id'>): number {
    return performanceAppraisal.id;
  }

  comparePerformanceAppraisal(o1: Pick<IPerformanceAppraisal, 'id'> | null, o2: Pick<IPerformanceAppraisal, 'id'> | null): boolean {
    return o1 && o2 ? this.getPerformanceAppraisalIdentifier(o1) === this.getPerformanceAppraisalIdentifier(o2) : o1 === o2;
  }

  addPerformanceAppraisalToCollectionIfMissing<Type extends Pick<IPerformanceAppraisal, 'id'>>(
    performanceAppraisalCollection: Type[],
    ...performanceAppraisalsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const performanceAppraisals: Type[] = performanceAppraisalsToCheck.filter(isPresent);
    if (performanceAppraisals.length > 0) {
      const performanceAppraisalCollectionIdentifiers = performanceAppraisalCollection.map(
        performanceAppraisalItem => this.getPerformanceAppraisalIdentifier(performanceAppraisalItem)!
      );
      const performanceAppraisalsToAdd = performanceAppraisals.filter(performanceAppraisalItem => {
        const performanceAppraisalIdentifier = this.getPerformanceAppraisalIdentifier(performanceAppraisalItem);
        if (performanceAppraisalCollectionIdentifiers.includes(performanceAppraisalIdentifier)) {
          return false;
        }
        performanceAppraisalCollectionIdentifiers.push(performanceAppraisalIdentifier);
        return true;
      });
      return [...performanceAppraisalsToAdd, ...performanceAppraisalCollection];
    }
    return performanceAppraisalCollection;
  }

  protected convertDateFromClient<T extends IPerformanceAppraisal | NewPerformanceAppraisal | PartialUpdatePerformanceAppraisal>(
    performanceAppraisal: T
  ): RestOf<T> {
    return {
      ...performanceAppraisal,
      lastModified: performanceAppraisal.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restPerformanceAppraisal: RestPerformanceAppraisal): IPerformanceAppraisal {
    return {
      ...restPerformanceAppraisal,
      lastModified: restPerformanceAppraisal.lastModified ? dayjs(restPerformanceAppraisal.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPerformanceAppraisal>): HttpResponse<IPerformanceAppraisal> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPerformanceAppraisal[]>): HttpResponse<IPerformanceAppraisal[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
