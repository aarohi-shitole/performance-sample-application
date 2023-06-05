import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppraisalCommentsReviewDetailComponent } from './appraisal-comments-review-detail.component';

describe('AppraisalCommentsReview Management Detail Component', () => {
  let comp: AppraisalCommentsReviewDetailComponent;
  let fixture: ComponentFixture<AppraisalCommentsReviewDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppraisalCommentsReviewDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ appraisalCommentsReview: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AppraisalCommentsReviewDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AppraisalCommentsReviewDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load appraisalCommentsReview on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.appraisalCommentsReview).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
