import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PerformanceIndicatorFormService } from './performance-indicator-form.service';
import { PerformanceIndicatorService } from '../service/performance-indicator.service';
import { IPerformanceIndicator } from '../performance-indicator.model';
import { IMasterPerformanceIndicator } from 'app/entities/master-performance-indicator/master-performance-indicator.model';
import { MasterPerformanceIndicatorService } from 'app/entities/master-performance-indicator/service/master-performance-indicator.service';

import { PerformanceIndicatorUpdateComponent } from './performance-indicator-update.component';

describe('PerformanceIndicator Management Update Component', () => {
  let comp: PerformanceIndicatorUpdateComponent;
  let fixture: ComponentFixture<PerformanceIndicatorUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let performanceIndicatorFormService: PerformanceIndicatorFormService;
  let performanceIndicatorService: PerformanceIndicatorService;
  let masterPerformanceIndicatorService: MasterPerformanceIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PerformanceIndicatorUpdateComponent],
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
      .overrideTemplate(PerformanceIndicatorUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PerformanceIndicatorUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    performanceIndicatorFormService = TestBed.inject(PerformanceIndicatorFormService);
    performanceIndicatorService = TestBed.inject(PerformanceIndicatorService);
    masterPerformanceIndicatorService = TestBed.inject(MasterPerformanceIndicatorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call MasterPerformanceIndicator query and add missing value', () => {
      const performanceIndicator: IPerformanceIndicator = { id: 456 };
      const masterPerformanceIndicator: IMasterPerformanceIndicator = { id: 19540 };
      performanceIndicator.masterPerformanceIndicator = masterPerformanceIndicator;

      const masterPerformanceIndicatorCollection: IMasterPerformanceIndicator[] = [{ id: 76165 }];
      jest
        .spyOn(masterPerformanceIndicatorService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: masterPerformanceIndicatorCollection })));
      const additionalMasterPerformanceIndicators = [masterPerformanceIndicator];
      const expectedCollection: IMasterPerformanceIndicator[] = [
        ...additionalMasterPerformanceIndicators,
        ...masterPerformanceIndicatorCollection,
      ];
      jest
        .spyOn(masterPerformanceIndicatorService, 'addMasterPerformanceIndicatorToCollectionIfMissing')
        .mockReturnValue(expectedCollection);

      activatedRoute.data = of({ performanceIndicator });
      comp.ngOnInit();

      expect(masterPerformanceIndicatorService.query).toHaveBeenCalled();
      expect(masterPerformanceIndicatorService.addMasterPerformanceIndicatorToCollectionIfMissing).toHaveBeenCalledWith(
        masterPerformanceIndicatorCollection,
        ...additionalMasterPerformanceIndicators.map(expect.objectContaining)
      );
      expect(comp.masterPerformanceIndicatorsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const performanceIndicator: IPerformanceIndicator = { id: 456 };
      const masterPerformanceIndicator: IMasterPerformanceIndicator = { id: 92582 };
      performanceIndicator.masterPerformanceIndicator = masterPerformanceIndicator;

      activatedRoute.data = of({ performanceIndicator });
      comp.ngOnInit();

      expect(comp.masterPerformanceIndicatorsSharedCollection).toContain(masterPerformanceIndicator);
      expect(comp.performanceIndicator).toEqual(performanceIndicator);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPerformanceIndicator>>();
      const performanceIndicator = { id: 123 };
      jest.spyOn(performanceIndicatorFormService, 'getPerformanceIndicator').mockReturnValue(performanceIndicator);
      jest.spyOn(performanceIndicatorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ performanceIndicator });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: performanceIndicator }));
      saveSubject.complete();

      // THEN
      expect(performanceIndicatorFormService.getPerformanceIndicator).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(performanceIndicatorService.update).toHaveBeenCalledWith(expect.objectContaining(performanceIndicator));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPerformanceIndicator>>();
      const performanceIndicator = { id: 123 };
      jest.spyOn(performanceIndicatorFormService, 'getPerformanceIndicator').mockReturnValue({ id: null });
      jest.spyOn(performanceIndicatorService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ performanceIndicator: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: performanceIndicator }));
      saveSubject.complete();

      // THEN
      expect(performanceIndicatorFormService.getPerformanceIndicator).toHaveBeenCalled();
      expect(performanceIndicatorService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPerformanceIndicator>>();
      const performanceIndicator = { id: 123 };
      jest.spyOn(performanceIndicatorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ performanceIndicator });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(performanceIndicatorService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareMasterPerformanceIndicator', () => {
      it('Should forward to masterPerformanceIndicatorService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(masterPerformanceIndicatorService, 'compareMasterPerformanceIndicator');
        comp.compareMasterPerformanceIndicator(entity, entity2);
        expect(masterPerformanceIndicatorService.compareMasterPerformanceIndicator).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
