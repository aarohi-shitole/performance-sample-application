import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAppraisalEvaluation } from '../appraisal-evaluation.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../appraisal-evaluation.test-samples';

import { AppraisalEvaluationService, RestAppraisalEvaluation } from './appraisal-evaluation.service';

const requireRestSample: RestAppraisalEvaluation = {
  ...sampleWithRequiredData,
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('AppraisalEvaluation Service', () => {
  let service: AppraisalEvaluationService;
  let httpMock: HttpTestingController;
  let expectedResult: IAppraisalEvaluation | IAppraisalEvaluation[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AppraisalEvaluationService);
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

    it('should create a AppraisalEvaluation', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const appraisalEvaluation = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(appraisalEvaluation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AppraisalEvaluation', () => {
      const appraisalEvaluation = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(appraisalEvaluation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AppraisalEvaluation', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AppraisalEvaluation', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AppraisalEvaluation', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAppraisalEvaluationToCollectionIfMissing', () => {
      it('should add a AppraisalEvaluation to an empty array', () => {
        const appraisalEvaluation: IAppraisalEvaluation = sampleWithRequiredData;
        expectedResult = service.addAppraisalEvaluationToCollectionIfMissing([], appraisalEvaluation);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(appraisalEvaluation);
      });

      it('should not add a AppraisalEvaluation to an array that contains it', () => {
        const appraisalEvaluation: IAppraisalEvaluation = sampleWithRequiredData;
        const appraisalEvaluationCollection: IAppraisalEvaluation[] = [
          {
            ...appraisalEvaluation,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAppraisalEvaluationToCollectionIfMissing(appraisalEvaluationCollection, appraisalEvaluation);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AppraisalEvaluation to an array that doesn't contain it", () => {
        const appraisalEvaluation: IAppraisalEvaluation = sampleWithRequiredData;
        const appraisalEvaluationCollection: IAppraisalEvaluation[] = [sampleWithPartialData];
        expectedResult = service.addAppraisalEvaluationToCollectionIfMissing(appraisalEvaluationCollection, appraisalEvaluation);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(appraisalEvaluation);
      });

      it('should add only unique AppraisalEvaluation to an array', () => {
        const appraisalEvaluationArray: IAppraisalEvaluation[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const appraisalEvaluationCollection: IAppraisalEvaluation[] = [sampleWithRequiredData];
        expectedResult = service.addAppraisalEvaluationToCollectionIfMissing(appraisalEvaluationCollection, ...appraisalEvaluationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const appraisalEvaluation: IAppraisalEvaluation = sampleWithRequiredData;
        const appraisalEvaluation2: IAppraisalEvaluation = sampleWithPartialData;
        expectedResult = service.addAppraisalEvaluationToCollectionIfMissing([], appraisalEvaluation, appraisalEvaluation2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(appraisalEvaluation);
        expect(expectedResult).toContain(appraisalEvaluation2);
      });

      it('should accept null and undefined values', () => {
        const appraisalEvaluation: IAppraisalEvaluation = sampleWithRequiredData;
        expectedResult = service.addAppraisalEvaluationToCollectionIfMissing([], null, appraisalEvaluation, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(appraisalEvaluation);
      });

      it('should return initial array if no AppraisalEvaluation is added', () => {
        const appraisalEvaluationCollection: IAppraisalEvaluation[] = [sampleWithRequiredData];
        expectedResult = service.addAppraisalEvaluationToCollectionIfMissing(appraisalEvaluationCollection, undefined, null);
        expect(expectedResult).toEqual(appraisalEvaluationCollection);
      });
    });

    describe('compareAppraisalEvaluation', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAppraisalEvaluation(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAppraisalEvaluation(entity1, entity2);
        const compareResult2 = service.compareAppraisalEvaluation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAppraisalEvaluation(entity1, entity2);
        const compareResult2 = service.compareAppraisalEvaluation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAppraisalEvaluation(entity1, entity2);
        const compareResult2 = service.compareAppraisalEvaluation(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
