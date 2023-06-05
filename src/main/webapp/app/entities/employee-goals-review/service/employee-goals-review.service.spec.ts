import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEmployeeGoalsReview } from '../employee-goals-review.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../employee-goals-review.test-samples';

import { EmployeeGoalsReviewService, RestEmployeeGoalsReview } from './employee-goals-review.service';

const requireRestSample: RestEmployeeGoalsReview = {
  ...sampleWithRequiredData,
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('EmployeeGoalsReview Service', () => {
  let service: EmployeeGoalsReviewService;
  let httpMock: HttpTestingController;
  let expectedResult: IEmployeeGoalsReview | IEmployeeGoalsReview[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EmployeeGoalsReviewService);
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

    it('should create a EmployeeGoalsReview', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const employeeGoalsReview = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(employeeGoalsReview).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EmployeeGoalsReview', () => {
      const employeeGoalsReview = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(employeeGoalsReview).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EmployeeGoalsReview', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EmployeeGoalsReview', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EmployeeGoalsReview', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEmployeeGoalsReviewToCollectionIfMissing', () => {
      it('should add a EmployeeGoalsReview to an empty array', () => {
        const employeeGoalsReview: IEmployeeGoalsReview = sampleWithRequiredData;
        expectedResult = service.addEmployeeGoalsReviewToCollectionIfMissing([], employeeGoalsReview);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(employeeGoalsReview);
      });

      it('should not add a EmployeeGoalsReview to an array that contains it', () => {
        const employeeGoalsReview: IEmployeeGoalsReview = sampleWithRequiredData;
        const employeeGoalsReviewCollection: IEmployeeGoalsReview[] = [
          {
            ...employeeGoalsReview,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEmployeeGoalsReviewToCollectionIfMissing(employeeGoalsReviewCollection, employeeGoalsReview);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EmployeeGoalsReview to an array that doesn't contain it", () => {
        const employeeGoalsReview: IEmployeeGoalsReview = sampleWithRequiredData;
        const employeeGoalsReviewCollection: IEmployeeGoalsReview[] = [sampleWithPartialData];
        expectedResult = service.addEmployeeGoalsReviewToCollectionIfMissing(employeeGoalsReviewCollection, employeeGoalsReview);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(employeeGoalsReview);
      });

      it('should add only unique EmployeeGoalsReview to an array', () => {
        const employeeGoalsReviewArray: IEmployeeGoalsReview[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const employeeGoalsReviewCollection: IEmployeeGoalsReview[] = [sampleWithRequiredData];
        expectedResult = service.addEmployeeGoalsReviewToCollectionIfMissing(employeeGoalsReviewCollection, ...employeeGoalsReviewArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const employeeGoalsReview: IEmployeeGoalsReview = sampleWithRequiredData;
        const employeeGoalsReview2: IEmployeeGoalsReview = sampleWithPartialData;
        expectedResult = service.addEmployeeGoalsReviewToCollectionIfMissing([], employeeGoalsReview, employeeGoalsReview2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(employeeGoalsReview);
        expect(expectedResult).toContain(employeeGoalsReview2);
      });

      it('should accept null and undefined values', () => {
        const employeeGoalsReview: IEmployeeGoalsReview = sampleWithRequiredData;
        expectedResult = service.addEmployeeGoalsReviewToCollectionIfMissing([], null, employeeGoalsReview, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(employeeGoalsReview);
      });

      it('should return initial array if no EmployeeGoalsReview is added', () => {
        const employeeGoalsReviewCollection: IEmployeeGoalsReview[] = [sampleWithRequiredData];
        expectedResult = service.addEmployeeGoalsReviewToCollectionIfMissing(employeeGoalsReviewCollection, undefined, null);
        expect(expectedResult).toEqual(employeeGoalsReviewCollection);
      });
    });

    describe('compareEmployeeGoalsReview', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEmployeeGoalsReview(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEmployeeGoalsReview(entity1, entity2);
        const compareResult2 = service.compareEmployeeGoalsReview(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEmployeeGoalsReview(entity1, entity2);
        const compareResult2 = service.compareEmployeeGoalsReview(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEmployeeGoalsReview(entity1, entity2);
        const compareResult2 = service.compareEmployeeGoalsReview(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
