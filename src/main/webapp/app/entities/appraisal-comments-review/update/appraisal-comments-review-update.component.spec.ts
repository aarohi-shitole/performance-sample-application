import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AppraisalCommentsReviewFormService } from './appraisal-comments-review-form.service';
import { AppraisalCommentsReviewService } from '../service/appraisal-comments-review.service';
import { IAppraisalCommentsReview } from '../appraisal-comments-review.model';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';

import { AppraisalCommentsReviewUpdateComponent } from './appraisal-comments-review-update.component';

describe('AppraisalCommentsReview Management Update Component', () => {
  let comp: AppraisalCommentsReviewUpdateComponent;
  let fixture: ComponentFixture<AppraisalCommentsReviewUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let appraisalCommentsReviewFormService: AppraisalCommentsReviewFormService;
  let appraisalCommentsReviewService: AppraisalCommentsReviewService;
  let employeeService: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AppraisalCommentsReviewUpdateComponent],
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
      .overrideTemplate(AppraisalCommentsReviewUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AppraisalCommentsReviewUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    appraisalCommentsReviewFormService = TestBed.inject(AppraisalCommentsReviewFormService);
    appraisalCommentsReviewService = TestBed.inject(AppraisalCommentsReviewService);
    employeeService = TestBed.inject(EmployeeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Employee query and add missing value', () => {
      const appraisalCommentsReview: IAppraisalCommentsReview = { id: 456 };
      const employee: IEmployee = { id: 17353 };
      appraisalCommentsReview.employee = employee;

      const employeeCollection: IEmployee[] = [{ id: 93339 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployees = [employee];
      const expectedCollection: IEmployee[] = [...additionalEmployees, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ appraisalCommentsReview });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeToCollectionIfMissing).toHaveBeenCalledWith(
        employeeCollection,
        ...additionalEmployees.map(expect.objectContaining)
      );
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const appraisalCommentsReview: IAppraisalCommentsReview = { id: 456 };
      const employee: IEmployee = { id: 56808 };
      appraisalCommentsReview.employee = employee;

      activatedRoute.data = of({ appraisalCommentsReview });
      comp.ngOnInit();

      expect(comp.employeesSharedCollection).toContain(employee);
      expect(comp.appraisalCommentsReview).toEqual(appraisalCommentsReview);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppraisalCommentsReview>>();
      const appraisalCommentsReview = { id: 123 };
      jest.spyOn(appraisalCommentsReviewFormService, 'getAppraisalCommentsReview').mockReturnValue(appraisalCommentsReview);
      jest.spyOn(appraisalCommentsReviewService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appraisalCommentsReview });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appraisalCommentsReview }));
      saveSubject.complete();

      // THEN
      expect(appraisalCommentsReviewFormService.getAppraisalCommentsReview).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(appraisalCommentsReviewService.update).toHaveBeenCalledWith(expect.objectContaining(appraisalCommentsReview));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppraisalCommentsReview>>();
      const appraisalCommentsReview = { id: 123 };
      jest.spyOn(appraisalCommentsReviewFormService, 'getAppraisalCommentsReview').mockReturnValue({ id: null });
      jest.spyOn(appraisalCommentsReviewService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appraisalCommentsReview: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appraisalCommentsReview }));
      saveSubject.complete();

      // THEN
      expect(appraisalCommentsReviewFormService.getAppraisalCommentsReview).toHaveBeenCalled();
      expect(appraisalCommentsReviewService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppraisalCommentsReview>>();
      const appraisalCommentsReview = { id: 123 };
      jest.spyOn(appraisalCommentsReviewService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appraisalCommentsReview });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(appraisalCommentsReviewService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEmployee', () => {
      it('Should forward to employeeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(employeeService, 'compareEmployee');
        comp.compareEmployee(entity, entity2);
        expect(employeeService.compareEmployee).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
