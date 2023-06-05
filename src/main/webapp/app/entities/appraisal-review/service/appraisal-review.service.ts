import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAppraisalReview, NewAppraisalReview } from '../appraisal-review.model';

export type PartialUpdateAppraisalReview = Partial<IAppraisalReview> & Pick<IAppraisalReview, 'id'>;

type RestOf<T extends IAppraisalReview | NewAppraisalReview> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestAppraisalReview = RestOf<IAppraisalReview>;

export type NewRestAppraisalReview = RestOf<NewAppraisalReview>;

export type PartialUpdateRestAppraisalReview = RestOf<PartialUpdateAppraisalReview>;

export type EntityResponseType = HttpResponse<IAppraisalReview>;
export type EntityArrayResponseType = HttpResponse<IAppraisalReview[]>;

@Injectable({ providedIn: 'root' })
export class AppraisalReviewService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/appraisal-reviews');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(appraisalReview: NewAppraisalReview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appraisalReview);
    return this.http
      .post<RestAppraisalReview>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(appraisalReview: IAppraisalReview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appraisalReview);
    return this.http
      .put<RestAppraisalReview>(`${this.resourceUrl}/${this.getAppraisalReviewIdentifier(appraisalReview)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(appraisalReview: PartialUpdateAppraisalReview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appraisalReview);
    return this.http
      .patch<RestAppraisalReview>(`${this.resourceUrl}/${this.getAppraisalReviewIdentifier(appraisalReview)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAppraisalReview>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAppraisalReview[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAppraisalReviewIdentifier(appraisalReview: Pick<IAppraisalReview, 'id'>): number {
    return appraisalReview.id;
  }

  compareAppraisalReview(o1: Pick<IAppraisalReview, 'id'> | null, o2: Pick<IAppraisalReview, 'id'> | null): boolean {
    return o1 && o2 ? this.getAppraisalReviewIdentifier(o1) === this.getAppraisalReviewIdentifier(o2) : o1 === o2;
  }

  addAppraisalReviewToCollectionIfMissing<Type extends Pick<IAppraisalReview, 'id'>>(
    appraisalReviewCollection: Type[],
    ...appraisalReviewsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const appraisalReviews: Type[] = appraisalReviewsToCheck.filter(isPresent);
    if (appraisalReviews.length > 0) {
      const appraisalReviewCollectionIdentifiers = appraisalReviewCollection.map(
        appraisalReviewItem => this.getAppraisalReviewIdentifier(appraisalReviewItem)!
      );
      const appraisalReviewsToAdd = appraisalReviews.filter(appraisalReviewItem => {
        const appraisalReviewIdentifier = this.getAppraisalReviewIdentifier(appraisalReviewItem);
        if (appraisalReviewCollectionIdentifiers.includes(appraisalReviewIdentifier)) {
          return false;
        }
        appraisalReviewCollectionIdentifiers.push(appraisalReviewIdentifier);
        return true;
      });
      return [...appraisalReviewsToAdd, ...appraisalReviewCollection];
    }
    return appraisalReviewCollection;
  }

  protected convertDateFromClient<T extends IAppraisalReview | NewAppraisalReview | PartialUpdateAppraisalReview>(
    appraisalReview: T
  ): RestOf<T> {
    return {
      ...appraisalReview,
      lastModified: appraisalReview.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restAppraisalReview: RestAppraisalReview): IAppraisalReview {
    return {
      ...restAppraisalReview,
      lastModified: restAppraisalReview.lastModified ? dayjs(restAppraisalReview.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAppraisalReview>): HttpResponse<IAppraisalReview> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAppraisalReview[]>): HttpResponse<IAppraisalReview[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
