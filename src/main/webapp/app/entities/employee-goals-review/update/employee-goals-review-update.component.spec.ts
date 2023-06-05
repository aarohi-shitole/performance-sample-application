import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EmployeeGoalsReviewFormService } from './employee-goals-review-form.service';
import { EmployeeGoalsReviewService } from '../service/employee-goals-review.service';
import { IEmployeeGoalsReview } from '../employee-goals-review.model';

import { EmployeeGoalsReviewUpdateComponent } from './employee-goals-review-update.component';

describe('EmployeeGoalsReview Management Update Component', () => {
  let comp: EmployeeGoalsReviewUpdateComponent;
  let fixture: ComponentFixture<EmployeeGoalsReviewUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let employeeGoalsReviewFormService: EmployeeGoalsReviewFormService;
  let employeeGoalsReviewService: EmployeeGoalsReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EmployeeGoalsReviewUpdateComponent],
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
      .overrideTemplate(EmployeeGoalsReviewUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmployeeGoalsReviewUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    employeeGoalsReviewFormService = TestBed.inject(EmployeeGoalsReviewFormService);
    employeeGoalsReviewService = TestBed.inject(EmployeeGoalsReviewService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const employeeGoalsReview: IEmployeeGoalsReview = { id: 456 };

      activatedRoute.data = of({ employeeGoalsReview });
      comp.ngOnInit();

      expect(comp.employeeGoalsReview).toEqual(employeeGoalsReview);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployeeGoalsReview>>();
      const employeeGoalsReview = { id: 123 };
      jest.spyOn(employeeGoalsReviewFormService, 'getEmployeeGoalsReview').mockReturnValue(employeeGoalsReview);
      jest.spyOn(employeeGoalsReviewService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employeeGoalsReview });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employeeGoalsReview }));
      saveSubject.complete();

      // THEN
      expect(employeeGoalsReviewFormService.getEmployeeGoalsReview).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(employeeGoalsReviewService.update).toHaveBeenCalledWith(expect.objectContaining(employeeGoalsReview));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployeeGoalsReview>>();
      const employeeGoalsReview = { id: 123 };
      jest.spyOn(employeeGoalsReviewFormService, 'getEmployeeGoalsReview').mockReturnValue({ id: null });
      jest.spyOn(employeeGoalsReviewService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employeeGoalsReview: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employeeGoalsReview }));
      saveSubject.complete();

      // THEN
      expect(employeeGoalsReviewFormService.getEmployeeGoalsReview).toHaveBeenCalled();
      expect(employeeGoalsReviewService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployeeGoalsReview>>();
      const employeeGoalsReview = { id: 123 };
      jest.spyOn(employeeGoalsReviewService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employeeGoalsReview });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(employeeGoalsReviewService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
