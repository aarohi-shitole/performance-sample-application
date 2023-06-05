import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AppraisalEvaluationParameterFormService } from './appraisal-evaluation-parameter-form.service';
import { AppraisalEvaluationParameterService } from '../service/appraisal-evaluation-parameter.service';
import { IAppraisalEvaluationParameter } from '../appraisal-evaluation-parameter.model';

import { AppraisalEvaluationParameterUpdateComponent } from './appraisal-evaluation-parameter-update.component';

describe('AppraisalEvaluationParameter Management Update Component', () => {
  let comp: AppraisalEvaluationParameterUpdateComponent;
  let fixture: ComponentFixture<AppraisalEvaluationParameterUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let appraisalEvaluationParameterFormService: AppraisalEvaluationParameterFormService;
  let appraisalEvaluationParameterService: AppraisalEvaluationParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AppraisalEvaluationParameterUpdateComponent],
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
      .overrideTemplate(AppraisalEvaluationParameterUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AppraisalEvaluationParameterUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    appraisalEvaluationParameterFormService = TestBed.inject(AppraisalEvaluationParameterFormService);
    appraisalEvaluationParameterService = TestBed.inject(AppraisalEvaluationParameterService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const appraisalEvaluationParameter: IAppraisalEvaluationParameter = { id: 456 };

      activatedRoute.data = of({ appraisalEvaluationParameter });
      comp.ngOnInit();

      expect(comp.appraisalEvaluationParameter).toEqual(appraisalEvaluationParameter);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppraisalEvaluationParameter>>();
      const appraisalEvaluationParameter = { id: 123 };
      jest.spyOn(appraisalEvaluationParameterFormService, 'getAppraisalEvaluationParameter').mockReturnValue(appraisalEvaluationParameter);
      jest.spyOn(appraisalEvaluationParameterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appraisalEvaluationParameter });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appraisalEvaluationParameter }));
      saveSubject.complete();

      // THEN
      expect(appraisalEvaluationParameterFormService.getAppraisalEvaluationParameter).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(appraisalEvaluationParameterService.update).toHaveBeenCalledWith(expect.objectContaining(appraisalEvaluationParameter));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppraisalEvaluationParameter>>();
      const appraisalEvaluationParameter = { id: 123 };
      jest.spyOn(appraisalEvaluationParameterFormService, 'getAppraisalEvaluationParameter').mockReturnValue({ id: null });
      jest.spyOn(appraisalEvaluationParameterService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appraisalEvaluationParameter: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appraisalEvaluationParameter }));
      saveSubject.complete();

      // THEN
      expect(appraisalEvaluationParameterFormService.getAppraisalEvaluationParameter).toHaveBeenCalled();
      expect(appraisalEvaluationParameterService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppraisalEvaluationParameter>>();
      const appraisalEvaluationParameter = { id: 123 };
      jest.spyOn(appraisalEvaluationParameterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appraisalEvaluationParameter });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(appraisalEvaluationParameterService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
