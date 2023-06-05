import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMasterPerformanceIndicator } from '../master-performance-indicator.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../master-performance-indicator.test-samples';

import { MasterPerformanceIndicatorService, RestMasterPerformanceIndicator } from './master-performance-indicator.service';

const requireRestSample: RestMasterPerformanceIndicator = {
  ...sampleWithRequiredData,
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('MasterPerformanceIndicator Service', () => {
  let service: MasterPerformanceIndicatorService;
  let httpMock: HttpTestingController;
  let expectedResult: IMasterPerformanceIndicator | IMasterPerformanceIndicator[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MasterPerformanceIndicatorService);
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

    it('should create a MasterPerformanceIndicator', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const masterPerformanceIndicator = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(masterPerformanceIndicator).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MasterPerformanceIndicator', () => {
      const masterPerformanceIndicator = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(masterPerformanceIndicator).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MasterPerformanceIndicator', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MasterPerformanceIndicator', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MasterPerformanceIndicator', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMasterPerformanceIndicatorToCollectionIfMissing', () => {
      it('should add a MasterPerformanceIndicator to an empty array', () => {
        const masterPerformanceIndicator: IMasterPerformanceIndicator = sampleWithRequiredData;
        expectedResult = service.addMasterPerformanceIndicatorToCollectionIfMissing([], masterPerformanceIndicator);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(masterPerformanceIndicator);
      });

      it('should not add a MasterPerformanceIndicator to an array that contains it', () => {
        const masterPerformanceIndicator: IMasterPerformanceIndicator = sampleWithRequiredData;
        const masterPerformanceIndicatorCollection: IMasterPerformanceIndicator[] = [
          {
            ...masterPerformanceIndicator,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMasterPerformanceIndicatorToCollectionIfMissing(
          masterPerformanceIndicatorCollection,
          masterPerformanceIndicator
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MasterPerformanceIndicator to an array that doesn't contain it", () => {
        const masterPerformanceIndicator: IMasterPerformanceIndicator = sampleWithRequiredData;
        const masterPerformanceIndicatorCollection: IMasterPerformanceIndicator[] = [sampleWithPartialData];
        expectedResult = service.addMasterPerformanceIndicatorToCollectionIfMissing(
          masterPerformanceIndicatorCollection,
          masterPerformanceIndicator
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(masterPerformanceIndicator);
      });

      it('should add only unique MasterPerformanceIndicator to an array', () => {
        const masterPerformanceIndicatorArray: IMasterPerformanceIndicator[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const masterPerformanceIndicatorCollection: IMasterPerformanceIndicator[] = [sampleWithRequiredData];
        expectedResult = service.addMasterPerformanceIndicatorToCollectionIfMissing(
          masterPerformanceIndicatorCollection,
          ...masterPerformanceIndicatorArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const masterPerformanceIndicator: IMasterPerformanceIndicator = sampleWithRequiredData;
        const masterPerformanceIndicator2: IMasterPerformanceIndicator = sampleWithPartialData;
        expectedResult = service.addMasterPerformanceIndicatorToCollectionIfMissing(
          [],
          masterPerformanceIndicator,
          masterPerformanceIndicator2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(masterPerformanceIndicator);
        expect(expectedResult).toContain(masterPerformanceIndicator2);
      });

      it('should accept null and undefined values', () => {
        const masterPerformanceIndicator: IMasterPerformanceIndicator = sampleWithRequiredData;
        expectedResult = service.addMasterPerformanceIndicatorToCollectionIfMissing([], null, masterPerformanceIndicator, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(masterPerformanceIndicator);
      });

      it('should return initial array if no MasterPerformanceIndicator is added', () => {
        const masterPerformanceIndicatorCollection: IMasterPerformanceIndicator[] = [sampleWithRequiredData];
        expectedResult = service.addMasterPerformanceIndicatorToCollectionIfMissing(masterPerformanceIndicatorCollection, undefined, null);
        expect(expectedResult).toEqual(masterPerformanceIndicatorCollection);
      });
    });

    describe('compareMasterPerformanceIndicator', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMasterPerformanceIndicator(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMasterPerformanceIndicator(entity1, entity2);
        const compareResult2 = service.compareMasterPerformanceIndicator(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMasterPerformanceIndicator(entity1, entity2);
        const compareResult2 = service.compareMasterPerformanceIndicator(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMasterPerformanceIndicator(entity1, entity2);
        const compareResult2 = service.compareMasterPerformanceIndicator(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
