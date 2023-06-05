import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAppraisalCommentsReview } from '../appraisal-comments-review.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../appraisal-comments-review.test-samples';

import { AppraisalCommentsReviewService, RestAppraisalCommentsReview } from './appraisal-comments-review.service';

const requireRestSample: RestAppraisalCommentsReview = {
  ...sampleWithRequiredData,
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('AppraisalCommentsReview Service', () => {
  let service: AppraisalCommentsReviewService;
  let httpMock: HttpTestingController;
  let expectedResult: IAppraisalCommentsReview | IAppraisalCommentsReview[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AppraisalCommentsReviewService);
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

    it('should create a AppraisalCommentsReview', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const appraisalCommentsReview = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(appraisalCommentsReview).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AppraisalCommentsReview', () => {
      const appraisalCommentsReview = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(appraisalCommentsReview).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AppraisalCommentsReview', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AppraisalCommentsReview', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AppraisalCommentsReview', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAppraisalCommentsReviewToCollectionIfMissing', () => {
      it('should add a AppraisalCommentsReview to an empty array', () => {
        const appraisalCommentsReview: IAppraisalCommentsReview = sampleWithRequiredData;
        expectedResult = service.addAppraisalCommentsReviewToCollectionIfMissing([], appraisalCommentsReview);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(appraisalCommentsReview);
      });

      it('should not add a AppraisalCommentsReview to an array that contains it', () => {
        const appraisalCommentsReview: IAppraisalCommentsReview = sampleWithRequiredData;
        const appraisalCommentsReviewCollection: IAppraisalCommentsReview[] = [
          {
            ...appraisalCommentsReview,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAppraisalCommentsReviewToCollectionIfMissing(
          appraisalCommentsReviewCollection,
          appraisalCommentsReview
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AppraisalCommentsReview to an array that doesn't contain it", () => {
        const appraisalCommentsReview: IAppraisalCommentsReview = sampleWithRequiredData;
        const appraisalCommentsReviewCollection: IAppraisalCommentsReview[] = [sampleWithPartialData];
        expectedResult = service.addAppraisalCommentsReviewToCollectionIfMissing(
          appraisalCommentsReviewCollection,
          appraisalCommentsReview
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(appraisalCommentsReview);
      });

      it('should add only unique AppraisalCommentsReview to an array', () => {
        const appraisalCommentsReviewArray: IAppraisalCommentsReview[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const appraisalCommentsReviewCollection: IAppraisalCommentsReview[] = [sampleWithRequiredData];
        expectedResult = service.addAppraisalCommentsReviewToCollectionIfMissing(
          appraisalCommentsReviewCollection,
          ...appraisalCommentsReviewArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const appraisalCommentsReview: IAppraisalCommentsReview = sampleWithRequiredData;
        const appraisalCommentsReview2: IAppraisalCommentsReview = sampleWithPartialData;
        expectedResult = service.addAppraisalCommentsReviewToCollectionIfMissing([], appraisalCommentsReview, appraisalCommentsReview2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(appraisalCommentsReview);
        expect(expectedResult).toContain(appraisalCommentsReview2);
      });

      it('should accept null and undefined values', () => {
        const appraisalCommentsReview: IAppraisalCommentsReview = sampleWithRequiredData;
        expectedResult = service.addAppraisalCommentsReviewToCollectionIfMissing([], null, appraisalCommentsReview, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(appraisalCommentsReview);
      });

      it('should return initial array if no AppraisalCommentsReview is added', () => {
        const appraisalCommentsReviewCollection: IAppraisalCommentsReview[] = [sampleWithRequiredData];
        expectedResult = service.addAppraisalCommentsReviewToCollectionIfMissing(appraisalCommentsReviewCollection, undefined, null);
        expect(expectedResult).toEqual(appraisalCommentsReviewCollection);
      });
    });

    describe('compareAppraisalCommentsReview', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAppraisalCommentsReview(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAppraisalCommentsReview(entity1, entity2);
        const compareResult2 = service.compareAppraisalCommentsReview(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAppraisalCommentsReview(entity1, entity2);
        const compareResult2 = service.compareAppraisalCommentsReview(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAppraisalCommentsReview(entity1, entity2);
        const compareResult2 = service.compareAppraisalCommentsReview(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
