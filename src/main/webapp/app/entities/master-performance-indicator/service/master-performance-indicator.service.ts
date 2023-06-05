import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMasterPerformanceIndicator, NewMasterPerformanceIndicator } from '../master-performance-indicator.model';

export type PartialUpdateMasterPerformanceIndicator = Partial<IMasterPerformanceIndicator> & Pick<IMasterPerformanceIndicator, 'id'>;

type RestOf<T extends IMasterPerformanceIndicator | NewMasterPerformanceIndicator> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestMasterPerformanceIndicator = RestOf<IMasterPerformanceIndicator>;

export type NewRestMasterPerformanceIndicator = RestOf<NewMasterPerformanceIndicator>;

export type PartialUpdateRestMasterPerformanceIndicator = RestOf<PartialUpdateMasterPerformanceIndicator>;

export type EntityResponseType = HttpResponse<IMasterPerformanceIndicator>;
export type EntityArrayResponseType = HttpResponse<IMasterPerformanceIndicator[]>;

@Injectable({ providedIn: 'root' })
export class MasterPerformanceIndicatorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/master-performance-indicators');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(masterPerformanceIndicator: NewMasterPerformanceIndicator): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(masterPerformanceIndicator);
    return this.http
      .post<RestMasterPerformanceIndicator>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(masterPerformanceIndicator: IMasterPerformanceIndicator): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(masterPerformanceIndicator);
    return this.http
      .put<RestMasterPerformanceIndicator>(
        `${this.resourceUrl}/${this.getMasterPerformanceIndicatorIdentifier(masterPerformanceIndicator)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(masterPerformanceIndicator: PartialUpdateMasterPerformanceIndicator): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(masterPerformanceIndicator);
    return this.http
      .patch<RestMasterPerformanceIndicator>(
        `${this.resourceUrl}/${this.getMasterPerformanceIndicatorIdentifier(masterPerformanceIndicator)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestMasterPerformanceIndicator>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestMasterPerformanceIndicator[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMasterPerformanceIndicatorIdentifier(masterPerformanceIndicator: Pick<IMasterPerformanceIndicator, 'id'>): number {
    return masterPerformanceIndicator.id;
  }

  compareMasterPerformanceIndicator(
    o1: Pick<IMasterPerformanceIndicator, 'id'> | null,
    o2: Pick<IMasterPerformanceIndicator, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getMasterPerformanceIndicatorIdentifier(o1) === this.getMasterPerformanceIndicatorIdentifier(o2) : o1 === o2;
  }

  addMasterPerformanceIndicatorToCollectionIfMissing<Type extends Pick<IMasterPerformanceIndicator, 'id'>>(
    masterPerformanceIndicatorCollection: Type[],
    ...masterPerformanceIndicatorsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const masterPerformanceIndicators: Type[] = masterPerformanceIndicatorsToCheck.filter(isPresent);
    if (masterPerformanceIndicators.length > 0) {
      const masterPerformanceIndicatorCollectionIdentifiers = masterPerformanceIndicatorCollection.map(
        masterPerformanceIndicatorItem => this.getMasterPerformanceIndicatorIdentifier(masterPerformanceIndicatorItem)!
      );
      const masterPerformanceIndicatorsToAdd = masterPerformanceIndicators.filter(masterPerformanceIndicatorItem => {
        const masterPerformanceIndicatorIdentifier = this.getMasterPerformanceIndicatorIdentifier(masterPerformanceIndicatorItem);
        if (masterPerformanceIndicatorCollectionIdentifiers.includes(masterPerformanceIndicatorIdentifier)) {
          return false;
        }
        masterPerformanceIndicatorCollectionIdentifiers.push(masterPerformanceIndicatorIdentifier);
        return true;
      });
      return [...masterPerformanceIndicatorsToAdd, ...masterPerformanceIndicatorCollection];
    }
    return masterPerformanceIndicatorCollection;
  }

  protected convertDateFromClient<
    T extends IMasterPerformanceIndicator | NewMasterPerformanceIndicator | PartialUpdateMasterPerformanceIndicator
  >(masterPerformanceIndicator: T): RestOf<T> {
    return {
      ...masterPerformanceIndicator,
      lastModified: masterPerformanceIndicator.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restMasterPerformanceIndicator: RestMasterPerformanceIndicator): IMasterPerformanceIndicator {
    return {
      ...restMasterPerformanceIndicator,
      lastModified: restMasterPerformanceIndicator.lastModified ? dayjs(restMasterPerformanceIndicator.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestMasterPerformanceIndicator>): HttpResponse<IMasterPerformanceIndicator> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(
    res: HttpResponse<RestMasterPerformanceIndicator[]>
  ): HttpResponse<IMasterPerformanceIndicator[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
