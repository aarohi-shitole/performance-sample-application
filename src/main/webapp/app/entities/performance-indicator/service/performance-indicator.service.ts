import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPerformanceIndicator, NewPerformanceIndicator } from '../performance-indicator.model';

export type PartialUpdatePerformanceIndicator = Partial<IPerformanceIndicator> & Pick<IPerformanceIndicator, 'id'>;

type RestOf<T extends IPerformanceIndicator | NewPerformanceIndicator> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestPerformanceIndicator = RestOf<IPerformanceIndicator>;

export type NewRestPerformanceIndicator = RestOf<NewPerformanceIndicator>;

export type PartialUpdateRestPerformanceIndicator = RestOf<PartialUpdatePerformanceIndicator>;

export type EntityResponseType = HttpResponse<IPerformanceIndicator>;
export type EntityArrayResponseType = HttpResponse<IPerformanceIndicator[]>;

@Injectable({ providedIn: 'root' })
export class PerformanceIndicatorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/performance-indicators');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(performanceIndicator: NewPerformanceIndicator): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(performanceIndicator);
    return this.http
      .post<RestPerformanceIndicator>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(performanceIndicator: IPerformanceIndicator): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(performanceIndicator);
    return this.http
      .put<RestPerformanceIndicator>(`${this.resourceUrl}/${this.getPerformanceIndicatorIdentifier(performanceIndicator)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(performanceIndicator: PartialUpdatePerformanceIndicator): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(performanceIndicator);
    return this.http
      .patch<RestPerformanceIndicator>(`${this.resourceUrl}/${this.getPerformanceIndicatorIdentifier(performanceIndicator)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPerformanceIndicator>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPerformanceIndicator[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPerformanceIndicatorIdentifier(performanceIndicator: Pick<IPerformanceIndicator, 'id'>): number {
    return performanceIndicator.id;
  }

  comparePerformanceIndicator(o1: Pick<IPerformanceIndicator, 'id'> | null, o2: Pick<IPerformanceIndicator, 'id'> | null): boolean {
    return o1 && o2 ? this.getPerformanceIndicatorIdentifier(o1) === this.getPerformanceIndicatorIdentifier(o2) : o1 === o2;
  }

  addPerformanceIndicatorToCollectionIfMissing<Type extends Pick<IPerformanceIndicator, 'id'>>(
    performanceIndicatorCollection: Type[],
    ...performanceIndicatorsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const performanceIndicators: Type[] = performanceIndicatorsToCheck.filter(isPresent);
    if (performanceIndicators.length > 0) {
      const performanceIndicatorCollectionIdentifiers = performanceIndicatorCollection.map(
        performanceIndicatorItem => this.getPerformanceIndicatorIdentifier(performanceIndicatorItem)!
      );
      const performanceIndicatorsToAdd = performanceIndicators.filter(performanceIndicatorItem => {
        const performanceIndicatorIdentifier = this.getPerformanceIndicatorIdentifier(performanceIndicatorItem);
        if (performanceIndicatorCollectionIdentifiers.includes(performanceIndicatorIdentifier)) {
          return false;
        }
        performanceIndicatorCollectionIdentifiers.push(performanceIndicatorIdentifier);
        return true;
      });
      return [...performanceIndicatorsToAdd, ...performanceIndicatorCollection];
    }
    return performanceIndicatorCollection;
  }

  protected convertDateFromClient<T extends IPerformanceIndicator | NewPerformanceIndicator | PartialUpdatePerformanceIndicator>(
    performanceIndicator: T
  ): RestOf<T> {
    return {
      ...performanceIndicator,
      lastModified: performanceIndicator.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restPerformanceIndicator: RestPerformanceIndicator): IPerformanceIndicator {
    return {
      ...restPerformanceIndicator,
      lastModified: restPerformanceIndicator.lastModified ? dayjs(restPerformanceIndicator.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPerformanceIndicator>): HttpResponse<IPerformanceIndicator> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPerformanceIndicator[]>): HttpResponse<IPerformanceIndicator[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
