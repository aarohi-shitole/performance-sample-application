import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PerformanceIndicatorDetailComponent } from './performance-indicator-detail.component';

describe('PerformanceIndicator Management Detail Component', () => {
  let comp: PerformanceIndicatorDetailComponent;
  let fixture: ComponentFixture<PerformanceIndicatorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceIndicatorDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ performanceIndicator: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PerformanceIndicatorDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PerformanceIndicatorDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load performanceIndicator on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.performanceIndicator).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
