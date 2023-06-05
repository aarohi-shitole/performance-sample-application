import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IAppraisalEvaluationParameter } from '../appraisal-evaluation-parameter.model';
import { AppraisalEvaluationParameterService } from '../service/appraisal-evaluation-parameter.service';

import { AppraisalEvaluationParameterRoutingResolveService } from './appraisal-evaluation-parameter-routing-resolve.service';

describe('AppraisalEvaluationParameter routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: AppraisalEvaluationParameterRoutingResolveService;
  let service: AppraisalEvaluationParameterService;
  let resultAppraisalEvaluationParameter: IAppraisalEvaluationParameter | null | undefined;

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
    routingResolveService = TestBed.inject(AppraisalEvaluationParameterRoutingResolveService);
    service = TestBed.inject(AppraisalEvaluationParameterService);
    resultAppraisalEvaluationParameter = undefined;
  });

  describe('resolve', () => {
    it('should return IAppraisalEvaluationParameter returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAppraisalEvaluationParameter = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAppraisalEvaluationParameter).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAppraisalEvaluationParameter = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultAppraisalEvaluationParameter).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IAppraisalEvaluationParameter>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAppraisalEvaluationParameter = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAppraisalEvaluationParameter).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
