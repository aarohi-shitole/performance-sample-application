import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPerformanceIndicator } from '../performance-indicator.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../performance-indicator.test-samples';

import { PerformanceIndicatorService, RestPerformanceIndicator } from './performance-indicator.service';

const requireRestSample: RestPerformanceIndicator = {
  ...sampleWithRequiredData,
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('PerformanceIndicator Service', () => {
  let service: PerformanceIndicatorService;
  let httpMock: HttpTestingController;
  let expectedResult: IPerformanceIndicator | IPerformanceIndicator[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PerformanceIndicatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a PerformanceIndicator', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const performanceIndicator = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(performanceIndicator).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PerformanceIndicator', () => {
      const performanceIndicator = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(performanceIndicator).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PerformanceIndicator', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PerformanceIndicator', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PerformanceIndicator', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPerformanceIndicatorToCollectionIfMissing', () => {
      it('should add a PerformanceIndicator to an empty array', () => {
        const performanceIndicator: IPerformanceIndicator = sampleWithRequiredData;
        expectedResult = service.addPerformanceIndicatorToCollectionIfMissing([], performanceIndicator);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(performanceIndicator);
      });

      it('should not add a PerformanceIndicator to an array that contains it', () => {
        const performanceIndicator: IPerformanceIndicator = sampleWithRequiredData;
        const performanceIndicatorCollection: IPerformanceIndicator[] = [
          {
            ...performanceIndicator,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPerformanceIndicatorToCollectionIfMissing(performanceIndicatorCollection, performanceIndicator);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PerformanceIndicator to an array that doesn't contain it", () => {
        const performanceIndicator: IPerformanceIndicator = sampleWithRequiredData;
        const performanceIndicatorCollection: IPerformanceIndicator[] = [sampleWithPartialData];
        expectedResult = service.addPerformanceIndicatorToCollectionIfMissing(performanceIndicatorCollection, performanceIndicator);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(performanceIndicator);
      });

      it('should add only unique PerformanceIndicator to an array', () => {
        const performanceIndicatorArray: IPerformanceIndicator[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const performanceIndicatorCollection: IPerformanceIndicator[] = [sampleWithRequiredData];
        expectedResult = service.addPerformanceIndicatorToCollectionIfMissing(performanceIndicatorCollection, ...performanceIndicatorArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const performanceIndicator: IPerformanceIndicator = sampleWithRequiredData;
        const performanceIndicator2: IPerformanceIndicator = sampleWithPartialData;
        expectedResult = service.addPerformanceIndicatorToCollectionIfMissing([], performanceIndicator, performanceIndicator2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(performanceIndicator);
        expect(expectedResult).toContain(performanceIndicator2);
      });

      it('should accept null and undefined values', () => {
        const performanceIndicator: IPerformanceIndicator = sampleWithRequiredData;
        expectedResult = service.addPerformanceIndicatorToCollectionIfMissing([], null, performanceIndicator, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(performanceIndicator);
      });

      it('should return initial array if no PerformanceIndicator is added', () => {
        const performanceIndicatorCollection: IPerformanceIndicator[] = [sampleWithRequiredData];
        expectedResult = service.addPerformanceIndicatorToCollectionIfMissing(performanceIndicatorCollection, undefined, null);
        expect(expectedResult).toEqual(performanceIndicatorCollection);
      });
    });

    describe('comparePerformanceIndicator', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePerformanceIndicator(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePerformanceIndicator(entity1, entity2);
        const compareResult2 = service.comparePerformanceIndicator(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePerformanceIndicator(entity1, entity2);
        const compareResult2 = service.comparePerformanceIndicator(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePerformanceIndicator(entity1, entity2);
        const compareResult2 = service.comparePerformanceIndicator(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
