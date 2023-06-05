import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MasterPerformanceIndicatorFormService } from './master-performance-indicator-form.service';
import { MasterPerformanceIndicatorService } from '../service/master-performance-indicator.service';
import { IMasterPerformanceIndicator } from '../master-performance-indicator.model';

import { MasterPerformanceIndicatorUpdateComponent } from './master-performance-indicator-update.component';

describe('MasterPerformanceIndicator Management Update Component', () => {
  let comp: MasterPerformanceIndicatorUpdateComponent;
  let fixture: ComponentFixture<MasterPerformanceIndicatorUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let masterPerformanceIndicatorFormService: MasterPerformanceIndicatorFormService;
  let masterPerformanceIndicatorService: MasterPerformanceIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MasterPerformanceIndicatorUpdateComponent],
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
      .overrideTemplate(MasterPerformanceIndicatorUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MasterPerformanceIndicatorUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    masterPerformanceIndicatorFormService = TestBed.inject(MasterPerformanceIndicatorFormService);
    masterPerformanceIndicatorService = TestBed.inject(MasterPerformanceIndicatorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const masterPerformanceIndicator: IMasterPerformanceIndicator = { id: 456 };

      activatedRoute.data = of({ masterPerformanceIndicator });
      comp.ngOnInit();

      expect(comp.masterPerformanceIndicator).toEqual(masterPerformanceIndicator);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMasterPerformanceIndicator>>();
      const masterPerformanceIndicator = { id: 123 };
      jest.spyOn(masterPerformanceIndicatorFormService, 'getMasterPerformanceIndicator').mockReturnValue(masterPerformanceIndicator);
      jest.spyOn(masterPerformanceIndicatorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ masterPerformanceIndicator });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: masterPerformanceIndicator }));
      saveSubject.complete();

      // THEN
      expect(masterPerformanceIndicatorFormService.getMasterPerformanceIndicator).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(masterPerformanceIndicatorService.update).toHaveBeenCalledWith(expect.objectContaining(masterPerformanceIndicator));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMasterPerformanceIndicator>>();
      const masterPerformanceIndicator = { id: 123 };
      jest.spyOn(masterPerformanceIndicatorFormService, 'getMasterPerformanceIndicator').mockReturnValue({ id: null });
      jest.spyOn(masterPerformanceIndicatorService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ masterPerformanceIndicator: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: masterPerformanceIndicator }));
      saveSubject.complete();

      // THEN
      expect(masterPerformanceIndicatorFormService.getMasterPerformanceIndicator).toHaveBeenCalled();
      expect(masterPerformanceIndicatorService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMasterPerformanceIndicator>>();
      const masterPerformanceIndicator = { id: 123 };
      jest.spyOn(masterPerformanceIndicatorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ masterPerformanceIndicator });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(masterPerformanceIndicatorService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
