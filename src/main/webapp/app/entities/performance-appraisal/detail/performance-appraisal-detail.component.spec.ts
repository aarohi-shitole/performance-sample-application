import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PerformanceAppraisalDetailComponent } from './performance-appraisal-detail.component';

describe('PerformanceAppraisal Management Detail Component', () => {
  let comp: PerformanceAppraisalDetailComponent;
  let fixture: ComponentFixture<PerformanceAppraisalDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceAppraisalDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ performanceAppraisal: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PerformanceAppraisalDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PerformanceAppraisalDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load performanceAppraisal on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.performanceAppraisal).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
