import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IEmployeeGoalsReview } from '../employee-goals-review.model';
import { EmployeeGoalsReviewService } from '../service/employee-goals-review.service';

import { EmployeeGoalsReviewRoutingResolveService } from './employee-goals-review-routing-resolve.service';

describe('EmployeeGoalsReview routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: EmployeeGoalsReviewRoutingResolveService;
  let service: EmployeeGoalsReviewService;
  let resultEmployeeGoalsReview: IEmployeeGoalsReview | null | undefined;

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
    routingResolveService = TestBed.inject(EmployeeGoalsReviewRoutingResolveService);
    service = TestBed.inject(EmployeeGoalsReviewService);
    resultEmployeeGoalsReview = undefined;
  });

  describe('resolve', () => {
    it('should return IEmployeeGoalsReview returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEmployeeGoalsReview = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEmployeeGoalsReview).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEmployeeGoalsReview = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultEmployeeGoalsReview).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IEmployeeGoalsReview>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEmployeeGoalsReview = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEmployeeGoalsReview).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
