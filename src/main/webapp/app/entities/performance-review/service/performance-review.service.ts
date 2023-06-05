import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPerformanceReview, NewPerformanceReview } from '../performance-review.model';

export type PartialUpdatePerformanceReview = Partial<IPerformanceReview> & Pick<IPerformanceReview, 'id'>;

type RestOf<T extends IPerformanceReview | NewPerformanceReview> = Omit<
  T,
  'submissionDate' | 'appraisalDate' | 'reviewDate' | 'lastModified'
> & {
  submissionDate?: string | null;
  appraisalDate?: string | null;
  reviewDate?: string | null;
  lastModified?: string | null;
};

export type RestPerformanceReview = RestOf<IPerformanceReview>;

export type NewRestPerformanceReview = RestOf<NewPerformanceReview>;

export type PartialUpdateRestPerformanceReview = RestOf<PartialUpdatePerformanceReview>;

export type EntityResponseType = HttpResponse<IPerformanceReview>;
export type EntityArrayResponseType = HttpResponse<IPerformanceReview[]>;

@Injectable({ providedIn: 'root' })
export class PerformanceReviewService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/performance-reviews');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(performanceReview: NewPerformanceReview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(performanceReview);
    return this.http
      .post<RestPerformanceReview>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(performanceReview: IPerformanceReview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(performanceReview);
    return this.http
      .put<RestPerformanceReview>(`${this.resourceUrl}/${this.getPerformanceReviewIdentifier(performanceReview)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(performanceReview: PartialUpdatePerformanceReview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(performanceReview);
    return this.http
      .patch<RestPerformanceReview>(`${this.resourceUrl}/${this.getPerformanceReviewIdentifier(performanceReview)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPerformanceReview>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPerformanceReview[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPerformanceReviewIdentifier(performanceReview: Pick<IPerformanceReview, 'id'>): number {
    return performanceReview.id;
  }

  comparePerformanceReview(o1: Pick<IPerformanceReview, 'id'> | null, o2: Pick<IPerformanceReview, 'id'> | null): boolean {
    return o1 && o2 ? this.getPerformanceReviewIdentifier(o1) === this.getPerformanceReviewIdentifier(o2) : o1 === o2;
  }

  addPerformanceReviewToCollectionIfMissing<Type extends Pick<IPerformanceReview, 'id'>>(
    performanceReviewCollection: Type[],
    ...performanceReviewsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const performanceReviews: Type[] = performanceReviewsToCheck.filter(isPresent);
    if (performanceReviews.length > 0) {
      const performanceReviewCollectionIdentifiers = performanceReviewCollection.map(
        performanceReviewItem => this.getPerformanceReviewIdentifier(performanceReviewItem)!
      );
      const performanceReviewsToAdd = performanceReviews.filter(performanceReviewItem => {
        const performanceReviewIdentifier = this.getPerformanceReviewIdentifier(performanceReviewItem);
        if (performanceReviewCollectionIdentifiers.includes(performanceReviewIdentifier)) {
          return false;
        }
        performanceReviewCollectionIdentifiers.push(performanceReviewIdentifier);
        return true;
      });
      return [...performanceReviewsToAdd, ...performanceReviewCollection];
    }
    return performanceReviewCollection;
  }

  protected convertDateFromClient<T extends IPerformanceReview | NewPerformanceReview | PartialUpdatePerformanceReview>(
    performanceReview: T
  ): RestOf<T> {
    return {
      ...performanceReview,
      submissionDate: performanceReview.submissionDate?.toJSON() ?? null,
      appraisalDate: performanceReview.appraisalDate?.toJSON() ?? null,
      reviewDate: performanceReview.reviewDate?.toJSON() ?? null,
      lastModified: performanceReview.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restPerformanceReview: RestPerformanceReview): IPerformanceReview {
    return {
      ...restPerformanceReview,
      submissionDate: restPerformanceReview.submissionDate ? dayjs(restPerformanceReview.submissionDate) : undefined,
      appraisalDate: restPerformanceReview.appraisalDate ? dayjs(restPerformanceReview.appraisalDate) : undefined,
      reviewDate: restPerformanceReview.reviewDate ? dayjs(restPerformanceReview.reviewDate) : undefined,
      lastModified: restPerformanceReview.lastModified ? dayjs(restPerformanceReview.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPerformanceReview>): HttpResponse<IPerformanceReview> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPerformanceReview[]>): HttpResponse<IPerformanceReview[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
