import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AppraisalReviewFormService } from './appraisal-review-form.service';
import { AppraisalReviewService } from '../service/appraisal-review.service';
import { IAppraisalReview } from '../appraisal-review.model';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';

import { AppraisalReviewUpdateComponent } from './appraisal-review-update.component';

describe('AppraisalReview Management Update Component', () => {
  let comp: AppraisalReviewUpdateComponent;
  let fixture: ComponentFixture<AppraisalReviewUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let appraisalReviewFormService: AppraisalReviewFormService;
  let appraisalReviewService: AppraisalReviewService;
  let employeeService: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AppraisalReviewUpdateComponent],
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
      .overrideTemplate(AppraisalReviewUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AppraisalReviewUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    appraisalReviewFormService = TestBed.inject(AppraisalReviewFormService);
    appraisalReviewService = TestBed.inject(AppraisalReviewService);
    employeeService = TestBed.inject(EmployeeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Employee query and add missing value', () => {
      const appraisalReview: IAppraisalReview = { id: 456 };
      const employee: IEmployee = { id: 35356 };
      appraisalReview.employee = employee;

      const employeeCollection: IEmployee[] = [{ id: 87858 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployees = [employee];
      const expectedCollection: IEmployee[] = [...additionalEmployees, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ appraisalReview });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeToCollectionIfMissing).toHaveBeenCalledWith(
        employeeCollection,
        ...additionalEmployees.map(expect.objectContaining)
      );
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const appraisalReview: IAppraisalReview = { id: 456 };
      const employee: IEmployee = { id: 38766 };
      appraisalReview.employee = employee;

      activatedRoute.data = of({ appraisalReview });
      comp.ngOnInit();

      expect(comp.employeesSharedCollection).toContain(employee);
      expect(comp.appraisalReview).toEqual(appraisalReview);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppraisalReview>>();
      const appraisalReview = { id: 123 };
      jest.spyOn(appraisalReviewFormService, 'getAppraisalReview').mockReturnValue(appraisalReview);
      jest.spyOn(appraisalReviewService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appraisalReview });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appraisalReview }));
      saveSubject.complete();

      // THEN
      expect(appraisalReviewFormService.getAppraisalReview).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(appraisalReviewService.update).toHaveBeenCalledWith(expect.objectContaining(appraisalReview));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppraisalReview>>();
      const appraisalReview = { id: 123 };
      jest.spyOn(appraisalReviewFormService, 'getAppraisalReview').mockReturnValue({ id: null });
      jest.spyOn(appraisalReviewService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appraisalReview: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appraisalReview }));
      saveSubject.complete();

      // THEN
      expect(appraisalReviewFormService.getAppraisalReview).toHaveBeenCalled();
      expect(appraisalReviewService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAppraisalReview>>();
      const appraisalReview = { id: 123 };
      jest.spyOn(appraisalReviewService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appraisalReview });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(appraisalReviewService.update).toHaveBeenCalled();
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
