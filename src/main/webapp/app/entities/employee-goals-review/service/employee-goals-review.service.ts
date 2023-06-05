import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmployeeGoalsReview, NewEmployeeGoalsReview } from '../employee-goals-review.model';

export type PartialUpdateEmployeeGoalsReview = Partial<IEmployeeGoalsReview> & Pick<IEmployeeGoalsReview, 'id'>;

type RestOf<T extends IEmployeeGoalsReview | NewEmployeeGoalsReview> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestEmployeeGoalsReview = RestOf<IEmployeeGoalsReview>;

export type NewRestEmployeeGoalsReview = RestOf<NewEmployeeGoalsReview>;

export type PartialUpdateRestEmployeeGoalsReview = RestOf<PartialUpdateEmployeeGoalsReview>;

export type EntityResponseType = HttpResponse<IEmployeeGoalsReview>;
export type EntityArrayResponseType = HttpResponse<IEmployeeGoalsReview[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeGoalsReviewService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/employee-goals-reviews');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(employeeGoalsReview: NewEmployeeGoalsReview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employeeGoalsReview);
    return this.http
      .post<RestEmployeeGoalsReview>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(employeeGoalsReview: IEmployeeGoalsReview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employeeGoalsReview);
    return this.http
      .put<RestEmployeeGoalsReview>(`${this.resourceUrl}/${this.getEmployeeGoalsReviewIdentifier(employeeGoalsReview)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(employeeGoalsReview: PartialUpdateEmployeeGoalsReview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employeeGoalsReview);
    return this.http
      .patch<RestEmployeeGoalsReview>(`${this.resourceUrl}/${this.getEmployeeGoalsReviewIdentifier(employeeGoalsReview)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestEmployeeGoalsReview>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestEmployeeGoalsReview[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEmployeeGoalsReviewIdentifier(employeeGoalsReview: Pick<IEmployeeGoalsReview, 'id'>): number {
    return employeeGoalsReview.id;
  }

  compareEmployeeGoalsReview(o1: Pick<IEmployeeGoalsReview, 'id'> | null, o2: Pick<IEmployeeGoalsReview, 'id'> | null): boolean {
    return o1 && o2 ? this.getEmployeeGoalsReviewIdentifier(o1) === this.getEmployeeGoalsReviewIdentifier(o2) : o1 === o2;
  }

  addEmployeeGoalsReviewToCollectionIfMissing<Type extends Pick<IEmployeeGoalsReview, 'id'>>(
    employeeGoalsReviewCollection: Type[],
    ...employeeGoalsReviewsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const employeeGoalsReviews: Type[] = employeeGoalsReviewsToCheck.filter(isPresent);
    if (employeeGoalsReviews.length > 0) {
      const employeeGoalsReviewCollectionIdentifiers = employeeGoalsReviewCollection.map(
        employeeGoalsReviewItem => this.getEmployeeGoalsReviewIdentifier(employeeGoalsReviewItem)!
      );
      const employeeGoalsReviewsToAdd = employeeGoalsReviews.filter(employeeGoalsReviewItem => {
        const employeeGoalsReviewIdentifier = this.getEmployeeGoalsReviewIdentifier(employeeGoalsReviewItem);
        if (employeeGoalsReviewCollectionIdentifiers.includes(employeeGoalsReviewIdentifier)) {
          return false;
        }
        employeeGoalsReviewCollectionIdentifiers.push(employeeGoalsReviewIdentifier);
        return true;
      });
      return [...employeeGoalsReviewsToAdd, ...employeeGoalsReviewCollection];
    }
    return employeeGoalsReviewCollection;
  }

  protected convertDateFromClient<T extends IEmployeeGoalsReview | NewEmployeeGoalsReview | PartialUpdateEmployeeGoalsReview>(
    employeeGoalsReview: T
  ): RestOf<T> {
    return {
      ...employeeGoalsReview,
      lastModified: employeeGoalsReview.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restEmployeeGoalsReview: RestEmployeeGoalsReview): IEmployeeGoalsReview {
    return {
      ...restEmployeeGoalsReview,
      lastModified: restEmployeeGoalsReview.lastModified ? dayjs(restEmployeeGoalsReview.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestEmployeeGoalsReview>): HttpResponse<IEmployeeGoalsReview> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestEmployeeGoalsReview[]>): HttpResponse<IEmployeeGoalsReview[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
