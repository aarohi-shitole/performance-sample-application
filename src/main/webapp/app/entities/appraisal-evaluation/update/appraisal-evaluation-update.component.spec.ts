import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AppraisalEvaluationFormService } from './appraisal-evaluation-form.service';
import { AppraisalEvaluationService } from '../service/appraisal-evaluation.service';
import { IAppraisalEvaluation } from '../appraisal-evaluation.model';
import { IAppraisalEvaluationParameter } from 'app/entities/appraisal-evaluation-parameter/appraisal-evaluation-parameter.model';
import { AppraisalEvaluationParameterService } from 'app/entities/appraisal-evaluation-parameter/service/appraisal-evaluation-parameter.service';

import { AppraisalEvaluationUpdateComponent } from './appraisal-evaluation-update.component';

describe('AppraisalEvaluation Management Update Component', () => {
  let comp: AppraisalEvaluationUpdateComponent;
  let fixture: ComponentFixture<AppraisalEvaluationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let appraisalEvaluationFormService: AppraisalEvaluationFormService;
  let appraisalEvaluationService: AppraisalEvaluationService;
  let appraisalEvaluationParameterService: AppraisalEvaluationParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AppraisalEvaluationUpdateComponent],
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
      .overrideTemplate(AppraisalEvaluationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AppraisalEvaluationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    appraisalEvaluationFormService = TestBed.inject(AppraisalEvaluationFormService);
    appraisalEvaluationService = TestBed.inject(AppraisalEvaluationService);
    appraisalEvaluationParameterService = TestBed.inject(AppraisalEvaluationParameterService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call AppraisalEvaluationParameter query and add missing value', () => {
      const appraisalEvaluation: IAppraisalEvaluation = { id: 456 };
      const appraisalEvaluationParameter: IAppraisalEvaluationParameter = { id: 68170 };
      appraisalEvaluation.appraisalEvaluationParameter = appraisalEvaluationParameter;

      const appraisalEvaluationParameterCollection: IAppraisalEvaluationParameter[] = [{ id: 52272 }];
      jest
        .spyOn(appraisalEvaluationParameterService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: appraisalEvaluationParameterCollection })));
      const additionalAppraisalEvaluationParameters = [appraisalEvaluationParameter];
      const expectedCollection: IAppraisalEvaluationParameter[] = [
        ...additionalAppraisalEvaluationParameters,
        ...appraisalEvaluationParameterCollection,
      ];
      jest
        .spyOn(appraisalEvaluationParameterService, 'addAppraisalEvaluationParameterToCollectionIfMissing')
        .mockReturnValue(expectedCollection);

      activatedRoute.data = of({ appraisalEvaluation });
      comp.ngOnInit();

      expect(appraisalEvaluationParameterService.query).toHaveBeenCalled();
      expect(appraisalEvaluationParameterService.addAppraisalEvaluationParameterToCollectionIfMissing).toHaveBeenCalledWith(
        appraisalEvaluationParameterCollection,
        ...additionalAppraisalEvaluationParameters.map(expect.objectContaining)
      );
      expect(comp.appraisalEvaluationParametersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const appraisalEvaluation: IAppraisalEvaluation = { id: 456 };
      const appraisalEvaluationParameter: IAppraisalEvaluationParameter = { id: 64858 };
      appraisalEvaluation.appraisalEvaluationParameter = appraisalEvaluationParameter;

      activatedRoute.data = of({ appraisalEvaluation });
      comp.ngOnInit();

      expect(comp.appraisalEvaluationParametersSharedCollection).toContain(appraisalEvaluationParameter);
      expect(comp.appraisalEvaluation).toEqual(appraisalEvaluation);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppraisalEvaluation>>();
      const appraisalEvaluation = { id: 123 };
      jest.spyOn(appraisalEvaluationFormService, 'getAppraisalEvaluation').mockReturnValue(appraisalEvaluation);
      jest.spyOn(appraisalEvaluationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appraisalEvaluation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appraisalEvaluation }));
      saveSubject.complete();

      // THEN
      expect(appraisalEvaluationFormService.getAppraisalEvaluation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(appraisalEvaluationService.update).toHaveBeenCalledWith(expect.objectContaining(appraisalEvaluation));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppraisalEvaluation>>();
      const appraisalEvaluation = { id: 123 };
      jest.spyOn(appraisalEvaluationFormService, 'getAppraisalEvaluation').mockReturnValue({ id: null });
      jest.spyOn(appraisalEvaluationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appraisalEvaluation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appraisalEvaluation }));
      saveSubject.complete();

      // THEN
      expect(appraisalEvaluationFormService.getAppraisalEvaluation).toHaveBeenCalled();
      expect(appraisalEvaluationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppraisalEvaluation>>();
      const appraisalEvaluation = { id: 123 };
      jest.spyOn(appraisalEvaluationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appraisalEvaluation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(appraisalEvaluationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAppraisalEvaluationParameter', () => {
      it('Should forward to appraisalEvaluationParameterService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(appraisalEvaluationParameterService, 'compareAppraisalEvaluationParameter');
        comp.compareAppraisalEvaluationParameter(entity, entity2);
        expect(appraisalEvaluationParameterService.compareAppraisalEvaluationParameter).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
