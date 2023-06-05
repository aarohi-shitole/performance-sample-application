import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IMasterPerformanceIndicator } from '../master-performance-indicator.model';
import { MasterPerformanceIndicatorService } from '../service/master-performance-indicator.service';

import { MasterPerformanceIndicatorRoutingResolveService } from './master-performance-indicator-routing-resolve.service';

describe('MasterPerformanceIndicator routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: MasterPerformanceIndicatorRoutingResolveService;
  let service: MasterPerformanceIndicatorService;
  let resultMasterPerformanceIndicator: IMasterPerformanceIndicator | null | undefined;

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
    routingResolveService = TestBed.inject(MasterPerformanceIndicatorRoutingResolveService);
    service = TestBed.inject(MasterPerformanceIndicatorService);
    resultMasterPerformanceIndicator = undefined;
  });

  describe('resolve', () => {
    it('should return IMasterPerformanceIndicator returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMasterPerformanceIndicator = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMasterPerformanceIndicator).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMasterPerformanceIndicator = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultMasterPerformanceIndicator).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IMasterPerformanceIndicator>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultMasterPerformanceIndicator = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMasterPerformanceIndicator).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
