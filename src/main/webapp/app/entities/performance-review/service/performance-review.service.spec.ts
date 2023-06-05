import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPerformanceReview } from '../performance-review.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../performance-review.test-samples';

import { PerformanceReviewService, RestPerformanceReview } from './performance-review.service';

const requireRestSample: RestPerformanceReview = {
  ...sampleWithRequiredData,
  submissionDate: sampleWithRequiredData.submissionDate?.toJSON(),
  appraisalDate: sampleWithRequiredData.appraisalDate?.toJSON(),
  reviewDate: sampleWithRequiredData.reviewDate?.toJSON(),
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('PerformanceReview Service', () => {
  let service: PerformanceReviewService;
  let httpMock: HttpTestingController;
  let expectedResult: IPerformanceReview | IPerformanceReview[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PerformanceReviewService);
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

    it('should create a PerformanceReview', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const performanceReview = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(performanceReview).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PerformanceReview', () => {
      const performanceReview = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(performanceReview).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PerformanceReview', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PerformanceReview', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PerformanceReview', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPerformanceReviewToCollectionIfMissing', () => {
      it('should add a PerformanceReview to an empty array', () => {
        const performanceReview: IPerformanceReview = sampleWithRequiredData;
        expectedResult = service.addPerformanceReviewToCollectionIfMissing([], performanceReview);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(performanceReview);
      });

      it('should not add a PerformanceReview to an array that contains it', () => {
        const performanceReview: IPerformanceReview = sampleWithRequiredData;
        const performanceReviewCollection: IPerformanceReview[] = [
          {
            ...performanceReview,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPerformanceReviewToCollectionIfMissing(performanceReviewCollection, performanceReview);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PerformanceReview to an array that doesn't contain it", () => {
        const performanceReview: IPerformanceReview = sampleWithRequiredData;
        const performanceReviewCollection: IPerformanceReview[] = [sampleWithPartialData];
        expectedResult = service.addPerformanceReviewToCollectionIfMissing(performanceReviewCollection, performanceReview);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(performanceReview);
      });

      it('should add only unique PerformanceReview to an array', () => {
        const performanceReviewArray: IPerformanceReview[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const performanceReviewCollection: IPerformanceReview[] = [sampleWithRequiredData];
        expectedResult = service.addPerformanceReviewToCollectionIfMissing(performanceReviewCollection, ...performanceReviewArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const performanceReview: IPerformanceReview = sampleWithRequiredData;
        const performanceReview2: IPerformanceReview = sampleWithPartialData;
        expectedResult = service.addPerformanceReviewToCollectionIfMissing([], performanceReview, performanceReview2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(performanceReview);
        expect(expectedResult).toContain(performanceReview2);
      });

      it('should accept null and undefined values', () => {
        const performanceReview: IPerformanceReview = sampleWithRequiredData;
        expectedResult = service.addPerformanceReviewToCollectionIfMissing([], null, performanceReview, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(performanceReview);
      });

      it('should return initial array if no PerformanceReview is added', () => {
        const performanceReviewCollection: IPerformanceReview[] = [sampleWithRequiredData];
        expectedResult = service.addPerformanceReviewToCollectionIfMissing(performanceReviewCollection, undefined, null);
        expect(expectedResult).toEqual(performanceReviewCollection);
      });
    });

    describe('comparePerformanceReview', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePerformanceReview(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePerformanceReview(entity1, entity2);
        const compareResult2 = service.comparePerformanceReview(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePerformanceReview(entity1, entity2);
        const compareResult2 = service.comparePerformanceReview(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePerformanceReview(entity1, entity2);
        const compareResult2 = service.comparePerformanceReview(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
