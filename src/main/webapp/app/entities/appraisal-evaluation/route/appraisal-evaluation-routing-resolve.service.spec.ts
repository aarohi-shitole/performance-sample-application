import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IAppraisalEvaluation } from '../appraisal-evaluation.model';
import { AppraisalEvaluationService } from '../service/appraisal-evaluation.service';

import { AppraisalEvaluationRoutingResolveService } from './appraisal-evaluation-routing-resolve.service';

describe('AppraisalEvaluation routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: AppraisalEvaluationRoutingResolveService;
  let service: AppraisalEvaluationService;
  let resultAppraisalEvaluation: IAppraisalEvaluation | null | undefined;

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
    routingResolveService = TestBed.inject(AppraisalEvaluationRoutingResolveService);
    service = TestBed.inject(AppraisalEvaluationService);
    resultAppraisalEvaluation = undefined;
  });

  describe('resolve', () => {
    it('should return IAppraisalEvaluation returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAppraisalEvaluation = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAppraisalEvaluation).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAppraisalEvaluation = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultAppraisalEvaluation).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IAppraisalEvaluation>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAppraisalEvaluation = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAppraisalEvaluation).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
