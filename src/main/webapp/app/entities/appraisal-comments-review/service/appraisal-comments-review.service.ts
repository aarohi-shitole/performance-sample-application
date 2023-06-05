import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAppraisalCommentsReview, NewAppraisalCommentsReview } from '../appraisal-comments-review.model';

export type PartialUpdateAppraisalCommentsReview = Partial<IAppraisalCommentsReview> & Pick<IAppraisalCommentsReview, 'id'>;

type RestOf<T extends IAppraisalCommentsReview | NewAppraisalCommentsReview> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestAppraisalCommentsReview = RestOf<IAppraisalCommentsReview>;

export type NewRestAppraisalCommentsReview = RestOf<NewAppraisalCommentsReview>;

export type PartialUpdateRestAppraisalCommentsReview = RestOf<PartialUpdateAppraisalCommentsReview>;

export type EntityResponseType = HttpResponse<IAppraisalCommentsReview>;
export type EntityArrayResponseType = HttpResponse<IAppraisalCommentsReview[]>;

@Injectable({ providedIn: 'root' })
export class AppraisalCommentsReviewService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/appraisal-comments-reviews');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(appraisalCommentsReview: NewAppraisalCommentsReview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appraisalCommentsReview);
    return this.http
      .post<RestAppraisalCommentsReview>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(appraisalCommentsReview: IAppraisalCommentsReview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appraisalCommentsReview);
    return this.http
      .put<RestAppraisalCommentsReview>(`${this.resourceUrl}/${this.getAppraisalCommentsReviewIdentifier(appraisalCommentsReview)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(appraisalCommentsReview: PartialUpdateAppraisalCommentsReview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appraisalCommentsReview);
    return this.http
      .patch<RestAppraisalCommentsReview>(
        `${this.resourceUrl}/${this.getAppraisalCommentsReviewIdentifier(appraisalCommentsReview)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAppraisalCommentsReview>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAppraisalCommentsReview[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAppraisalCommentsReviewIdentifier(appraisalCommentsReview: Pick<IAppraisalCommentsReview, 'id'>): number {
    return appraisalCommentsReview.id;
  }

  compareAppraisalCommentsReview(
    o1: Pick<IAppraisalCommentsReview, 'id'> | null,
    o2: Pick<IAppraisalCommentsReview, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getAppraisalCommentsReviewIdentifier(o1) === this.getAppraisalCommentsReviewIdentifier(o2) : o1 === o2;
  }

  addAppraisalCommentsReviewToCollectionIfMissing<Type extends Pick<IAppraisalCommentsReview, 'id'>>(
    appraisalCommentsReviewCollection: Type[],
    ...appraisalCommentsReviewsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const appraisalCommentsReviews: Type[] = appraisalCommentsReviewsToCheck.filter(isPresent);
    if (appraisalCommentsReviews.length > 0) {
      const appraisalCommentsReviewCollectionIdentifiers = appraisalCommentsReviewCollection.map(
        appraisalCommentsReviewItem => this.getAppraisalCommentsReviewIdentifier(appraisalCommentsReviewItem)!
      );
      const appraisalCommentsReviewsToAdd = appraisalCommentsReviews.filter(appraisalCommentsReviewItem => {
        const appraisalCommentsReviewIdentifier = this.getAppraisalCommentsReviewIdentifier(appraisalCommentsReviewItem);
        if (appraisalCommentsReviewCollectionIdentifiers.includes(appraisalCommentsReviewIdentifier)) {
          return false;
        }
        appraisalCommentsReviewCollectionIdentifiers.push(appraisalCommentsReviewIdentifier);
        return true;
      });
      return [...appraisalCommentsReviewsToAdd, ...appraisalCommentsReviewCollection];
    }
    return appraisalCommentsReviewCollection;
  }

  protected convertDateFromClient<T extends IAppraisalCommentsReview | NewAppraisalCommentsReview | PartialUpdateAppraisalCommentsReview>(
    appraisalCommentsReview: T
  ): RestOf<T> {
    return {
      ...appraisalCommentsReview,
      lastModified: appraisalCommentsReview.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restAppraisalCommentsReview: RestAppraisalCommentsReview): IAppraisalCommentsReview {
    return {
      ...restAppraisalCommentsReview,
      lastModified: restAppraisalCommentsReview.lastModified ? dayjs(restAppraisalCommentsReview.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAppraisalCommentsReview>): HttpResponse<IAppraisalCommentsReview> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAppraisalCommentsReview[]>): HttpResponse<IAppraisalCommentsReview[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
