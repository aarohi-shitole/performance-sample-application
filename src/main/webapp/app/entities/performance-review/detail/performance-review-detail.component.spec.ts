import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PerformanceReviewDetailComponent } from './performance-review-detail.component';

describe('PerformanceReview Management Detail Component', () => {
  let comp: PerformanceReviewDetailComponent;
  let fixture: ComponentFixture<PerformanceReviewDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceReviewDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ performanceReview: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PerformanceReviewDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PerformanceReviewDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load performanceReview on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.performanceReview).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
