import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPerformanceAppraisal } from '../performance-appraisal.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../performance-appraisal.test-samples';

import { PerformanceAppraisalService, RestPerformanceAppraisal } from './performance-appraisal.service';

const requireRestSample: RestPerformanceAppraisal = {
  ...sampleWithRequiredData,
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('PerformanceAppraisal Service', () => {
  let service: PerformanceAppraisalService;
  let httpMock: HttpTestingController;
  let expectedResult: IPerformanceAppraisal | IPerformanceAppraisal[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PerformanceAppraisalService);
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

    it('should create a PerformanceAppraisal', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const performanceAppraisal = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(performanceAppraisal).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PerformanceAppraisal', () => {
      const performanceAppraisal = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(performanceAppraisal).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PerformanceAppraisal', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PerformanceAppraisal', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PerformanceAppraisal', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPerformanceAppraisalToCollectionIfMissing', () => {
      it('should add a PerformanceAppraisal to an empty array', () => {
        const performanceAppraisal: IPerformanceAppraisal = sampleWithRequiredData;
        expectedResult = service.addPerformanceAppraisalToCollectionIfMissing([], performanceAppraisal);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(performanceAppraisal);
      });

      it('should not add a PerformanceAppraisal to an array that contains it', () => {
        const performanceAppraisal: IPerformanceAppraisal = sampleWithRequiredData;
        const performanceAppraisalCollection: IPerformanceAppraisal[] = [
          {
            ...performanceAppraisal,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPerformanceAppraisalToCollectionIfMissing(performanceAppraisalCollection, performanceAppraisal);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PerformanceAppraisal to an array that doesn't contain it", () => {
        const performanceAppraisal: IPerformanceAppraisal = sampleWithRequiredData;
        const performanceAppraisalCollection: IPerformanceAppraisal[] = [sampleWithPartialData];
        expectedResult = service.addPerformanceAppraisalToCollectionIfMissing(performanceAppraisalCollection, performanceAppraisal);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(performanceAppraisal);
      });

      it('should add only unique PerformanceAppraisal to an array', () => {
        const performanceAppraisalArray: IPerformanceAppraisal[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const performanceAppraisalCollection: IPerformanceAppraisal[] = [sampleWithRequiredData];
        expectedResult = service.addPerformanceAppraisalToCollectionIfMissing(performanceAppraisalCollection, ...performanceAppraisalArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const performanceAppraisal: IPerformanceAppraisal = sampleWithRequiredData;
        const performanceAppraisal2: IPerformanceAppraisal = sampleWithPartialData;
        expectedResult = service.addPerformanceAppraisalToCollectionIfMissing([], performanceAppraisal, performanceAppraisal2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(performanceAppraisal);
        expect(expectedResult).toContain(performanceAppraisal2);
      });

      it('should accept null and undefined values', () => {
        const performanceAppraisal: IPerformanceAppraisal = sampleWithRequiredData;
        expectedResult = service.addPerformanceAppraisalToCollectionIfMissing([], null, performanceAppraisal, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(performanceAppraisal);
      });

      it('should return initial array if no PerformanceAppraisal is added', () => {
        const performanceAppraisalCollection: IPerformanceAppraisal[] = [sampleWithRequiredData];
        expectedResult = service.addPerformanceAppraisalToCollectionIfMissing(performanceAppraisalCollection, undefined, null);
        expect(expectedResult).toEqual(performanceAppraisalCollection);
      });
    });

    describe('comparePerformanceAppraisal', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePerformanceAppraisal(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePerformanceAppraisal(entity1, entity2);
        const compareResult2 = service.comparePerformanceAppraisal(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePerformanceAppraisal(entity1, entity2);
        const compareResult2 = service.comparePerformanceAppraisal(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePerformanceAppraisal(entity1, entity2);
        const compareResult2 = service.comparePerformanceAppraisal(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
