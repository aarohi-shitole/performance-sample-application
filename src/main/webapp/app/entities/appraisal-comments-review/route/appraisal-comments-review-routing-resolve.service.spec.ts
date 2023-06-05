import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IAppraisalCommentsReview } from '../appraisal-comments-review.model';
import { AppraisalCommentsReviewService } from '../service/appraisal-comments-review.service';

import { AppraisalCommentsReviewRoutingResolveService } from './appraisal-comments-review-routing-resolve.service';

describe('AppraisalCommentsReview routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: AppraisalCommentsReviewRoutingResolveService;
  let service: AppraisalCommentsReviewService;
  let resultAppraisalCommentsReview: IAppraisalCommentsReview | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(AppraisalCommentsReviewRoutingResolveService);
    service = TestBed.inject(AppraisalCommentsReviewService);
    resultAppraisalCommentsReview = undefined;
  });

  describe('resolve', () => {
    it('should return IAppraisalCommentsReview returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAppraisalCommentsReview = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAppraisalCommentsReview).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAppraisalCommentsReview = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultAppraisalCommentsReview).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IAppraisalCommentsReview>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAppraisalCommentsReview = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAppraisalCommentsReview).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
