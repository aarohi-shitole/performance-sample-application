import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PerformanceReviewFormService } from './performance-review-form.service';
import { PerformanceReviewService } from '../service/performance-review.service';
import { IPerformanceReview } from '../performance-review.model';
import { IPerformanceIndicator } from 'app/entities/performance-indicator/performance-indicator.model';
import { PerformanceIndicatorService } from 'app/entities/performance-indicator/service/performance-indicator.service';

import { PerformanceReviewUpdateComponent } from './performance-review-update.component';

describe('PerformanceReview Management Update Component', () => {
  let comp: PerformanceReviewUpdateComponent;
  let fixture: ComponentFixture<PerformanceReviewUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let performanceReviewFormService: PerformanceReviewFormService;
  let performanceReviewService: PerformanceReviewService;
  let performanceIndicatorService: PerformanceIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PerformanceReviewUpdateComponent],
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
      .overrideTemplate(PerformanceReviewUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PerformanceReviewUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    performanceReviewFormService = TestBed.inject(PerformanceReviewFormService);
    performanceReviewService = TestBed.inject(PerformanceReviewService);
    performanceIndicatorService = TestBed.inject(PerformanceIndicatorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PerformanceIndicator query and add missing value', () => {
      const performanceReview: IPerformanceReview = { id: 456 };
      const performanceIndicator: IPerformanceIndicator = { id: 7219 };
      performanceReview.performanceIndicator = performanceIndicator;

      const performanceIndicatorCollection: IPerformanceIndicator[] = [{ id: 32913 }];
      jest.spyOn(performanceIndicatorService, 'query').mockReturnValue(of(new HttpResponse({ body: performanceIndicatorCollection })));
      const additionalPerformanceIndicators = [performanceIndicator];
      const expectedCollection: IPerformanceIndicator[] = [...additionalPerformanceIndicators, ...performanceIndicatorCollection];
      jest.spyOn(performanceIndicatorService, 'addPerformanceIndicatorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ performanceReview });
      comp.ngOnInit();

      expect(performanceIndicatorService.query).toHaveBeenCalled();
      expect(performanceIndicatorService.addPerformanceIndicatorToCollectionIfMissing).toHaveBeenCalledWith(
        performanceIndicatorCollection,
        ...additionalPerformanceIndicators.map(expect.objectContaining)
      );
      expect(comp.performanceIndicatorsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const performanceReview: IPerformanceReview = { id: 456 };
      const performanceIndicator: IPerformanceIndicator = { id: 75504 };
      performanceReview.performanceIndicator = performanceIndicator;

      activatedRoute.data = of({ performanceReview });
      comp.ngOnInit();

      expect(comp.performanceIndicatorsSharedCollection).toContain(performanceIndicator);
      expect(comp.performanceReview).toEqual(performanceReview);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPerformanceReview>>();
      const performanceReview = { id: 123 };
      jest.spyOn(performanceReviewFormService, 'getPerformanceReview').mockReturnValue(performanceReview);
      jest.spyOn(performanceReviewService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ performanceReview });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: performanceReview }));
      saveSubject.complete();

      // THEN
      expect(performanceReviewFormService.getPerformanceReview).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(performanceReviewService.update).toHaveBeenCalledWith(expect.objectContaining(performanceReview));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPerformanceReview>>();
      const performanceReview = { id: 123 };
      jest.spyOn(performanceReviewFormService, 'getPerformanceReview').mockReturnValue({ id: null });
      jest.spyOn(performanceReviewService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ performanceReview: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: performanceReview }));
      saveSubject.complete();

      // THEN
      expect(performanceReviewFormService.getPerformanceReview).toHaveBeenCalled();
      expect(performanceReviewService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPerformanceReview>>();
      const performanceReview = { id: 123 };
      jest.spyOn(performanceReviewService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ performanceReview });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(performanceReviewService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePerformanceIndicator', () => {
      it('Should forward to performanceIndicatorService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(performanceIndicatorService, 'comparePerformanceIndicator');
        comp.comparePerformanceIndicator(entity, entity2);
        expect(performanceIndicatorService.comparePerformanceIndicator).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
