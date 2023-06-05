import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmployeeGoalsReviewDetailComponent } from './employee-goals-review-detail.component';

describe('EmployeeGoalsReview Management Detail Component', () => {
  let comp: EmployeeGoalsReviewDetailComponent;
  let fixture: ComponentFixture<EmployeeGoalsReviewDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeGoalsReviewDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ employeeGoalsReview: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EmployeeGoalsReviewDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EmployeeGoalsReviewDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load employeeGoalsReview on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.employeeGoalsReview).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
