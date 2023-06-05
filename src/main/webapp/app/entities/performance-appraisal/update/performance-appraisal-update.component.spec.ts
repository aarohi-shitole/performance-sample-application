import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PerformanceAppraisalFormService } from './performance-appraisal-form.service';
import { PerformanceAppraisalService } from '../service/performance-appraisal.service';
import { IPerformanceAppraisal } from '../performance-appraisal.model';
import { IAppraisalReview } from 'app/entities/appraisal-review/appraisal-review.model';
import { AppraisalReviewService } from 'app/entities/appraisal-review/service/appraisal-review.service';

import { PerformanceAppraisalUpdateComponent } from './performance-appraisal-update.component';

describe('PerformanceAppraisal Management Update Component', () => {
  let comp: PerformanceAppraisalUpdateComponent;
  let fixture: ComponentFixture<PerformanceAppraisalUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let performanceAppraisalFormService: PerformanceAppraisalFormService;
  let performanceAppraisalService: PerformanceAppraisalService;
  let appraisalReviewService: AppraisalReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PerformanceAppraisalUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PerformanceAppraisalUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PerformanceAppraisalUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    performanceAppraisalFormService = TestBed.inject(PerformanceAppraisalFormService);
    performanceAppraisalService = TestBed.inject(PerformanceAppraisalService);
    appraisalReviewService = TestBed.inject(AppraisalReviewService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call AppraisalReview query and add missing value', () => {
      const performanceAppraisal: IPerformanceAppraisal = { id: 456 };
      const appraisalReview: IAppraisalReview = { id: 47062 };
      performanceAppraisal.appraisalReview = appraisalReview;

      const appraisalReviewCollection: IAppraisalReview[] = [{ id: 78211 }];
      jest.spyOn(appraisalReviewService, 'query').mockReturnValue(of(new HttpResponse({ body: appraisalReviewCollection })));
      const additionalAppraisalReviews = [appraisalReview];
      const expectedCollection: IAppraisalReview[] = [...additionalAppraisalReviews, ...appraisalReviewCollection];
      jest.spyOn(appraisalReviewService, 'addAppraisalReviewToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ performanceAppraisal });
      comp.ngOnInit();

      expect(appraisalReviewService.query).toHaveBeenCalled();
      expect(appraisalReviewService.addAppraisalReviewToCollectionIfMissing).toHaveBeenCalledWith(
        appraisalReviewCollection,
        ...additionalAppraisalReviews.map(expect.objectContaining)
      );
      expect(comp.appraisalReviewsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const performanceAppraisal: IPerformanceAppraisal = { id: 456 };
      const appraisalReview: IAppraisalReview = { id: 9896 };
      performanceAppraisal.appraisalReview = appraisalReview;

      activatedRoute.data = of({ performanceAppraisal });
      comp.ngOnInit();

      expect(comp.appraisalReviewsSharedCollection).toContain(appraisalReview);
      expect(comp.performanceAppraisal).toEqual(performanceAppraisal);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPerformanceAppraisal>>();
      const performanceAppraisal = { id: 123 };
      jest.spyOn(performanceAppraisalFormService, 'getPerformanceAppraisal').mockReturnValue(performanceAppraisal);
      jest.spyOn(performanceAppraisalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ performanceAppraisal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: performanceAppraisal }));
      saveSubject.complete();

      // THEN
      expect(performanceAppraisalFormService.getPerformanceAppraisal).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(performanceAppraisalService.update).toHaveBeenCalledWith(expect.objectContaining(performanceAppraisal));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPerformanceAppraisal>>();
      const performanceAppraisal = { id: 123 };
      jest.spyOn(performanceAppraisalFormService, 'getPerformanceAppraisal').mockReturnValue({ id: null });
      jest.spyOn(performanceAppraisalService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ performanceAppraisal: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: performanceAppraisal }));
      saveSubject.complete();

      // THEN
      expect(performanceAppraisalFormService.getPerformanceAppraisal).toHaveBeenCalled();
      expect(performanceAppraisalService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPerformanceAppraisal>>();
      const performanceAppraisal = { id: 123 };
      jest.spyOn(performanceAppraisalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ performanceAppraisal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(performanceAppraisalService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAppraisalReview', () => {
      it('Should forward to appraisalReviewService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(appraisalReviewService, 'compareAppraisalReview');
        comp.compareAppraisalReview(entity, entity2);
        expect(appraisalReviewService.compareAppraisalReview).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
