import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppraisalReviewDetailComponent } from './appraisal-review-detail.component';

describe('AppraisalReview Management Detail Component', () => {
  let comp: AppraisalReviewDetailComponent;
  let fixture: ComponentFixture<AppraisalReviewDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppraisalReviewDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ appraisalReview: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AppraisalReviewDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AppraisalReviewDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load appraisalReview on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.appraisalReview).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
